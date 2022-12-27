import * as ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';

import { App } from '@jdesjardins/web-lib';
import { AuthContextProvider } from '@jdesjardins/web-lib';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  // </StrictMode>
);
