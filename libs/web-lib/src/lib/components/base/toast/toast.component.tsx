import { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import {
  CheckCircleFill,
  XCircleFill,
  InfoCircleFill,
  ExclamationCircleFill,
  CircleFill,
} from 'react-bootstrap-icons';
import { ToastItem } from '../../../context/state/modal.state';

export const ToastComponent = ({ toast }: { toast: ToastItem }) => {
  const [show, setShow] = useState<boolean>(false);

  const variant = toast.variant || 'primary';

  const themeRef: boolean = variant === 'info' || variant === 'warning';
  const size = 16;

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircleFill size={size} className="me-2" />;
      case 'danger':
        return <XCircleFill size={size} className="me-2" />;
      case 'info':
        return <InfoCircleFill size={size} className="me-2" />;
      case 'warning':
        return <ExclamationCircleFill size={size} className="me-2" />;
      default:
        return <CircleFill size={size} className="me-2" />;
    }
  };

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
        {getIcon()}
        <strong className="me-auto">{toast.title}</strong>
        {!!toast.subtitle && <small>{toast.subtitle}</small>}
      </Toast.Header>
      <Toast.Body className={`text-light rounded-0`}>
        {toast.message}
      </Toast.Body>
    </Toast>
  );
};
