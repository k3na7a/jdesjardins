import { useAuth } from '../../hooks';

export const Home = () => {
  const { authenticatedUser } = useAuth();

  return <>{authenticatedUser?.username || 'Guest'} </>;
};
