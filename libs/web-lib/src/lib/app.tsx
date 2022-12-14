import { useEffect, useMemo, useState } from 'react';
import { NxWelcome } from './components';
import { getMe } from './services/auth.service';

import { useTranslation } from 'react-i18next';

import './styles/app.styles.css';

interface Props {
  test_prop: string;
}

export function App({ test_prop }: Props) {
  const [test, setTest] = useState('state');
  const test$ = useMemo(() => test, [test]);

  const { t } = useTranslation();

  useEffect(() => {
    console.log(test$);
  }, [test$]);

  async function updateTestState() {
    setTest((currentValue) => 'new_state');

    const user = await getMe();
    console.log(user);
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={updateTestState}
      >
        {t('title')}
      </button>
      <NxWelcome title="web" />
    </>
  );
}
