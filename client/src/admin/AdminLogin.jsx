import React, { useState } from 'react';
import './AdminLogin.css'; // Make sure to import your CSS file
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
  const navigate = useNavigate();
  const [cin, setcin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlecinChange = (event) => {
    setcin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3030/api/admin/login', {
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
      <div className="grid">
        <form
          action="https://httpbin.org/post"
          method="POST"
          className="form login"
          onSubmit={handleSubmit}
        >
          <div className="form__field">
            <label htmlFor="login__cin">
              <span className="hidden">CIN  :</span>
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
            <label htmlFor="login__password">
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

          <div className="form__field">
            <input type="submit" value="Sign In" />
          </div>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
