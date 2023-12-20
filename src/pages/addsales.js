import React, { useState } from 'react';


const Addsales = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/sales/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productName, quantity, amount }),
      });

      if (response.ok) {
        console.log('Sale entry added successfully');
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="mt-1">
      <h1 className="text-center mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        ADD SALE ENTRY
      </h1>
      <div className="container">
        <div className="p-4 rounded shadow-sm bg-white" style={{ width: '80%', margin: 'auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="text"
                className="form-control"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addsales;
