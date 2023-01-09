import { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { Check } from 'react-bootstrap-icons';
import { ToastItem } from '../../context/state/modal.state';

export const ToastComponent = ({ toast }: { toast: ToastItem }) => {
  const [show, setShow] = useState<boolean>(false);

  const variant = toast.variant || 'primary';

  const themeRef: boolean = variant === 'info' || variant === 'warning';

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
      className={`border border-${variant} border-opacity-50 rounded-0`}
      bg="dark"
      onClose={() => {
        toast.remove();
      }}
    >
      <Toast.Header
        className={`bg-${variant} text-${
          themeRef ? 'dark' : 'light'
        } rounded-0`}
        closeVariant={themeRef ? undefined : 'white'}
        closeButton
      >
        <Check size={18} className="me-1" />
        <strong className="me-auto">{toast.title}</strong>
        {!!toast.subtitle && <small>{toast.subtitle}</small>}
      </Toast.Header>
      <Toast.Body className={`text-light rounded-0`}>
        {toast.message}
      </Toast.Body>
    </Toast>
  );
};
