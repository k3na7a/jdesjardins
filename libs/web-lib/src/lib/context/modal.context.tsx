import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Button, Modal } from 'react-bootstrap';

import './modal.scss';

interface ModalContextInterface {
  setModal: Dispatch<SetStateAction<State | undefined>>;
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
  const unSetModal = useCallback(() => {
    setModal(undefined);
  }, [setModal]);

  return (
    <ModalContext.Provider value={{ unSetModal, setModal }}>
      {children}
      {modal && (
        <ModalComponent
          modal={modal.modal}
          unSetModal={unSetModal}
          callback={modal.callback}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a UserProvider');
  return context;
};
