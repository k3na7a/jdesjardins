import { Button, Modal } from 'react-bootstrap';
import './modal.scss';

export const ModalComponent = ({
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
      contentClassName="border border-primary rounded-0"
      centered
      show={true}
      onHide={unSetModal}
      animation={true}
    >
      <Modal.Header
        className="bg-primary border-0 text-light rounded-0"
        closeButton
        closeVariant="white"
      >
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">{modal}</Modal.Body>
      <Modal.Footer className="bg-dark border-0 rounded-0">
        <Button variant="danger" onClick={unSetModal}>
          Close
        </Button>
        <Button variant="primary" onClick={callback}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
