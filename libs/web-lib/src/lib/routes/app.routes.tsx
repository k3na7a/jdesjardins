import { Role } from '@jdesjardins/dist-lib';
import { NxWelcome } from '@jdesjardins/ui-lib';
import { Navigate, RouteObject } from 'react-router-dom';
import { NavigationLayout } from '../components/layout/Navigation.layout';
import { RequireAuth } from '../guards';

export const routes: RouteObject[] = [
  {
    element: <NavigationLayout />,
    children: [
      {
        path: '/home',
        element: <NxWelcome title="" />,
      },
      {
        path: 'projects',
        element: <>Projects!</>,
      },
      {
        path: 'about',
        element: <>About!</>,
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
        element: <Navigate to="/home" replace />,
      },
    ],
  },
];
