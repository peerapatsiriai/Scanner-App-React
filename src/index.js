import React from 'react';
import ReactDOM from 'react-dom';
import BarcodeScanner from './BarcodeMidofy';
import { AppContextProvider } from './AppContext';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <BarcodeScanner />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
