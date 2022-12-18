/* eslint-disable react-hooks/exhaustive-deps */

import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useEffect, useState } from 'react';

export const useAxios = <T>(
  instance: AxiosInstance,
  config: AxiosRequestConfig,
  loadOnStart = true
): [T | undefined, boolean, string | undefined, () => void] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const controller: AbortController = new AbortController();

    if (loadOnStart) sendRequest();
    else setLoading(false);

    return () => {
      controller.abort();
    };
  }, []);

  const request = () => {
    sendRequest();
  };

  const sendRequest = () => {
    setLoading(true);
    instance(config)
      .then((response: AxiosResponse) => {
        setError(undefined);
        setData(response.data);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setData(undefined);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return [data, loading, error, request];
};
