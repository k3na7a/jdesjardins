import { Role } from '@jdesjardins/dist-lib';
import { NxWelcome } from '@jdesjardins/ui-lib';
import { Navigate, RouteObject } from 'react-router-dom';
import { RequireAuth } from '../guards';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <NxWelcome title="" />,
  },
  {
    path: 'login',
    element: <>LOGIN!</>,
  },
  {
    element: <RequireAuth allowedRoles={[Role.ADMIN]} />,
    children: [
      {
        path: 'test',
        element: <>YOU MADE IT ADMIN!</>,
      },
    ],
  },
  {
    path: '/*',
    element: <Navigate to="/" replace />,
  },
];
