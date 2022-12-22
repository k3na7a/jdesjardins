/* eslint-disable react-hooks/exhaustive-deps */
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useEffect, useRef, useState } from 'react';

interface AxiosHookInterface<T> {
  instance: AxiosInstance;
  config: AxiosRequestConfig;
  loadOnStart?: boolean;
  onSuccess?: (res: T) => void;
  onError?: (err: AxiosError) => void;
}

export const useAxios = <T>({
  instance,
  config,
  loadOnStart = true,
  onSuccess,
  onError,
}: AxiosHookInterface<T>): [
  T | undefined,
  boolean,
  AxiosError | undefined,
  () => void,
  () => void
] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError>();
  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
    controllerRef.current = new AbortController();
  };

  const request = () => {
    sendRequest();
  };

  useEffect(() => {
    if (loadOnStart) request();
    else setLoading(false);

    return () => {
      cancel();
    };
  }, []);

  const sendRequest = () => {
    setLoading(true);
    instance({ ...config, signal: controllerRef.current.signal })
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
  };

  return [data, loading, error, request, cancel];
};
