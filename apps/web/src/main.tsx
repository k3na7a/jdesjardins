import * as ReactDOM from 'react-dom/client';

import './styles.scss';

import 'bootstrap';

import './i18n';

import { BrowserRouter } from 'react-router-dom';
import { App } from '@jdesjardins/web-lib';

import React from 'react';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
