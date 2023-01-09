import { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { ToastItem } from '../../context/state/modal.state';

export const ToastComponent = ({ toast }: { toast: ToastItem }) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    setShow(true);
    if (toast.timeout) setTimeout(toast.remove, toast.timeout + 500);
    return () => {
      controller.abort();
    };
  }, [toast.remove, toast.timeout]);

  return (
    <Toast
      show={show}
      animation={true}
      className="border border-primary border-opacity-50"
      bg="dark"
      onClose={() => {
        toast.remove();
      }}
    >
      <Toast.Header
        className={'bg-primary text-light'}
        closeVariant="white"
        closeButton
      >
        <strong className="me-auto">{toast.title}</strong>
        {!!toast.subtitle && <small>{toast.subtitle}</small>}
      </Toast.Header>
      <Toast.Body className="text-light">{toast.message}</Toast.Body>
    </Toast>
  );
};
