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
}

export const useAxios = <T>({
  instance,
  onSuccess,
  onError,
}: AxiosHookInterface<T>): [
  T | undefined,
  boolean,
  AxiosError | undefined,
  (request?: AxiosRequestConfig) => void,
  () => void
] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError>();

  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  };

  const sendRequest = useCallback(
    (config?: AxiosRequestConfig) => {
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
        });
    },
    [instance, onError, onSuccess]
  );

  const request = useCallback(
    (config?: AxiosRequestConfig) => {
      setTimeout(sendRequest, 1000, config);
    },
    [sendRequest]
  );

  return [data, loading, error, request, cancel];
};
