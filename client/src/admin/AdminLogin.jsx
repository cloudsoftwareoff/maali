import React, { useState } from 'react';
import './css/AdminLogin.css'; 
import { useNavigate } from 'react-router-dom';
import HCaptcha from 'react-hcaptcha';
import AppConfig from '../config';
const AdminLogin = () => {

  const [isHcaptchaVerified, setIsHcaptchaVerified] = useState(true);
  const navigate = useNavigate();
  const [cin, setcin] = useState('');
  const [password, setPassword] = useState('');
  const [hcaptchaToken,sethcaptchaToken]=useState('');

  const [error, setError] = useState('');

  
  const handleHcaptchaVerify = (token) => {

    sethcaptchaToken(token);
  
    setIsHcaptchaVerified(true);
  }
  const handlecinChange = (event) => {
    setcin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    if (!isHcaptchaVerified) {
      
    alert('Please complete hCaptcha verification.');
      return;
    }
    try {
      const response = await fetch(`${AppConfig.serverUrl}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cin, password ,hcaptchaToken}),
      });

      if (response.status === 200) {
        const { token } = await response.json();
        console.log('Admin logged in successfully!');
        sessionStorage.setItem('admin_token', token); 
      

        navigate('/admin', { replace: true });
        window.location.reload();
      } else {
        setError('Invalid cin or password');
        
      }
    } catch (error) {
      setError('Invalid cin or password');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="add-admin-form-container">
    <h3 className="form-title"> Admin Login</h3>
    
    <form className="admin-form" onSubmit={handleSubmit}>
      
      <div className="form-group">
          <label>CIN</label>
            
          <input type="text" className="form-control" placeholder="Enter CIN" value={cin} onChange={handlecinChange} />
  
          </div>

          <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={handlePasswordChange} />
     
          </div>
          <HCaptcha
            sitekey="3442d3a6-59fe-4543-bb39-a557d3d517d6"
            onVerify={handleHcaptchaVerify}
          />
          <div className="form__field">
            <button type="submit"  className="btn btn-primary"
            
            disabled={!isHcaptchaVerified}
            >Sign In</button>
          </div>

          {error && <p>{error}</p>}
        </form>
      </div>
    
  );
};

export default AdminLogin;
