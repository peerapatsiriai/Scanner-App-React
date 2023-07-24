import React, { useEffect, useRef, useState } from 'react';

const BarcodeScanner = () => {
  const [scannedValues, setScannedValues] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleBarcodeKeyDown = (event) => {
      // Check if the Enter key is pressed to indicate the end of the barcode scan
      if (event.key === 'Enter') {
        const scannedValue = event.target.value.trim();
        setScannedValues((prevValues) => [...prevValues, scannedValue]);
        inputRef.current.value = ''; // Reset the input field for the next scan
      }
    };

    if (inputRef.current) {
      inputRef.current.addEventListener('keydown', handleBarcodeKeyDown);
      inputRef.current.focus(); // Programmatically focus the input field
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keydown', handleBarcodeKeyDown);
      }
    };
  }, []);

  return (
    <div>
      <h1>Barcode Scanner App</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Scan barcode here"
        style={{ width: '300px', padding: '10px' }}
      />
      <div>
        <h2>Scanned Values:</h2>
        <ul>
          {scannedValues.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BarcodeScanner;
