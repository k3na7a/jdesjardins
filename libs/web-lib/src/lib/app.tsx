import { NxWelcome } from '@jdesjardins/ui-lib';
import { useEffect, useMemo, useState } from 'react';

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

  function updateTestState() {
    setTest((currentValue) => 'new_state');
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
