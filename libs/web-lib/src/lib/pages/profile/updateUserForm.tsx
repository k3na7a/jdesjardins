import { IUser } from '@jdesjardins/dist-lib';
import { localGetSelf } from '../../apis';
import { useAxios, usePrivateAxiosInstance } from '../../hooks';

export const UpdateUserForm = () => {
  const [request, cancel, data, loading, error] = useAxios<IUser>({
    instance: usePrivateAxiosInstance(localGetSelf),
    loadOnStart: true,
  });
  return <>{data?.email}</>;
};
