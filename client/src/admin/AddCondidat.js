import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppConfig from '../config';
const token = sessionStorage.getItem('admin_token');

const CandidateForm = () => {
  const navigate = useNavigate();

  // const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);


  const [postalCode, setPostalCode] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [postalCodeData, setPostalCodeData] = useState([]);
  const [selectedPostalCode, setSelectedPostalCode] = useState('');
  

  const fetchData = async (code) => {
    if (code.length === 4) {
      try {
        
        const response = await axios.get(`${AppConfig.serverUrl}/code/${code}`);
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
      electionId:'',
      name: '',
      imageUrl: '',
      position: '',
      location:'',
      Delegation:'',
      postalcode:''
    });

  
  useEffect(() => {

  const hasSession = sessionStorage.getItem('admin_token') !== null;
  
  axios.get(`${AppConfig.serverUrl}/election/ongoing`)
  .then(response => {
    const lastElection = response.data.lastElection;
    setSelectedElection(lastElection);

    setCandidateData((prevData) => ({
      ...prevData,
      electionId: lastElection.id
    }));
  })
  .catch(error => console.error(error));

  
  if (!hasSession) {
      navigate('/login');
    }
    fetchData(candidateData.postalcode);

}, [candidateData.postalcode,navigate]);


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "cinNumber" && value.length === 8) {
      try {
        const response = await axios.get(`${AppConfig.serverUrl}/u/${value}`);
        const userData = response.data;
  
        // Update the form fields with the retrieved user data
        setCandidateData((prevData) => ({
          ...prevData,
          name: userData.user_name || "",
          postalcode: userData.postalcode || "",
          location:userData.locality,
          Delegation:userData.Delegation
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };
  const handlexChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({ ...prevData, [name]: value }));
    setCandidateData((prevData) => ({ ...prevData, Delegation: value.split(',')[0] }));
    
    setSelectedPostalCode(value);
  };
  // const handleSelectChange = (event) => {
  //   const selectedId = event.target.value;
  //   const selected = elections.find(election => election._id === selectedId);
  //   setSelectedElection(selected);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCandidateData((prevData) =>
      ({ ...prevData, electionId: selectedElection.id}));
                
    try {
      // Send the candidateData to the server
      const response = await axios.post(`${AppConfig.serverUrl}/api/candidate/add`,
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

<div>
    
    
      
      {selectedElection && (
        <label>
        Election Name:
          <input
          maxLength={4}
            type="text"
            name="electionName"
            value={selectedElection.name}
          
          disabled/>
        </label>
        // <div>
        //   <h2>Selected Election Details:</h2>
        //   <p>ID: {selectedElection.id}</p>
        //   <p>Name: {selectedElection.name}</p>
        //   <p>Start Time: {new Date(selectedElection.startTime).toLocaleString()}</p>
        //   <p>End Time: {new Date(selectedElection.endTime).toLocaleString()}</p>
        //   <p>Type: {selectedElection.electionType}</p>
        // </div>
      )}
    </div>
    <label>
        Cin Number:
        <input type="number" name="cinNumber" value={candidateData.cinNumber} onChange={handleChange} />
      </label>
      <br />
      <label>
        Name:
        <input type="text" name="name" value={candidateData.name} onChange={handleChange} />
      </label>
      
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
          <select name="location" value={candidateData.location || selectedPostalCode} onChange={handlexChange}>
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
        Image URL:
        <input type="text" name="imageUrl" value={candidateData.imageUrl} onChange={handleChange} />
      </label>
      <br />

      <label>
        Position:
        <input type="number" name="position" value={candidateData.position} onChange={handleChange} />
      </label>
      <br />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default CandidateForm;
