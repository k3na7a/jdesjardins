import { NxWelcome } from '@jdesjardins/ui-lib';
import { Navigate, RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <NxWelcome title="" />,
  },
  {
    path: '/*',
    element: <Navigate to="/" replace />,
  },
];
