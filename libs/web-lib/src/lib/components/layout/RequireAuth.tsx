import { Role } from '@jdesjardins/dist-lib';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';

interface Props {
  allowedRoles?: Role[];
}

export const RequireAuth = ({ allowedRoles }: Props) => {
  const { authenticatedUser } = useAuth();
  const location = useLocation();

  return authenticatedUser && allowedRoles?.includes(authenticatedUser.role) ? (
    <Outlet />
  ) : authenticatedUser ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  );
};
