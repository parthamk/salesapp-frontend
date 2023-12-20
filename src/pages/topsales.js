import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Topsales = () => {
  const [topSales, setTopSales] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchTopSales = async () => {
      try {
        // Assume you have a function to get the token from MongoDB
        const storedToken = await getStoredToken();
        setToken(storedToken);

        // Make a request to fetch top sales from the backend using MongoDB
        const response = await axios.get('http://localhost:5000/api/sales/top', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.status === 200) {
          // Update state with the fetched top sales data
          setTopSales(response.data);
        } else {
          // Handle unsuccessful response
          console.error('Failed to fetch top sales:', response.data.message);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error fetching top sales:', error.message);
      }
    };

    fetchTopSales();
  }, []);

  // Example function to get the token from MongoDB
  const getStoredToken = async () => {
    try {
      // Make a request to your backend to get the token from MongoDB
      const response = await axios.get('http://your-backend-api/api/auth/get-token');

      if (response.status === 200) {
        return response.data.token;
      } else {
        // Handle unsuccessful response
        console.error('Failed to get token:', response.data.message);
        return '';
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error getting token:', error.message);
      return '';
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="col-12 col-md-8">
        <h1 className="text-center mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          TOP 5 SALES
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-dark border-bottom-bold">
                #
              </th>
              <th scope="col" className="border-bottom-2 border-bottom-bold">
                SALES ID:
              </th>
              <th scope="col" className="border-bottom-2 border-bottom-bold">
                PRODUCT NAME
              </th>
              <th scope="col" className="border-bottom-2 border-bottom-bold">
                QUANTITY
              </th>
              <th scope="col" className="border-bottom-2 border-bottom-bold">
                SALE AMOUNT
              </th>
            </tr>
          </thead>
          <tbody>
            {topSales.map((sale, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{sale.salesId}</td>
                <td>{sale.productName}</td>
                <td>{sale.quantity}</td>
                <td>{sale.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Topsales;
