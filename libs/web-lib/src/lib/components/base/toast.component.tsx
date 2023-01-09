import { useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import { ToastItem } from '../../context/state/modal.state';

export const ToastComponent = ({ toast }: { toast: ToastItem }) => {
  useEffect(() => {
    const controller = new AbortController();
    if (toast.timeout) setTimeout(toast.remove, toast.timeout);
    return () => {
      controller.abort();
    };
  }, [toast.remove, toast.timeout]);

  return (
    <Toast
      show
      onClose={() => {
        toast.remove();
      }}
    >
      <Toast.Header
        className={'bg-dark text-light'}
        closeVariant="white"
        closeButton
      >
        <strong className="me-auto">{toast.title}</strong>
        {!!toast.subtitle && <small>{toast.subtitle}</small>}
      </Toast.Header>
      <Toast.Body>{toast.message}</Toast.Body>
    </Toast>
  );
};
