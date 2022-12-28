import { NxWelcome } from '@jdesjardins/ui-lib';
import { Navigate } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    element: <NxWelcome title="" />,
  },
  {
    path: '/*',
    element: <Navigate to="/" replace />,
  },
];
