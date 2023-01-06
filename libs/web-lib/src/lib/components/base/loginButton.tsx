import {
  LoginFormReducerActionTypes,
  LoginReducer,
} from '../../reducers/login.reducer';
import { ChangeEvent, useReducer } from 'react';
import { IUserLogin } from '@jdesjardins/dist-lib';

interface formItem {
  type: string;
  id: string;
  placeholder: string;
  dispatchType: LoginFormReducerActionTypes;
  value: string;
}

interface Props {
  loading: boolean;
  text: string;
  click: (data: IUserLogin) => void;
}

export const LoginButton = ({ loading, text, click }: Props) => {
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
    <div className="dropdown">
      <button
        className="btn btn-dark ms-2 btn-sm btn-login dropdown-toggle p-1 login-btn"
        disabled={loading}
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        {loading ? 'Loading' : text}
      </button>

      <div className="dropdown-menu dropdown-menu-end dropdown-menu-dark m-0 p-0">
        <form autoComplete="on" className="p-3">
          {form.map((e: formItem) => {
            return (
              <div className="mb-3">
                <input
                  disabled={loading}
                  type={e.type}
                  autoComplete="on"
                  className="form-control form-control-sm"
                  id={e.id}
                  value={e.value}
                  placeholder={e.placeholder}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: e.dispatchType,
                      payload: event.target.value,
                    })
                  }
                />
              </div>
            );
          })}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-sm"
            onClick={() => click(state)}
          >
            {loading ? 'Loading' : text}
          </button>
        </form>
      </div>
    </div>
  );
};
