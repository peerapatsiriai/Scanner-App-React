import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayData = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');

  // Function to fetch the data from the API and update the state
  const fetchData = () => {
    axios
      .get('http://your-api-endpoint-for-fetching-data') // Replace with your API endpoint to fetch data
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error occurred while fetching data:', error);
        setStatus('failure');
      });
  };

  // Call fetchData once on component mount to initialize the data
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle the form submit and insert new data
  const handleFormSubmit = (itemData) => {
    axios
      .post('http://your-api-endpoint-for-insert', itemData) // Replace with your API endpoint for inserting data
      .then((response) => {
        setStatus(response.data === 'Insert Success' ? 'success' : 'failure');
        fetchData(); // Fetch updated data after insert
      })
      .catch((error) => {
        console.error('Error occurred while inserting data:', error);
        setStatus('failure');
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* Your form inputs for item_name and item_price */}
        {/* ... */}
        <button type="submit">Add Item</button>
      </form>
      {status === 'success' && <p>Item added successfully!</p>}
      {status === 'failure' && <p>Failed to add item. Please try again later.</p>}

      {/* Map over the data to display it */}
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <p>Item Name: {item.item_name}</p>
            <p>Item Price: {item.item_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayData;
