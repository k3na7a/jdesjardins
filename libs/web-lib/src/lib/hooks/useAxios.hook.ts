import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useCallback, useRef, useState } from 'react';

interface AxiosHookInterface<T> {
  instance: AxiosInstance;
  onSuccess?: (res: T) => void;
  onError?: (err: AxiosError) => void;
  onResolve?: () => void;
}

export const useAxios = <T>({
  instance,
  onSuccess,
  onError,
  onResolve,
}: AxiosHookInterface<T>): [
  (request?: AxiosRequestConfig) => void,
  () => void,
  T | undefined,
  boolean,
  AxiosError | undefined
] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError>();

  const controllerRef = useRef(new AbortController());

  const cancel = useCallback(() => {
    controllerRef.current.abort();
    controllerRef.current = new AbortController();
  }, []);

  const sendRequest = useCallback(
    async (config?: AxiosRequestConfig) => {
      setLoading(true);
      instance({
        ...config,
        signal: controllerRef.current.signal,
      })
        .then((response: AxiosResponse) => {
          setError(undefined);
          setData(response.data);
          if (onSuccess) onSuccess(response.data);
        })
        .catch((error: AxiosError) => {
          setError(error);
          setData(undefined);
          if (onError) onError(error);
        })
        .finally(() => {
          setLoading(false);
          if (onResolve) onResolve();
        });
    },
    [instance, onError, onSuccess, onResolve]
  );

  return [sendRequest, cancel, data, loading, error];
};
