import { Button } from 'react-bootstrap';
import { useModal } from '../../../context/modal.context';

export const UpdateUserForm = () => {
  const { addToast } = useModal();

  return (
    <Button
      className="App-link"
      onClick={() => {
        addToast({
          title: 'Success',
          subtitle: 'YAY',
          message: 'A success Toast',
          variant: 'success',
          timeout: 5000,
        });
        addToast({
          title: 'Error',
          subtitle: 'Oops',
          message: 'An Error Toast',
          variant: 'danger',
          timeout: 5000,
        });
        addToast({
          title: 'Generic',
          subtitle: 'Hi',
          message: 'A generic Toast with Primary Colours',
          timeout: 5000,
        });
      }}
    >
      CLICK
    </Button>
  );
};
