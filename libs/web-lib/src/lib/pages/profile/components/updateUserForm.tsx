import { Button } from 'react-bootstrap';
import { useModal } from '../../../context/modal.context';

export const UpdateUserForm = () => {
  const { addToast } = useModal();

  return (
    <Button
      className="App-link"
      onClick={() => {
        addToast({
          title: 'Title',
          subtitle: 'Subtitle',
          message: 'Content',
          timeout: 5000,
        });
      }}
    >
      CLICK
    </Button>
  );
};
