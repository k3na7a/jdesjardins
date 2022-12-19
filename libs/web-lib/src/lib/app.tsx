import { NxWelcome } from './components';

import { useTranslation } from 'react-i18next';
import { useAxios } from './hooks';
import { IUser } from '@jdesjardins/dist-lib';
import { localhost } from './apis';
import { useReducer, useRef } from 'react';
import {
  CounterReducerActionTypes,
  counterReducer,
} from './reducers/demo.reducer';
import { DemoContextProvider } from './context/demo.context';

export function App() {
  const [t, i18n] = useTranslation('common', { keyPrefix: '' });
  const [state, dispatch] = useReducer(counterReducer, { value: 0 });

  // const [user, setUser] = useState<IUser>()
  const [data, loading, error] = useAxios<IUser>({
    instance: localhost,
    config: {
      method: 'GET',
      url: '/me',
    },
  });
  const user$ = useRef(data)

  // function useEffect(() => {
  //   setUser(data)
  // }, [data])

  // if (loading) return <p>loading</p>;

  // if (error) return <p>{error.message}</p>;

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
        {/* <NxWelcome title={user?.username || t('title', i18n)} /> */}
        <NxWelcome title={t('title', i18n)} />
      </main>
    </DemoContextProvider>
  );
}
