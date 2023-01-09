import { Button, Modal } from 'react-bootstrap';

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
