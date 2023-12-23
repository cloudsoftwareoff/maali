import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const token = sessionStorage.getItem('admin_token');


const CandidateForm = () => {
  const navigate = useNavigate();
  const [postalCode, setPostalCode] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [postalCodeData, setPostalCodeData] = useState([]);
  const [selectedPostalCode, setSelectedPostalCode] = useState('');
  const fetchData = async (code) => {
    if (code.length == 4) {
      try {
        
        const response = await axios.get(`https://maali.onrender.com/code/${code}`);
        const data = response.data;
  
        // Update the state with the retrieved data
        setPostalCodeData(data);
      } catch (error) {
        console.error('Error fetching postal code data:', error);
      }
    }
  };
    const [candidateData, setCandidateData] = useState({
      cinNumber: '',
      name: '',
      imageUrl: '',
      position: '',
      location:'',
      postalcode:''
    });
  useEffect(() => {

    const hasSession = sessionStorage.getItem('admin_token') !== null;
  
  
    if (!hasSession) {
      navigate('/login');
    }
    fetchData(candidateData.postalcode);

}, [candidateData.postalcode]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({ ...prevData, [name]: value }));
  
  };
  const handlexChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({ ...prevData, [name]: value }));
    setSelectedPostalCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the candidateData to the server
      const response = await axios.post('https://maali.onrender.com/api/add/candidat',
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
        
        setCandidateData({
          cinNumber: '',
          name: '',
          imageUrl: '',
          position: '',
          location:'',
          postalcode:''
        });
      }else{
        //console.log("erroe");
        seterrorMessage('Duplicate entry. Candidate with the same position or cinNumber already exists.');
      }
    } catch (error) {
      seterrorMessage('Duplicate entry. Candidate with the same position or cinNumber already exists.');
      //console.error('Error submitting candidate data:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>

<div>
      <label>
        Postal Code:
        <input
        maxLength={4}
          type="text"
          name="postalcode"
          value={candidateData.postalcode}
          onChange={handleChange}
        />
      </label>
      <br />

      {postalCodeData.length > 0 && (
        <label>
          Address:
          <select name="location" value={selectedPostalCode} onChange={handlexChange}>
            <option value="" disabled>Address:</option>
            {postalCodeData.map((result) => (
              <option key={result.CodePostal} value={result.CodePostal}>
                {result.Localité} , {result.Délégation} ,{result.Gouvernorat} 
              </option>
            ))}
          </select>
        </label>
      )}
    </div>

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

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default CandidateForm;
