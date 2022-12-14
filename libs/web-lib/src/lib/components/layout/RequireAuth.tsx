import { IAccessToken, Role } from '@jdesjardins/dist-lib';
import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from 'react-router-dom';
import { useAuth } from '../../context';

interface Props {
  allowedRoles?: Role[];
}

export const RequireAuth = ({ allowedRoles }: Props) => {
  const { authenticatedUser } = useAuth();
  const location = useLocation();

  return authenticatedUser &&
    (authenticatedUser.role === Role.ADMIN ||
      allowedRoles?.includes(authenticatedUser.role)) ? (
    <Outlet context={authenticatedUser} />
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  );
};

export function useRequireAuthContext() {
  return useOutletContext<IAccessToken>();
}
