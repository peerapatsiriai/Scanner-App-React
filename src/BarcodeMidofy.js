import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useAppContext } from './AppContext'; // Import context here
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

const BarcodeScanner = () => {
  const { scannedValues, setScannedValues } = useAppContext(); // Replace local state with context
  const inputRef = useRef(null);
  const url_insert = 'http://111.223.38.19/api/method/frappe.pi.addnewitem';

  const addnewitem = async (url, value) => {
    try {
      const data = {
        item_name: value,
        item_price: Math.floor(Math.random() * 10)
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
        await axios.get('http://localhost:3205/printbill',{ params: data })
      }
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
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
      <Grid
        container
        justifyContent='center'
      >
        <Grid
          item
          xs={12}
          sx={{ mt: '15vh', mb: '25px', display: 'flex', justifyContent: 'center' }}
        >
          <Typography variant='h5'>Barcode Scanner Modify App</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Card sx={{ padding: '20px', margin: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h2>Scanned Values:</h2>
            </div>
            <ul>
              {scannedValues.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </Card>
          <input
            ref={inputRef}
            type='text'
            style={{ position: 'absolute', left: '-9999px' }}
          />
        </Grid>
      </Grid>
      <Link
        to='/'
        style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}
      >
        <Button
          variant='outlined'
          color='error'
        >
          ย้อนกลับ
        </Button>
      </Link>
    </div>
  );
};

export default BarcodeScanner;
