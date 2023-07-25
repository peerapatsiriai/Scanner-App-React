import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get('http://111.223.38.19/api/method/frappe.pi.getallitem'); // Replace with your API 
        // console.log(response.data.message.Data);
        setItems(response.data.message.Data); // Assuming the API response is an array of items
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <h1>{item.item_name} : {item.item_price} </h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
