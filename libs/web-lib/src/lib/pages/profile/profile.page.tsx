import { IUser } from '@jdesjardins/dist-lib';
import { localGetSelf } from '../../apis';
import { useAxios, usePrivateAxiosInstance } from '../../hooks';
import { UpdateUserForm } from './components/updateUserForm';

export const ProfilePageComponent = () => {
  const [request, cancel, data, loading, error] = useAxios<IUser>({
    instance: usePrivateAxiosInstance(localGetSelf),
    loadOnStart: true,
  });

  return (
    <>
      <UpdateUserForm />
    </>
  );
};
