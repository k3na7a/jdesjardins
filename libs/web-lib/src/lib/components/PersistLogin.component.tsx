import { useEffect, useState } from 'react';
import { useAuth } from '../hooks';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const context = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        console.log('hello');
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
  }, []);
};
