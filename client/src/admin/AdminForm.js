import React, { useState, useEffect } from 'react';
import './css/AdminForm.css';  
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppConfig from '../config';
const token = sessionStorage.getItem('admin_token');


const AdminForm = () => {
  const navigate = useNavigate();
  const [errorMessage, seterrorMessage] = useState('');
  const [postalCodeData, setPostalCodeData] = useState([]); 
  const [selectedPostalCode, setSelectedPostalCode] = useState('');
  
  
  const [formData, setFormData] = useState({
    user_number: '',
    user_birthdate: '',
    user_fingerprint: '',
    user_email: '',
    user_name: '',
    locality:'',
    Delegation:'',
    postalcode:''
});

  const fetchData = async (code) => {
    if (code.length >= 3) {
      try {
        
        const response = await axios.get(`${AppConfig.serverUrl}/code/${code}`);
        const data = response.data;
        setPostalCodeData(data);
  
        
      } catch (error) {
        console.error('Error fetching postal code data:', error);
      }
    }
  };
  useEffect(() => {

    const hasSession = sessionStorage.getItem('admin_token') !== null;
  
  
    if (!hasSession) {
      navigate('/login');
    }
    fetchData(formData.postalcode);
}, [formData.postalcode]);

    
      const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      
        
      };
      const handlexChange = (e) => {
        const { name, value } = e.target;
    
        setSelectedPostalCode(value);
        setFormData((prevData) => ({
          ...prevData,
          Delegation: value.split(',')[0],
        }));
        setFormData((prevData) => ({
          ...prevData,
          locality: value,
        }));
         

      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch(`${AppConfig.serverUrl}/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`, 
            },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) {
            console.log('User registered successfully');
            alert("user added");
      
    
    } else {
            console.error('Failed to register user');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      
        // Optionally, you can still log the form data after submission
        console.log('Form Data:', formData);
      };
        
       
       
  return (
    <div className="row">
      <div className="col-md-12">
        <br/>

        <form action="index.html" method="post" onSubmit={handleSubmit}>
          <h1> Register user </h1>
        {/* <button onClick={handleLogout}>Logout</button> */}

          <fieldset>
            <legend>
              <span className="number">1</span> Carte Identite
            </legend>

            <label htmlFor="name">Numéro de carte d'identité:</label>
            <input
              type="number"
              id="number"
              name="user_number"
              value={formData.number}
              onChange={handleChange}
            />
             <label htmlFor="birthdate">Date de naissance:</label>
            <input
              type="date"
              id="birthdate"
              name="user_birthdate"
              value={formData.user_birthdate}
              onChange={handleChange}
            />

            <label htmlFor="email">code d'empreinte:</label>
            <input
              type="number"
              id="fingerprint"
              name="user_fingerprint"
              value={formData.user_fingerprint}
              onChange={handleChange}
            />

           

            
            
            <br />
            
          </fieldset>

          <fieldset>
            <legend>
              <span className="number">2</span>Profile
            </legend>
            <label htmlFor="email">email pour verification:</label>
            <input
              type="email"
              id="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
            />
            <label htmlFor="name">Nom complet:</label>
            <input
              type="text"
              id="name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
            />
            <label htmlFor="postalcode">Code Postal:</label>
            <input
              type="number"
              id="postalcode"
              name="postalcode"
              value={formData.postalcode}
              onChange={handleChange}
            />
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
            <br />
            
          </fieldset>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button onClick={handleSubmit} type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
