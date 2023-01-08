import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useModal } from '../../../context/modal.context';

export const UpdateUserForm = () => {
  const { setModal, unSetModal } = useModal();
  const [someValue, setSomeValue] = useState<string>('DEFAULT VALUE');

  return (
    <Button
      className="App-link"
      onClick={() => {
        setModal({
          modal: <>A Dialog from Profile Children</>,
          callback: () => {
            setSomeValue('NEW VALUE FROM MODAL');
            unSetModal();
          },
        });
      }}
    >
      {someValue}
    </Button>
  );
};
