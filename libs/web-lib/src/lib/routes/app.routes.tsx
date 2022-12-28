import { NxWelcome } from '@jdesjardins/ui-lib';
import { Navigate, RouteObject } from 'react-router-dom';
import { RequireAuth } from '../guards';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <>HELLO WORLD!</>,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: 'test',
        element: <NxWelcome title="" />,
      },
    ],
  },
  {
    path: '/*',
    element: <Navigate to="/" replace />,
  },
];
