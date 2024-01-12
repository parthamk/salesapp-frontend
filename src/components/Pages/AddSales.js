import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSales = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !quantity || !amount) {
      toast.error('All fields should be filled');
      return;
    }

    if (quantity <= 0 || amount <= 0) {
      toast.error('Quantity and Amount should be more than zero');
      return;
    }

    try {
      const response = await axios.post('https://salesapp-backend.onrender.com/sales/addSales', {
        productName,
        quantity,
        amount
      });

      if (response.data) {
        toast.success('Sales Data Added');
        setProductName('');
        setQuantity('');
        setAmount('');
      }
    } catch (err) {
      toast.error('Error adding sales data');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">ADD SALE ENTRY</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input type="text" className="form-control" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddSales;
