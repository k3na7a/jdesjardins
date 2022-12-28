import { Role } from '@jdesjardins/dist-lib';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';

interface Props {
  allowedRoles?: Role[];
}

export const RequireAuth = ({ allowedRoles }: Props) => {
  const context = useAuth();
  const location = useLocation();

  console.log(allowedRoles);

  console.log(
    context.authenticatedUser?.role &&
      allowedRoles?.includes(context.authenticatedUser.role)
  );

  return context.authenticatedUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
