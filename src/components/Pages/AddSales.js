// Import React, useState for state management, axios for HTTP requests, and ToastContainer, toast for notifications
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Functional component for adding sales entries
const AddSales = () => {
  // State variables to manage input values
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!productName || !quantity || !amount) {
      toast.error('All fields should be filled');
      return;
    }

    // Validation for non-positive values
    if (quantity <= 0 || amount <= 0) {
      toast.error('Quantity and Amount should be more than zero');
      return;
    }

    try {
      // Make a POST request to the backend API to add sales data
      const response = await axios.post('https://salesapp-backend.onrender.com/sales/addSales', {
        productName,
        quantity,
        amount
      });

      // Check if the data was added successfully
      if (response.data) {
        toast.success('Sales Data Added');
        // Clear input fields after successful submission
        setProductName('');
        setQuantity('');
        setAmount('');
      }
    } catch (err) {
      // Handle errors during the API request
      toast.error('Error adding sales data');
    }
  };

  // JSX for the component
  return (
    // Container for the entire form
    <div className="container">
      {/* Heading for the add sale entry section */}
      <h2 className="text-center my-4">ADD SALE ENTRY</h2>
      {/* Form element with event handler for form submission */}
      <form onSubmit={handleSubmit}>
        {/* Form field for product name */}
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          {/* Input field for product name with value and onChange handler */}
          <input type="text" className="form-control" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>
        {/* Form field for quantity */}
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          {/* Input field for quantity with value and onChange handler */}
          <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        {/* Form field for amount */}
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          {/* Input field for amount with value and onChange handler */}
          <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        {/* Submit button for the form */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

// Export the AddSales component
export default AddSales;
