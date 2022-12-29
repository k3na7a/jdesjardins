import { Role } from '@jdesjardins/dist-lib';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';

interface Props {
  allowedRoles?: Role[];
}

export const RequireAuth = ({ allowedRoles }: Props) => {
  const context = useAuth();
  const location = useLocation();

  return context.authenticatedUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
