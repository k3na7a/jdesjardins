import { useAuth } from '../../context';

export const HomePageComponent = () => {
  const { authenticatedUser } = useAuth();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{authenticatedUser?.username || 'guest'}</>;
};
