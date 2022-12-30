import { Role } from '@jdesjardins/dist-lib';
import { Navigate, RouteObject } from 'react-router-dom';
import { NavigationLayout } from '../components/layout/Navigation';
import { RequireAuth } from '../components/layout/RequireAuth';

export const routes: RouteObject[] = [
  {
    element: <NavigationLayout />,
    children: [
      {
        path: '/home',
        element: <>HOME</>,
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
            path: 'admin',
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
