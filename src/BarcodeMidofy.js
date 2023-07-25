import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useAppContext } from './AppContext'; // Import context here

const BarcodeScanner = () => {
  const { scannedValues, setScannedValues } = useAppContext(); // Replace local state with context
  const inputRef = useRef(null);
  const url_insert = 'http://111.223.38.19/api/method/frappe.pi.addnewitem';

  const addnewitem = async (url, value) => {
    try {
      const data = {
        item_name: value,
        item_price: Number(value) / 2,
      };
      const response = await Axios.post(url, data);

      if (!response) {
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 700,
        });
      }
      console.log(response.data.message);
    } catch (error) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const handleBarcodeKeyDown = async (event) => {
      if (event.key === 'Enter') {
        if (inputRef.current.value.trim()) {
          await setScannedValues((prevValues) => [...prevValues, inputRef.current.value.trim()]);
          await addnewitem(url_insert, inputRef.current.value.trim()); // Send data to the API
          inputRef.current.value = ''; // Clear the input field after scanning
        } else {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong Plese restart the page!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    };

    if (inputRef.current) {
      inputRef.current.focus(); // Programmatically set focus to the input field
    }

    document.addEventListener('keydown', handleBarcodeKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleBarcodeKeyDown);
    };
  }, []); // Dependency array is still empty as useEffect runs once on mount and on unmount

  return (
    <div>
      <header>
        <h1>Barcode Scanner Modify App</h1>
      </header>
      <main>
        <div className='scanned-values'>
          <h2>Scanned Values:</h2>
          <ul>
            {scannedValues.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
        <input
          ref={inputRef}
          type='text'
          style={{ position: 'absolute', left: '-9999px' }}
        />
      </main>
      <footer>{/* Add any footer content you may need */}</footer>
    </div>
  );
};

export default BarcodeScanner;
