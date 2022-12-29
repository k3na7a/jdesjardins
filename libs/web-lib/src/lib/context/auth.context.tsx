import { IAccessToken } from '@jdesjardins/dist-lib';
import React, { createContext, useState } from 'react';

interface AuthContextInterface {
  auth: IAccessToken | undefined;
  setAuth: React.Dispatch<React.SetStateAction<IAccessToken | undefined>>;
}

export const AuthContext = createContext<AuthContextInterface>({
  auth: undefined,
  setAuth: () => {
    return;
  },
});

interface Children {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Children) => {
  const [auth, setAuth] = useState<IAccessToken>();

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
