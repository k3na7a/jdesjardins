import { IAccessToken } from '@jdesjardins/dist-lib';
import { useOutletContext } from 'react-router-dom';

export function useRequireAuthContext() {
  return useOutletContext<IAccessToken>();
}
