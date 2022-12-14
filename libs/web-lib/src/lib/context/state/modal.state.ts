import { Dispatch, SetStateAction } from 'react';

export interface ToastItem {
  index: number;
  title: string;
  subtitle?: string;
  message: string;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  timeout?: number;
  remove: () => void;
}

export interface AddToastInterface {
  title: string;
  subtitle?: string;
  message: string;
  timeout?: number;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
}

export interface ModalContextInterface {
  setModal: Dispatch<SetStateAction<ModalState | undefined>>;
  unSetModal: () => void;
}

export interface ToastContextInterface {
  addToast: (item: AddToastInterface) => void;
}

export interface ModalState {
  title: string;
  modal: React.ReactNode;
  callback?: () => void;
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

export const defaultToastState = {
  addToast: () => {
    return;
  },
};
