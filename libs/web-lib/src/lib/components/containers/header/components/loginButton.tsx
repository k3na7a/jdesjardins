import {
  LoginFormReducerActionTypes,
  LoginReducer,
} from '../../../../reducers/login.reducer';
import { useReducer } from 'react';

interface Props {
  text: string;
  click: (data: { username: string; password: string }) => void;
}

export const LoginButton = ({ text, click }: Props) => {
  const [state, dispatch] = useReducer(LoginReducer, {
    username: '',
    password: '',
  });
  return (
    <div className="dropdown">
      <button
        className="btn btn-dark ms-2 btn-sm btn-login dropdown-toggle p-1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        {text}
      </button>

      <div className="dropdown-menu dropdown-menu-end dropdown-menu-dark m-0 p-0">
        <form className="p-3">
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              id="username"
              value={state.username}
              placeholder="Username"
              onChange={(event) =>
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
              className="form-control form-control-sm"
              id="exampleDropdownFormPassword2"
              placeholder="Password"
              value={state.password}
              onChange={(event) =>
                dispatch({
                  type: LoginFormReducerActionTypes.UPDATE_PASSWORD,
                  payload: event.target.value,
                })
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            onClick={() => click(state)}
          >
            {text}
          </button>
        </form>
      </div>
    </div>
  );
};
