import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './CardCin.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import HCaptcha from 'react-hcaptcha';
import AppConfig from '../config';
const CardCin = () => {
    const navigate = useNavigate();
   
  const [formData, setFormData] = useState({
    cardNumber: '',
    birth: '',
    fingerprint: '',
    code: '',
    hcaptchaToken :'',
  });
  const [isHcaptchaVerified, setIsHcaptchaVerified] = useState(false);
  useEffect(() => {
    //console.log('Updated Form Data:', formData);
  }, [formData]);

const handleHcaptchaVerify = (token) => {
  //console.log('hCaptcha Token:', token);

  setFormData((prevData) => ({
    ...prevData,
    hcaptchaToken: String(token),
  }));
    //console.log("verify:"+formData);
  setIsHcaptchaVerified(true);
};

const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isHcaptchaVerified) {
      alert('Please complete hCaptcha verification.');
      return;
    }
    
    try {
      //console.log(formData);
      const response = await fetch(`${AppConfig.serverUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (response.status === 200) {

        //setUserSignedUp(true);
        //console.log('User registered successfully');
        const { token, user_name,card_number } = await response.json();
       // console.log(token);
        sessionStorage.setItem('user_name', user_name); 
        sessionStorage.setItem('user_token', token); 
        sessionStorage.setItem('card_number', card_number); 
      

        navigate('/', { replace: true });
        window.location.reload();


      } else {
      
      const { error } = await response.json();
      document.querySelector('#error_res').innerHTML = error;
      
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    //console.log('Form Data:', formData);
  };
  const tableStyle = {
    width: '100%',
  };

  const tdStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
  };

  const h2Style = {
    width: '50%',
  };

  const imgStyle = {
    width: '70px',
    height: '70px', // Maintain aspect ratio
  };

  

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-end mb-2">
        
      <table style={tableStyle}>
      <tr>
        <td style={tdStyle}>
          <h2 style={h2Style}>Maali VOTE</h2>
          
        </td>
        <td style={tdStyle}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Flag_of_Tunisia_%281959%E2%80%931999%29.svg/220px-Flag_of_Tunisia_%281959%E2%80%931999%29.svg.png"
            alt="Tunisia Flag"
            style={imgStyle}
          />
        </td>
      </tr>
    </table>
        
      </div>
      <form>
        <div className="mb-3">
        <table>
          <td>

          <i className="fas fa-id-card-alt"></i>
          </td>
          <td>

          <label className="form-label">Numero de carte:</label>
          </td>
          </table>
          <input
            maxLength={8}
            type="number"
            className="form-control"
            name="cardNumber"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <table>
        <td>
        <i className="fas fa-fingerprint"></i>
        </td>
        <td>
        <label className="form-label">Numéro d'empreinte digitale:</label>
        </td>

          </table>

          <input
            maxLength={8}
            type="number"
            className="form-control"
            name="fingerprint"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <table>
          <td>
          <i className="fas fa-calendar-alt"></i>
          </td>
          <td>
          <label className="form-label">Date de naissance:</label>
          </td>

          </table>
          
          
          
          <input
            type="date"
            className="form-control"
            name="birth"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <table>
            <td>
            <i className="fas fa-key"></i> 
            </td>
            <td>

          <label className="form-label">Code de confirmation:</label>
            </td>
          </table>
          <input
            maxLength={6}
            type="number"
            className="form-control"
            name="code"
            onChange={handleChange}
          />
        </div>
        <HCaptcha
            sitekey="3442d3a6-59fe-4543-bb39-a557d3d517d6"
            onVerify={handleHcaptchaVerify}
          />
        <span id="error_res"></span>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!isHcaptchaVerified}
          >
            vérifier
          </button>
        </div>
      </form>
    </div>
  );
 
};

export default CardCin;
