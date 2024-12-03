import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast() {
  const notify = () => {
    toast.error('Error Notification !', {
      position: 'top-left',
    });
  };

  return (
    <>
      <button onClick={notify}>Notify</button>;
      <ToastContainer
        style={{
          position: 'fixed', // Use `fixed` to detach from any parent container
          top: '1rem',
          right: '1rem',
          zIndex: 1000, // Ensure it sits above other content
        }}
      />
    </>
  );
}

export default Toast;
