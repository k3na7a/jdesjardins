import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap';

import './modal.scss';

interface ToastItem {
  index: number;
  title: string;
  subtitle?: string;
  message: string;
  timeout: number;
  remove: () => void;
}

interface AddToastInterface {
  title: string;
  subtitle?: string;
  message: string;
  timeout: number;
}

const ToastComponent = ({ toast }: { toast: ToastItem }) => {
  useEffect(() => {
    setTimeout(toast.remove, toast.timeout);

    //  return () => clearTimeout(timeoutHandle);
  }, [toast.remove, toast.timeout]);

  return (
    <Toast
      show
      onClose={() => {
        if (toast.remove) toast.remove();
      }}
    >
      <Toast.Header closeButton>
        <strong className="me-auto">{toast.title}</strong>
        <small>{toast.index}</small>
      </Toast.Header>
      <Toast.Body>{toast.message}</Toast.Body>
    </Toast>
  );
};

interface ModalContextInterface {
  setModal: Dispatch<SetStateAction<State | undefined>>;
  unSetModal: () => void;
  addToast: (item: AddToastInterface) => void;
}

const defaultState = {
  setModal: () => {
    return;
  },
  unSetModal: () => {
    return;
  },
  addToast: () => {
    return;
  },
};

const ModalComponent = ({
  modal,
  unSetModal,
  callback,
}: {
  modal: React.ReactNode;
  unSetModal: () => void;
  callback: () => unknown;
}) => {
  return (
    <Modal
      centered
      show={true}
      onHide={unSetModal}
      backdrop="static"
      animation={true}
    >
      <Modal.Header className="bg-dark text-light">
        <Modal.Title>Modal heading</Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={unSetModal}
        />
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">{modal}</Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="outline-danger" onClick={unSetModal}>
          Close
        </Button>
        <Button variant="outline-light" onClick={callback}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const ModalContext = createContext<ModalContextInterface>(defaultState);

interface Props {
  children: React.ReactNode;
}

interface State {
  modal: React.ReactNode;
  callback: () => void;
}

export const ModalProvider = ({ children }: Props) => {
  const taostRef = useRef<number>(0);

  const [modal, setModal] = useState<State>();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback(
    (item: AddToastInterface) => {
      const id = taostRef.current;
      setToasts((toasts) => {
        return [
          ...toasts,
          {
            ...item,
            index: id,
            remove: () => {
              setToasts((e) => e.filter((t) => t.index !== id));
            },
          },
        ];
      });
      taostRef.current++;
    },
    [setToasts]
  );

  const unSetModal = useCallback(() => {
    setModal(undefined);
  }, [setModal]);

  return (
    <ModalContext.Provider value={{ unSetModal, setModal, addToast }}>
      {children}
      {modal && (
        <ModalComponent
          modal={modal.modal}
          unSetModal={unSetModal}
          callback={modal.callback}
        />
      )}
      {true && (
        <ToastContainer className="p-3" position="bottom-end">
          {toasts.map((e, i) => {
            return <ToastComponent key={i} toast={e} />;
          })}
        </ToastContainer>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a UserProvider');
  return context;
};
