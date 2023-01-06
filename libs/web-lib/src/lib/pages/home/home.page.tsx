import { useAuth } from '../../hooks';

export const HomePageComponent = () => {
  const { authenticatedUser } = useAuth();

  return <>{authenticatedUser?.username || 'guest'}</>;
};
