/* eslint-disable @typescript-eslint/no-empty-function */
import { IUser } from '@jdesjardins/dist-lib';
import React, { createContext, useState } from 'react';

interface DemoContextInterface {
  user: IUser | undefined;
  setUser: (value: IUser) => void;
}

type Props = {
  children: React.ReactNode;
};

export const DemoContext = createContext<DemoContextInterface>({
  user: undefined,
  setUser: () => {},
});

export const DemoContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  return (
    <DemoContext.Provider value={{ user, setUser }}>
      {children}
    </DemoContext.Provider>
  );
};
