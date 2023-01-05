import { Role } from '@jdesjardins/dist-lib';
import { Navigate, RouteObject } from 'react-router-dom';
import { NavigationLayout } from '../components/layout/Navigation';
import { RequireAuth } from '../components/layout/RequireAuth';
import { HomePageComponent } from '../pages';
import { ProfilePageComponent } from '../pages/profile/profile.page';

export const routes: RouteObject[] = [
  {
    element: <NavigationLayout />,
    children: [
      {
        path: '/home',
        element: <HomePageComponent />,
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
        element: <RequireAuth />,
        children: [
          {
            path: '/profile',
            element: <ProfilePageComponent />,
          },
        ],
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
        path: 'unauthorized',
        element: <>Unauthorized!</>,
      },
      {
        path: '/*',
        element: <Navigate to="/home" replace />,
      },
    ],
  },
];
