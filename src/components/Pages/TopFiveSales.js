// Imported React, useState for state management, useEffect for side effects, and axios for HTTP requests
import React, { useState, useEffect } from 'react';
import axios from 'axios';


// Functional component for displaying top 5 sales
const TopFiveSales = () => {
  // State variable to store the top 5 sales data
  const [sales, setSales] = useState([]);

  // useEffect hook to fetch top 5 sales data when the component mounts
  useEffect(() => {
    // Define a function to fetch top 5 sales data from the backend API
    const fetchSales = async () => {
      try {
        // Make a GET request to the backend API endpoint for top 5 sales
        const response = await axios.get('https://salesapp-backend.onrender.com/sales/topFiveSales');
        // Update the state with the received top 5 sales data
      
        setSales(response.data);
      } catch (err) {
        // Log any errors that occur during the API request
        console.log(err);
      }
    };

    // Call the fetchSales function when the component mounts
    fetchSales();
  }, []);

  // JSX for the component
  return (
    // Container for the content
    <div className="container">
      {/* Heading for the top 5 sales section */}
      <h2 className="text-center my-4">TOP 5 SALES</h2>
      {/* Responsive table for displaying sales data */}
      <div className="table-responsive">
        {/* Table with dark styling for headers */}
        <table className="table">
          <thead className="table-dark">
            {/* Table row for column headers */}
            <tr>
              <th scope="col">#</th>
              <th scope="col">Sales ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sale Amount</th>
            </tr>
          </thead>
          {/* Table body for data rows */}
          <tbody>
            {/* Map through the sales data and create a table row for each sale */}
            {sales.map((sale, index) => (
              <tr key={index}>
                {/* Table cell for index + 1 */}
                <th scope="row">{index + 1}</th>
                {/* Table cell for sales ID */}
                <td>{'SI' + sale._id.toString().substring(sale._id.length - 3)}</td>
                {/* Table cell for product name */}
                <td>{sale.productName}</td>
                {/* Table cell for quantity */}
                <td>{sale.quantity}</td>
                {/* Table cell for calculated sale amount */}
                <td>{sale.quantity * sale.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Export the TopFiveSales component
export default TopFiveSales;