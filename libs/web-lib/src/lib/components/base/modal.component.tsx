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
      contentClassName="border border-primary text-light bg-dark rounded-0"
      centered
      show={true}
      onHide={unSetModal}
      animation={true}
    >
      <Modal.Header
        className="bg-primary border-0 rounded-0"
        closeButton
        closeVariant="white"
      >
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modal}</Modal.Body>
      <Modal.Footer className="border-0 rounded-0">
        <Button variant="danger" className="test" onClick={unSetModal}>
          Close
        </Button>
        <Button variant="primary" className="test" onClick={callback}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
