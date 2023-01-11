import { ButtonComponent } from '../../components/base';
import { useAuth } from '../../context';
import { useModal } from '../../context/modal.context';

export const HomePageComponent = () => {
  const { setModal } = useModal();

  return (
    <ButtonComponent
      variant="primary"
      callback={() => {
        setModal({
          title: 'Test Modal',
          modal: <IModal />,
        });
      }}
    >
      Button
    </ButtonComponent>
  );
};

const IModal = () => {
  const { authenticatedUser, login, loading } = useAuth();

  return (
    <>
      {authenticatedUser?.username}{' '}
      <ButtonComponent
        callback={() =>
          login({ username: 'Jdesjardins', password: 'Password123!' })
        }
        variant={loading ? 'warning' : 'primary'}
        disabled={loading}
      >
        LOGIN
      </ButtonComponent>
    </>
  );
};
