/* eslint-disable react-hooks/exhaustive-deps */
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useEffect, useState } from 'react';

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
  () => void
] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const controller: AbortController = new AbortController();

    if (loadOnStart) sendRequest(controller);
    else setLoading(false);

    return () => {
      controller.abort();
    };
  }, []);

  const request = () => {
    sendRequest();
  };

  const sendRequest = (controller?: AbortController) => {
    console.log('Authenticating...');
    setLoading(true);
    setTimeout(() => {
      instance({ ...config, signal: controller?.signal })
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
    }, 1000);
  };

  return [data, loading, error, request];
};
