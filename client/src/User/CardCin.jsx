import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './CardCin.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const CardCin = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    birth: '',
    fingerprint: '',
    code: '',
  });
  
    useEffect(() => {
  
  
   
}, []);
// setFormData((prevFormData) => {
//   const updatedFormData = { ...prevFormData, code: t.value };
  
//   // return updatedFormData;
// });

const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('https://maali.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (response.ok) {

        //setUserSignedUp(true);
        console.log('User registered successfully');
        const { token, user_name,card_number } = await response.json();
        console.log(token);
        sessionStorage.setItem('user_name', user_name); 
        sessionStorage.setItem('user_token', token); 
        sessionStorage.setItem('card_number', card_number); 
      

        navigate('/', { replace: true });
        window.location.reload();


      } else {
        const errorResponse = await response.json();
        document.querySelector('#error_res').innerHTML = errorResponse.error;
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    console.log('Form Data:', formData);
  };
  

  

  return (
    <div className="container mt-4">

<h2>Maali VOTE</h2>
      <div className="d-flex justify-content-end mb-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Flag_of_Tunisia_%281959%E2%80%931999%29.svg/220px-Flag_of_Tunisia_%281959%E2%80%931999%29.svg.png"
          alt="Tunisia Flag"
          width="50"
          height="40"
        />
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Numero de carte:</label>
          <input
            maxLength={8}
            type="number"
            className="form-control"
            name="cardNumber"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Numéro d'empreinte digitale:</label>
          <input
            maxLength={8}
            type="number"
            className="form-control"
            name="fingerprint"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de naissance:</label>
          <input
            type="date"
            className="form-control"
            name="birth"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Code de confirmation:</label>
          <input
            maxLength={6}
            type="number"
            className="form-control"
            name="code"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
 
};

export default CardCin;
