import { HttpException, HttpStatus, Logger } from "@nestjs/common";

/**
 * Handles errors from stock API calls and provides appropriate error responses
 * @param error The error object from the API call
 * @param operationType Description of the operation being performed (e.g., 'fetching stock data by symbol')
 */
export function handleStockApiError(error: any, operationType: string = 'fetching stock data'): void {
  const logger = new Logger('StockApiError');
  
  if (error.response) {
    // Handle response error (e.g., 400, 401, 404, 500, etc.)
    const errorMessage = `Failed ${operationType}: ${error.response.statusText}`;
    const statusCode = error.response.status || HttpStatus.BAD_REQUEST;
    
    logger.error(`[HTTP ${statusCode}] ${errorMessage}`, {
      url: error.config?.url,
      method: error.config?.method,
      data: error.response.data
    });
    
    throw new HttpException(errorMessage, statusCode);
  } 
  // Handle timeout error
  if (error.request) {
    // Handle request error (no response received)
    const errorMessage = `No response received while ${operationType}`;
    
    logger.error(`[TIMEOUT] ${errorMessage}`, {
      url: error.config?.url,
      method: error.config?.method
    });
    
    throw new HttpException(errorMessage, HttpStatus.GATEWAY_TIMEOUT);
  } 
    // Handle other errors
    const errorMessage = `Error ${operationType}: ${error.message}`;
    
    logger.error(`[INTERNAL] ${errorMessage}`, {
      stack: error.stack
    });
    
    throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
}