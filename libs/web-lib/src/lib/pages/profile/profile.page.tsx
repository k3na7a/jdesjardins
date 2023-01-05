import { useRequireAuthContext } from '../../hooks';

export const ProfilePageComponent = () => {
  const auth = useRequireAuthContext();
  return (
    <>
      PROFILE
      <p>{auth.username}</p>
    </>
  );
};
