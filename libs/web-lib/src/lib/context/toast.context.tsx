import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { ToastContainer } from 'react-bootstrap';
import { ToastComponent } from '../components/base/toast/toast.component';

import {
  AddToastInterface,
  defaultToastState,
  ToastContextInterface,
  ToastItem,
} from './state/modal.state';

export const ToastContext =
  createContext<ToastContextInterface>(defaultToastState);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const taostRef = useRef<number>(0);
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

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer className="p-3" position="bottom-end">
        {toasts.map((e, i) => {
          return <ToastComponent key={i} toast={e} />;
        })}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToasts = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
