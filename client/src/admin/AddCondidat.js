import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const token = sessionStorage.getItem('admin_token');
const CandidateForm = () => {
  const navigate = useNavigate();
  useEffect(() => {

    const hasSession = sessionStorage.getItem('admin_token') !== null;
  
  
    if (!hasSession) {
      navigate('/login');
    }
}, []);
  const [candidateData, setCandidateData] = useState({
    cinNumber: '',
    name: '',
    imageUrl: '',
    position: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the candidateData to the server
      const response = await axios.post('http://127.0.0.1:3030/api/add/candidat',
   candidateData,
   {
      headers: {
      
         "Content-Type": "application/json", 
         "Authorization": `Bearer ${token}`, 
        
      }
   }
);

      if (response.status === 200) {
        console.log('Candidate data submitted successfully!');
        // Optionally, reset the form after successful submission
        setCandidateData({
          cinNumber: '',
          name: '',
          imageUrl: '',
          position: '',
        });
      }
    } catch (error) {
      console.error('Error submitting candidate data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Cin Number:
        <input type="text" name="cinNumber" value={candidateData.cinNumber} onChange={handleChange} />
      </label>
      <br />

      <label>
        Name:
        <input type="text" name="name" value={candidateData.name} onChange={handleChange} />
      </label>
      <br />

      <label>
        Image URL:
        <input type="text" name="imageUrl" value={candidateData.imageUrl} onChange={handleChange} />
      </label>
      <br />

      <label>
        Position:
        <input type="text" name="position" value={candidateData.position} onChange={handleChange} />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CandidateForm;
