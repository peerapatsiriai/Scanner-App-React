import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get('http://111.223.38.19/api/method/frappe.pi.getallitem'); // Replace with your API
        console.log(response.data.message.Data);
        setItems(response.data.message.Data); // Assuming the API response is an array of items
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    setInterval(() => {
      fetchData();
      console.log(1);
    }, 5000);
  }, []);

  //Table
  const columns = [
    { field: 'name', headerName: 'ID', width: 130 },
    { field: 'item_name', headerName: 'Item name', width: 300 },
    { field: 'creation', headerName: 'creation', width: 230 },
  ];

  const getRowId = (items) => items.name;

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
          <Typography variant='h5'>Item List</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Card>
            <DataGrid
              rows={items}
              columns={columns}
              getRowId={getRowId}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </Card>
        </Grid>
      </Grid>
      <Link
        to='/'
        style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginTop: '15px' }}
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

export default ItemList;
