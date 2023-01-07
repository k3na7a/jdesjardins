import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ModalContextInterface {
  setModal: Dispatch<SetStateAction<React.ReactNode | undefined>>;
  unSetModal: () => void;
}

const defaultState = {
  setModal: () => {
    return;
  },
  unSetModal: () => {
    return;
  },
};

const ModalComponent = ({
  modal,
  unSetModal,
}: {
  modal: React.ReactNode;
  unSetModal: () => void;
}) => {
  return (
    <Modal
      centered
      show={true}
      onHide={unSetModal}
      backdrop="static"
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modal}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={unSetModal}>
          Close
        </Button>
        <Button variant="primary" onClick={unSetModal}>
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

export const ModalProvider = ({ children }: Props) => {
  const [modal, setModal] = useState<React.ReactNode>();
  const unSetModal = useCallback(() => {
    setModal(undefined);
  }, [setModal]);

  return (
    <ModalContext.Provider value={{ unSetModal, setModal }}>
      {children}
      {modal && <ModalComponent modal={modal} unSetModal={unSetModal} />}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a UserProvider');
  return context;
};
