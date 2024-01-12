import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopFiveSales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('https://salesapp-backend.onrender.com/sales/topFiveSales');
        setSales(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center my-4">TOP 5 SALES</h2>
      <div className="table-responsive">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Sales ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sale Amount</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{'SI' + sale._id.toString().substring(sale._id.length - 3)}</td>
                <td>{sale.productName}</td>
                <td>{sale.quantity}</td>
                <td>{sale.quantity * sale.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopFiveSales;
