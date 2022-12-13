import { UserLoginModel } from '@jdesjardins/dist-lib';
import { NxWelcome } from '@jdesjardins/ui-lib';
import { useEffect, useMemo, useState } from 'react';

import apiClient from './api/http-common';

import './styles/app.styles.css';

interface Props {
  test_prop: string;
}

export function App({ test_prop }: Props) {
  const [test, setTest] = useState('state');
  const test$ = useMemo(() => test, [test]);

  useEffect(() => {
    console.log(test$);
  }, [test$]);

  async function updateTestState() {
    setTest((currentValue) => 'new_state');

    apiClient.get('/me').then((res) => console.log(res));
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={updateTestState}
      >
        Click Me for New State
      </button>
      <NxWelcome title="web" />
    </>
  );
}
