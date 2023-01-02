import { IUserLogin } from '@jdesjardins/dist-lib';

export enum LoginFormReducerActionTypes {
  UPDATE_USERNAME = 'UPDATE_USERNAME',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
}

interface LoginFormReducerAction {
  type: LoginFormReducerActionTypes;
  payload: string;
}

export function LoginReducer(
  state: IUserLogin,
  action: LoginFormReducerAction
): IUserLogin {
  const { type, payload } = action;

  switch (type) {
    case LoginFormReducerActionTypes.UPDATE_PASSWORD:
      return {
        ...state,
        password: payload,
      };
    case LoginFormReducerActionTypes.UPDATE_USERNAME:
      return {
        ...state,
        username: payload,
      };
    default:
      return state;
  }
}
