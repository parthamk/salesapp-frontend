// Import React, useState for state management, useEffect for side effects, and axios for HTTP requests
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Functional component for displaying today's total revenue
const TodaysSales = () => {
  // State variable to store the totalAmount
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to fetch today's total sales amount from the backend API
  const fetchTotalAmount = async () => {
    try {
      // Make a GET request to the backend API endpoint for total sales
      const response = await axios.get('https://salesapp-backend.onrender.com/sales/totalSales');
      // Log the response data to the console for debugging
      console.log(response);
      // Update the state with the received total sales amount
      setTotalAmount(response.data);
    } catch (err) {
      // Log any errors that occur during the API request
      console.log(err);
    }
  };

  // useEffect hook to fetch totalAmount when the component mounts or totalAmount changes
  useEffect(() => {
    // Call the fetchTotalAmount function when the component mounts or totalAmount changes
    fetchTotalAmount();
  }, [totalAmount]);

  // JSX for the component
  return (
    // Container for the content
    <div className="container">
      {/* Heading displaying today's total revenue */}
      <h2 className="text-center my-4">TOTAL REVENUE IS {totalAmount}</h2>
    </div>
  );
};

// Export the TodaysSales component
export default TodaysSales;
