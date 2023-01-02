import { NxWelcome } from '@jdesjardins/ui-lib';
import { useAuth } from '../../hooks';

export const Home = () => {
  const { authenticatedUser } = useAuth();

  return <NxWelcome title={authenticatedUser?.username || 'Guest'} />;
};
