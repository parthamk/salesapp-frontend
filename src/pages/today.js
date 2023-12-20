import React, { useState, useEffect } from 'react';

const Today = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sales/totalrevenue', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTotalRevenue(data.totalRevenue);
        } else {
          const data = await response.json();
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchTotalRevenue();
  }, []);

  return (
    <div>
      <h1 className="headingtoday mt-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        TODAY'S REVENUE IS {totalRevenue}
      </h1>
    </div>
  );
};

export default Today;
