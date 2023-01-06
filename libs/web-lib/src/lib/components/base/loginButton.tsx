import {
  LoginFormReducerActionTypes,
  LoginReducer,
} from '../../reducers/login.reducer';
import { ChangeEvent, useReducer } from 'react';
import { IUserLogin } from '@jdesjardins/dist-lib';

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
        <form className="p-3">
          <div className="mb-3">
            <input
              disabled={loading}
              type="text"
              autoComplete="on"
              className="form-control form-control-sm"
              id="username"
              value={state.username}
              placeholder="Username"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: LoginFormReducerActionTypes.UPDATE_USERNAME,
                  payload: event.target.value,
                })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              disabled={loading}
              autoComplete="on"
              className="form-control form-control-sm"
              id="password"
              placeholder="Password"
              value={state.password}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: LoginFormReducerActionTypes.UPDATE_PASSWORD,
                  payload: event.target.value,
                })
              }
            />
          </div>
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
