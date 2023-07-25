// index.js (or wherever your root component is defined)
import React from 'react';
import ReactDOM from 'react-dom';
import BarcodeScanner from './BarcodeMidofy'; // Make sure you import the correct component name
import DisplayList from './DisplayList';
import { AppContextProvider } from './AppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BarcodeScanner />} />
          <Route path="/list" element={<DisplayList />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
