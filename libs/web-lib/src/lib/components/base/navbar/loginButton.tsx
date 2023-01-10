import {
  LoginFormReducerActionTypes,
  LoginReducer,
} from '../../../reducers/login.reducer';
import { ChangeEvent, useReducer } from 'react';
import { IUserLogin } from '@jdesjardins/dist-lib';
import { Button, Dropdown, Form } from 'react-bootstrap';

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
  click,
}: {
  loading: boolean;
  text: string;
  click: (data: IUserLogin) => void;
}) => {
  const [state, dispatch] = useReducer(LoginReducer, {
    username: '',
    password: '',
  });

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
    <Dropdown align="end">
      <Dropdown.Toggle
        className="ms-2 p-1 btn-login"
        variant="primary"
        id="login-btn"
        size="sm"
        disabled={loading}
      >
        {loading ? 'Loading' : text}
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark" className="p-0">
        <Form autoComplete="on" className="p-3">
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
          <Button
            variant="primary"
            size="sm"
            type="submit"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              click(state);
            }}
          >
            {loading ? 'Loading' : text}
          </Button>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};
