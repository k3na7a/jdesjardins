import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap';

import './modal.scss';

interface ToastItem {
  title: string;
  subtitle: string;
  message: string;
  timeout: number;
}

const ToastComponent = ({ item }: { item: ToastItem }) => {
  const [show, setShow] = useState<boolean>(true);
  return (
    <Toast
      show={show}
      onClose={() => setShow(false)}
      delay={item.timeout}
      autohide
    >
      <Toast.Header closeButton>
        <strong className="me-auto">{item.title}</strong>
        <small>{item.subtitle}</small>
      </Toast.Header>
      <Toast.Body>{item.message}</Toast.Body>
    </Toast>
  );
};

interface ModalContextInterface {
  setModal: Dispatch<SetStateAction<State | undefined>>;
  unSetModal: () => void;
  newToast: (item: ToastItem) => void;
}

const defaultState = {
  setModal: () => {
    return;
  },
  unSetModal: () => {
    return;
  },
  newToast: () => {
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
  const [modal, setModal] = useState<State>();

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const newToast = useCallback(
    (item: ToastItem) => {
      setToasts((e) => [...e, item]);
    },
    [setToasts]
  );

  const unSetModal = useCallback(() => {
    setModal(undefined);
  }, [setModal]);

  return (
    <ModalContext.Provider value={{ unSetModal, setModal, newToast }}>
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
          {toasts.map((e) => {
            return <ToastComponent item={e} />;
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
