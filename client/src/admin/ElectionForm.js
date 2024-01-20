import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppConfig from '../config';

const ElectionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    electionType: ''
  });

  const [activeElection, setActiveElection] = useState(false);
  const [electionData, setElectionData] = useState({});

  const token = sessionStorage.getItem('admin_token');

  useEffect(() => {
    const checkActiveElection = async () => {
      try {
        const response = await axios.get(`${AppConfig.serverUrl}/election/active`,
        {
          
            headers: {
            
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${token}`, 
              
                    }
                }
        );

        setActiveElection(response.data.active);
        if (response.data.active) {
          setElectionData(response.data.election);
        }
      } catch (error) {
        console.error('Error checking active election:', error.message);
      }
    };

    checkActiveElection();
    console.log(activeElection);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${AppConfig.serverUrl}/election/`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response
      console.log('Server response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error sending data to server:', error.message);
    }
  };

  return (
    <div>
      {activeElection ? (
        <div>
          <h2>Active Election Data</h2>
          {/* Display data of the ongoing election */}
          <p>Name: {electionData.name}</p>
          <p>Start Time: {electionData.startTime}</p>
          <p>End Time: {electionData.endTime}</p>
          <p>Election Type: {electionData.electionType}</p>
        </div>
      ) : (
        <div>
      
          <h2>Election Form</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Start Time:<br/>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          End Time:<br/>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Election Type:
          <input
            type="text"
            name="electionType"
            value={formData.electionType}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
        </div>
      )}
    </div>
  );
};

export default ElectionForm;
