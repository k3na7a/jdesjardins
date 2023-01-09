import { Dispatch, SetStateAction } from 'react';

export interface ToastItem {
  index: number;
  title: string;
  subtitle?: string;
  message: string;
  variant?: 'primary' | 'success' | 'danger';
  timeout?: number;
  remove: () => void;
}

export interface AddToastInterface {
  title: string;
  subtitle?: string;
  message: string;
  timeout?: number;
  variant?: 'primary' | 'success' | 'danger';
}

export interface ModalContextInterface {
  setModal: Dispatch<SetStateAction<ModalState | undefined>>;
  unSetModal: () => void;
  addToast: (item: AddToastInterface) => void;
}

export interface ModalState {
  modal: React.ReactNode;
  callback: () => void;
}

export const defaultModalState = {
  setModal: () => {
    return;
  },
  unSetModal: () => {
    return;
  },
  addToast: () => {
    return;
  },
};
