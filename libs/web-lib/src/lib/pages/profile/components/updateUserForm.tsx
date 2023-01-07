import { useModal } from '../../../context/modal.context';

export const UpdateUserForm = () => {
  const { setModal } = useModal();
  return (
    <button
      className="App-link"
      onClick={() => {
        setModal(<h1>Hola senora!</h1>);
      }}
    >
      Start a dialogue
    </button>
  );
};
