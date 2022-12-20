import { NxWelcome } from './components';

import { useTranslation } from 'react-i18next';
import { useAxios } from './hooks';
import { IUser } from '@jdesjardins/dist-lib';
import { localhost } from './apis';
import { useContext, useEffect, useMemo, useReducer } from 'react';
import {
  CounterReducerActionTypes,
  counterReducer,
} from './reducers/demo.reducer';
import { DemoContext, DemoContextProvider } from './context/demo.context';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2pqb2hAZ21haWwuY29tIiwic3ViIjoiMjVlMmM3ODktZmZmMC00NmU4LThjYjktNTVlZDY2NjZhNThjIiwiaWF0IjoxNjcxNDc2NDYzLCJleHAiOjE2NzE1NjI4NjN9.lsxJmZIw6ja0BVSpxhGX0gHKZQSucM2PLBJCZ6hfVjU';

export function App() {
  // Test Playground, Not actual Production Code
  const [t, i18n] = useTranslation('common', { keyPrefix: '' });
  const [state, dispatch] = useReducer(counterReducer, { value: 0 });
  const [data, loading, error] = useAxios<IUser>({
    instance: localhost,
    config: {
      method: 'GET',
      url: '/me',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  });
  const user$ = useMemo<IUser | undefined>(() => data, [data]);
  const { user, setUser } = useContext(DemoContext);

  useEffect(() => {
    if (user$) setUser(user$);
  }, [user$, setUser]);

  if (loading) return <p>loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <DemoContextProvider>
      <main className="App">
        <button
          onClick={() =>
            dispatch({ type: CounterReducerActionTypes.Increase, payload: 1 })
          }
        >
          {state.value}
        </button>
        <NxWelcome title={user?.username || t('title', i18n)} />
        {/* <NxWelcome title={t('title', i18n)} /> */}
      </main>
    </DemoContextProvider>
  );
}
