import React, { useState } from 'react';
import AppConfig from '../config';
import HCaptcha from 'react-hcaptcha';
const AddAdminForm = () => {
  const [cin, setCin] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isHcaptchaVerified, setIsHcaptchaVerified] = useState(true);
 
  const handleHcaptchaVerify = (token) => {

    console.log('hCaptcha Token:', token);
  
    setIsHcaptchaVerified(true);
  }
  const handleCinChange = (event) => {
    setCin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = sessionStorage.getItem('admin_token'); // Assuming you store the token in sessionStorage

      const response = await fetch(`${AppConfig.serverUrl}/api/admin/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ cin, password }),
      });

      if (response.ok) {
        setSuccessMessage('Admin added successfully!');
        // Clear the form
        setCin('');
        setPassword('');
      } else {
        setErrorMessage('Error adding admin');
      }
    } catch (error) {
      setErrorMessage('Error adding admin:', error.message);
    }
  };

  return (
    <div className="add-admin-form-container">
      <h3 className="form-title">Add New Admin</h3>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>CIN</label>
          <input type="text" className="form-control" placeholder="Enter CIN" value={cin} onChange={handleCinChange} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={handlePasswordChange} />
        </div>
        <HCaptcha
            sitekey="3442d3a6-59fe-4543-bb39-a557d3d517d6"
            onVerify={handleHcaptchaVerify}
          />
        <button type="submit" className="btn btn-primary">
          Add Admin
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddAdminForm;
