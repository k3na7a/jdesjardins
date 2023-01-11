import { createContext, useCallback, useContext, useState } from 'react';
import { ModalComponent } from '../components/base/modal/modal.component';

import {
  defaultModalState,
  ModalContextInterface,
  ModalState,
} from './state/modal.state';

export const ModalContext =
  createContext<ModalContextInterface>(defaultModalState);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalState>();

  const unSetModal = useCallback(() => {
    setModal(undefined);
  }, [setModal]);

  return (
    <ModalContext.Provider value={{ unSetModal, setModal }}>
      {children}
      {modal && (
        <ModalComponent
          title={modal.title}
          modal={modal.modal}
          unSetModal={unSetModal}
          callback={modal.callback}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a UserProvider');
  return context;
};
