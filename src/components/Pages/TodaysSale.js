import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodaysSales = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchTotalAmount = async () => {
    try {
      const response = await axios.get('https://salesapp-backend.onrender.com/sales/totalSales');
      console.log(response);
      setTotalAmount(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {

    fetchTotalAmount();
  }, [totalAmount]);

  return (
    <div className="container">
      <h2 className="text-center my-4">TOTAL REVENUE IS {totalAmount}</h2>
    </div>
  );
};

export default TodaysSales;
