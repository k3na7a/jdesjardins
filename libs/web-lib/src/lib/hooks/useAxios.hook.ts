import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

interface AxiosHookInterface<T> {
  instance: AxiosInstance;
  loadOnStart?: boolean;
  onSuccess?: (res: T) => void;
  onError?: (err: AxiosError) => void;
  onResolve?: () => void;
}

export const useAxios = <T>({
  instance,
  loadOnStart = false,
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
  const [loading, setLoading] = useState<boolean>(loadOnStart);
  const [error, setError] = useState<AxiosError>();
  const controllerRef = useRef(new AbortController());

  const cancel = useCallback(() => {
    controllerRef.current.abort();
  }, []);

  const sendRequest = useCallback(
    (config?: AxiosRequestConfig) => {
      setLoading(true);
      if (controllerRef.current.signal.aborted)
        controllerRef.current = new AbortController();
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

  useEffect(() => {
    if (loadOnStart) sendRequest();
    return () => {
      cancel();
    };
  }, [cancel, loadOnStart, sendRequest]);

  return [sendRequest, cancel, data, loading, error];
};
