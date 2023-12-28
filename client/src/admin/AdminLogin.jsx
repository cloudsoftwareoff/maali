import React, { useState } from 'react';
import './css/AdminLogin.css'; // Make sure to import your CSS file
import { useNavigate } from 'react-router-dom';
import HCaptcha from 'react-hcaptcha';
import AppConfig from '../config';
const AdminLogin = () => {

  const [isHcaptchaVerified, setIsHcaptchaVerified] = useState(false);
  const navigate = useNavigate();
  const [cin, setcin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleHcaptchaVerify = (token) => {

    console.log('hCaptcha Token:', token);
  
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
        body: JSON.stringify({ cin, password }),
      });

      if (response.ok) {
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
    <div className="align">
      <h3>Admin </h3>
      <div className="grid">
        <form
          action="https://httpbin.org/post"
          method="POST"
          className="form login"
          onSubmit={handleSubmit}
        >
          <div className="form__field">
            <label htmlFor="login__cin">
            <i className="fas fa-id-card-alt"></i>  <span className="hidden">CIN  :</span>
            </label>
            <input
              id="login__cin"
              type="text"
              name="cin"
              className="form__input"
              placeholder="cin"
              required
              value={cin}
              onChange={handlecinChange}
            />
          </div>

          <div className="form__field">
          <i className="fas fa-key"></i> <label htmlFor="login__password">
              <span className="hidden">Password:</span>
            </label>
            <input
              id="login__password"
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <HCaptcha
            sitekey="3442d3a6-59fe-4543-bb39-a557d3d517d6"
            onVerify={handleHcaptchaVerify}
          />
          <div className="form__field">
            <input type="submit" 
            value="Sign In" 
            disabled={!isHcaptchaVerified}
            />
          </div>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
