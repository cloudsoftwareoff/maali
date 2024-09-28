import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import HCaptcha from 'react-hcaptcha';
import AppConfig from '../config';

const CardCin = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    birth: '',
    fingerprint: '',
    code: '',
    hcaptchaToken :'',
  });
  // TODO change it to false in prod
  const [isHcaptchaVerified, setIsHcaptchaVerified] = useState(true);


const handleHcaptchaVerify = (token) => {
  setFormData((prevData) => ({
    ...prevData,
    hcaptchaToken: String(token),
  }));
  
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
      
      const response = await fetch(`${AppConfig.serverUrl}/u/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (response.status === 200) {

        const { token, user_name,card_number } = await response.json();
      
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
 

  return (

    <div >
    <div className="container mt-4">
   
      <form>
        <div className="mb-3">
        <table>
          <td>

          <i className="fas fa-id-card-alt"></i>
          </td>
          <td>

          <label className="form-label">{t('userform.cardNumber')}</label>
          </td>
          </table>
          <input
            maxLength={8}
            type="number|password"
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
        <label className="form-label">{t('userform.fingerprint')}</label>
        </td>

          </table>

          <input
            maxLength={8}
            type="password"
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
          <label className="form-label">{t('userform.birth')}</label>
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

          <label className="form-label"> {t('userform.code')}</label>
            </td>
          </table>
          <input
            maxLength={6}
            type="password"
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
            {t('userform.verifyButton')}
          </button>
        </div>
    
      </form>
    </div>
    </div>
  );
 
};

export default CardCin;
