import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { ToastContainer } from 'react-bootstrap';
import { ModalComponent } from '../components/base/modal.component';
import { ToastComponent } from '../components/base/toast.component';

import './modal.scss';
import {
  AddToastInterface,
  defaultModalState,
  ModalContextInterface,
  ModalState,
  ToastItem,
} from './state/modal.state';

export const ModalContext =
  createContext<ModalContextInterface>(defaultModalState);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const taostRef = useRef<number>(0);

  const [modal, setModal] = useState<ModalState>();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback(
    (item: AddToastInterface) => {
      const id = taostRef.current;
      setToasts((toasts) => {
        return [
          ...toasts,
          {
            ...item,
            index: id,
            remove: () => {
              setToasts((e) => e.filter((t) => t.index !== id));
            },
          },
        ];
      });
      taostRef.current++;
    },
    [setToasts]
  );

  const unSetModal = useCallback(() => {
    setModal(undefined);
  }, [setModal]);

  return (
    <ModalContext.Provider value={{ unSetModal, setModal, addToast }}>
      {children}
      {modal && (
        <ModalComponent
          modal={modal.modal}
          unSetModal={unSetModal}
          callback={modal.callback}
        />
      )}

      <ToastContainer className="p-3" position="bottom-end">
        {toasts.map((e, i) => {
          return <ToastComponent key={i} toast={e} />;
        })}
      </ToastContainer>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a UserProvider');
  return context;
};
