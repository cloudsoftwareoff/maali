import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import './Navbar.css'; 
import { useNavigate } from 'react-router-dom';
const Navbar = ({name}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    sessionStorage.removeItem('user_token');
    navigate('/', { replace: true });
    window.location.reload();
  };
  return (
    <div>
      <header id="nav-wrapper">
        <nav id="nav" className={isMenuOpen ? 'nav-visible' : ''}>
          <div className="nav left">
            <span className="gradient skew">
              <h1 className="logo un-skew">
                <a href="#home">MaaliVote</a>
              </h1>
            </span>
            <button  id="menu" className="btn-nav" onClick={toggleMenu}>
              <FaBars />
            </button>
          </div>
          <div className="nav right">
           
            {/* {/* <a href="#about" className="nav-link">
              <span className="nav-link-span">
                <span className="u-nav">About</span>
              </span>
            </a> */}
            <a href="/" 
            onClick={handleLogout}
            className="nav-link">
              <span className="nav-link-span">
                <span className="u-nav">Logout</span>
              </span>
            </a> 
            <a href="#contact" className="nav-link">
              <span className="nav-link-span">
                <span className="u-nav">{name}</span>
              </span>
            </a>
          </div>
        </nav>
      </header>
      
    </div>
  );
};

export default Navbar;
