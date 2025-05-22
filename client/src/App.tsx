import './App.css';
import Layout from './components/Layout';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/toast.css'; // Import custom toast styles

function App() {
  return (
    <>
      <Layout />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        transition={Bounce}
        theme="dark"
        pauseOnHover
        draggable={false}
        closeOnClick
        hideProgressBar={false}
        newestOnTop
        toastClassName="stock-insights-toast"
        progressClassName="toast-progress"
      />
    </>
  );
}

export default App;
