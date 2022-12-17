/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export const useAxios = <T>(
  config: AxiosRequestConfig,
  loadOnStart = true
): [boolean, T | undefined, string, () => void] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (loadOnStart) sendRequest();
    else setLoading(false);
  }, []);

  const request = () => {
    sendRequest();
  };

  const sendRequest = () => {
    setLoading(true);
    axios(config)
      .then((response: AxiosResponse) => {
        setError('');
        setData(response.data);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return [loading, data, error, request];
};
