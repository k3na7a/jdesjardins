import { ButtonComponent } from '../../../components/base/button/button.component';
import { useModal } from '../../../context/modal.context';

export const UpdateUserForm = () => {
  const { addToast, setModal } = useModal();

  return (
    <>
      <ButtonComponent
        className="me-2"
        variant="outline-danger"
        callback={() =>
          setModal({
            modal: <>HEY!</>,
            callback: () => {
              return;
            },
          })
        }
      >
        CLICK ME FOR MODAL
      </ButtonComponent>
      <ButtonComponent
        variant="outline-success"
        callback={() => {
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
          addToast({
            title: 'Info',
            subtitle: 'ORLY?!',
            message: 'A Toast that has no real use but exists.',
            variant: 'info',
            timeout: 5000,
          });
          addToast({
            title: 'Warning',
            subtitle: 'HEY YOU!',
            message: 'A Toast used to WARN the user',
            variant: 'warning',
            timeout: 5000,
          });
        }}
      >
        CLICK ME FOR TOASTS
      </ButtonComponent>
    </>
  );
};
