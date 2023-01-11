import { ChangeEvent, useEffect, useReducer } from 'react';
import { Button, Form } from 'react-bootstrap';
import { LoginFormReducerActionTypes, LoginReducer } from '../../../reducers';
import { ButtonComponent } from '../button/button.component';
import { useAuth } from '../../../context';
import { useModal } from '../../../context/modal.context';

interface formItem {
  type: string;
  id: string;
  placeholder: string;
  dispatchType: LoginFormReducerActionTypes;
  value: string;
}

export const LoginButton = ({
  loading,
  text,
}: {
  loading: boolean;
  text: string;
}) => {
  const { setModal, unSetModal } = useModal();

  return (
    <Button
      variant="primary"
      size="sm"
      disabled={loading}
      className="ms-2 p-1 btn-login"
      onClick={() => {
        setModal({
          title: 'Login Modal',
          modal: <IModal close={unSetModal} />,
        });
      }}
    >
      {loading ? 'Loading' : text}
    </Button>
  );
};

const IModal = ({ close }: { close: () => void }) => {
  const { authenticatedUser, login, loading } = useAuth();
  const [state, dispatch] = useReducer(LoginReducer, {
    username: '',
    password: '',
  });

  useEffect(() => {
    if (authenticatedUser) close();
  }, [authenticatedUser, close]);

  const form: formItem[] = [
    {
      type: 'text',
      id: 'username',
      placeholder: 'Username',
      dispatchType: LoginFormReducerActionTypes.UPDATE_USERNAME,
      value: state.username,
    },
    {
      type: 'password',
      id: 'password',
      placeholder: 'Password',
      dispatchType: LoginFormReducerActionTypes.UPDATE_PASSWORD,
      value: state.password,
    },
  ];

  return (
    <>
      <Form autoComplete="on">
        {form.map((e: formItem) => {
          return (
            <Form.Control
              disabled={loading}
              id={e.id}
              key={e.id}
              value={e.value}
              size="sm"
              className="mb-3"
              type={e.type}
              placeholder={e.placeholder}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: e.dispatchType,
                  payload: event.target.value,
                })
              }
            />
          );
        })}
      </Form>
      <ButtonComponent
        callback={() => login(state)}
        variant={'primary'}
        disabled={loading}
      >
        LOGIN
      </ButtonComponent>
    </>
  );
};
