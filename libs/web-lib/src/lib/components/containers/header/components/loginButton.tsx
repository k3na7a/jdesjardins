interface Props {
  text: string;
  click: (data: { username: string; password: string }) => void;
}

export const LoginButton = ({ text, click }: Props) => {
  return (
    <button
      className="btn btn-dark ms-2 btn-sm btn-login"
      type="submit"
      onClick={() =>
        click({ username: 'Jdesjardins', password: 'Password123!' })
      }
    >
      {text}
    </button>
  );
};
