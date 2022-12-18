import { NxWelcome } from './components';

// import { useTranslation } from 'react-i18next';
import { useAxios } from './hooks';
import { IUser } from '@jdesjardins/dist-lib';
import { localhost } from './apis';
import { useEffect, useReducer, useState } from 'react';
import { ActionType, counterReducer } from './reducers/demo.reducer';
import { Action } from 'rxjs/internal/scheduler/Action';

interface Props {
  test_prop: string;
}

export function App({ test_prop }: Props) {
  // const [t, i18n] = useTranslation('common', { keyPrefix: '' });
  const [state, dispatch] = useReducer(counterReducer, { value: 0 });

  const [user, setUser] = useState<IUser>();
  const [data, loading] = useAxios<IUser>(localhost, {
    method: 'GET',
    url: '/me',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2pqb2hAZ21haWwuY29tIiwic3ViIjoiMjVlMmM3ODktZmZmMC00NmU4LThjYjktNTVlZDY2NjZhNThjIiwiaWF0IjoxNjcxMzMzNjA5LCJleHAiOjE2NzE0MjAwMDl9.OvJpfejio5NZYaTyn1_dohaYqKtoSMSAMKoMuiq7B-A',
    },
  });

  useEffect(() => {
    setUser(data);
  }, [data]);

  if (loading) return <>loading</>;

  return (
    <main className="App">
      <button
        onClick={() => dispatch({ type: ActionType.Increase, payload: 1 })}
      >
        {state.value}
      </button>
      <NxWelcome title={user?.username || 'guest'} />
    </main>
  );
}
