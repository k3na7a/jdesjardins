import { Modal } from 'react-bootstrap';
import { ButtonComponent } from '../button/button.component';
import './modal.component.scss';

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
        <ButtonComponent variant="danger" callback={unSetModal}>
          Close
        </ButtonComponent>
        <ButtonComponent variant="primary" callback={callback}>
          Save Changes
        </ButtonComponent>
      </Modal.Footer>
    </Modal>
  );
};
