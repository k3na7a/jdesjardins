import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';

export const RequireAuth = () => {
  const context = useAuth();
  const location = useLocation();

  return context.authenticatedUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
