import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AppConfig from '../../config';

const ElectionTimer = () => {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const fetchRemainingTime = async () => {
      try {
        const response = await axios.get(`${AppConfig.serverUrl}/election/time`);
        setRemainingTime(response.data.remainingTime);

        // Update remaining time every second on the client side
        const intervalId = setInterval(() => {
          setRemainingTime(prevRemainingTime => prevRemainingTime - 1000);
        }, 1000);

        // Clear the interval when the remaining time becomes zero
        if (response.data.remainingTime <= 0) {
          clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('Error fetching remaining time:', error.message);
      }
    };

    fetchRemainingTime();
  }, []);

  if (remainingTime === null) {
    return <p>Loading...</p>;
  }

  // Calculate remaining time components
  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  
  return (
    <div>
      <h3 className="text-center">Remaining Time</h3>
      <div className="text-center">
        <h4>{hours}h {minutes}m </h4>
        
      </div>
    </div>
  );
};

export default ElectionTimer;
