import { NxWelcome } from './components';

// import { useTranslation } from 'react-i18next';
import { useAxios } from './hooks';
import { IUser } from '@jdesjardins/dist-lib';

interface Props {
  test_prop: string;
}

export function App({ test_prop }: Props) {
  // const [t, i18n] = useTranslation('common', { keyPrefix: '' });
  const [user, loading] = useAxios<IUser>({
    method: 'GET',
    url: '/me',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2pqb2hAZ21haWwuY29tIiwic3ViIjoiMjVlMmM3ODktZmZmMC00NmU4LThjYjktNTVlZDY2NjZhNThjIiwiaWF0IjoxNjcxMjQ2NTY3LCJleHAiOjE2NzEzMzI5Njd9.N5ezg0aoi7ybaOWGfv04LU-RaRaV5HghCySmvD1UDhY',
    },
  });

  if (loading) return <>loading</>;

  return <NxWelcome title={user?.username || 'guest'} />;
}
