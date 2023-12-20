import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CinCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    birth: '',
    fingerprint: '',
    code: '',
  });
  
    useEffect(() => {
  
  
    document.getElementById('card-holder').addEventListener('keyup', function () {
      var t = this;
      document.querySelector('.credit-card-box .card-holder div').innerHTML = t.value;
      setFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData, code: t.value };
        
        return updatedFormData;
      });
    });

  

    document.getElementById('fingerprint').addEventListener('focus', function () {
      document.querySelector('.credit-card-box').classList.add('hover');
    });

    document.getElementById('fingerprint').addEventListener('blur', function () {
      document.querySelector('.credit-card-box').classList.remove('hover');
    });

    document.getElementById('fingerprint').addEventListener('keyup', function () {
      setFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData, fingerprint: this.value };
        
        return updatedFormData;
      });
      document.querySelector('.cvv div').innerHTML = this.value;
    });

    setTimeout(function () {
      document.getElementById('fingerprint').focus();
      setTimeout(function () {
        document.getElementById('fingerprint').blur();
      }, 1000);
    }, 500);
  }, []);

  


  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    document.querySelector('.card-date div').innerHTML = `${selectedDate}`;
    setFormData((prevFormData) => {
      return { ...prevFormData, birth: selectedDate };
    });
  };



  // const { setUserSignedUp } = useUser();

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
  

  
  
    const handleCardNumberInput = (event) => {
    const maxLength = parseInt(event.target.maxLength, 10);
    const currentInput = event.target;
    const value=currentInput.value;
    
    
    if (currentInput.value.length >= maxLength) {
      currentInput.value=value.substr(0,8);
      event.preventDefault();
      return;
    }else{
      updateCardNumberDisplay();
    }
  
    // Move focus to the next input if available
    if (currentInput.value.length === maxLength - 1) {
      const nextInput = currentInput.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  
    
  };
  
  const updateCardNumberDisplay = () => {
    let cardNumber = '';
  
    document.querySelectorAll('.input-cart-number').forEach(function (input) {
      cardNumber += input.value;
    });
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, cardNumber: cardNumber};
      
      return updatedFormData;
    });
    document.querySelector('.front .number').innerHTML = cardNumber;
  };
  
  return (
   <div> <div className="checkout">
      <div>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ borderRadius: '15px', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>
          <path d="M208.09,0.00 C384.68,-161.89 -117.80,438.09 200.79,150.00 L-32.18,178.09 L0.00,0.00 Z" style={{ stroke: 'none', fill: '#EE23' }}></path>
        </svg>
      </div>

      <div className="credit-card-box">
        <div className="flip">
          <div className="front">
          <div className="chip" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/2560px-Flag_of_Tunisia.svg.png')" }}></div>
            
            
          <div
            className="number"
            
          ></div>

          
          
          <div className="chip" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Coat_of_arms_of_Tunisia.svg/649px-Coat_of_arms_of_Tunisia.svg.png')" }}></div>
<div className="logo">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Coat_of_arms_of_Tunisia.svg/649px-Coat_of_arms_of_Tunisia.svg.png" alt="Tunisia Coat of Arms" width="47.834" height="47.834" />
</div>

            
<div
  className="card-holder">
    <div
  
></div>
  <label>code:</label>
</div>

            <div className="card-date">
              <label>Date of birth</label>
              <div

  
>
  
</div>

            </div>

          </div>
          <div className="back">
            <div className="strip"></div>
            <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Coat_of_arms_of_Tunisia.svg/649px-Coat_of_arms_of_Tunisia.svg.png" alt="Tunisia Coat of Arms" width="47.834" height="47.834" />
                {/* Include the path elements for the Visa logo */}
                {/* ... (omitted for brevity) */}
             
            </div>
            <div className="cvv">
              <label>fingerprint</label>
              <div
 
  
>
   
      </div>

            </div>
          </div>
        </div>
      </div>

      
    </div>
    <form className="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
      <fieldset>
          <label htmlFor="card-number">Card Number</label>
          <input
            type="number"
            id="card-number"
            className="input-cart-number"
            maxLength="9"
            onKeyUp={(event) => handleCardNumberInput(event, 'card-holder')}
          />
        
        </fieldset>
        <fieldset>
          <label htmlFor="card-holder">Code de confirmation:</label>
          <input type="text" id="card-holder" />
        </fieldset>
        <fieldset className="fieldset-expiration">
        <label htmlFor="card-month">Date of birth</label>
        <div className="">
        <input
        type='date'
        id="card-date"
        onChange={handleDateChange}
       
    // Customize the date format as needed
      />
      
        </div>
      </fieldset>
        <fieldset className="fieldset-cvv">
          <label htmlFor="fingerprint">fingerPrint:</label>
          <input type="text" id="fingerprint" maxLength="9" />
        </fieldset>
        
        <button className="btn"><i className="fa fa-lock"></i> Verifier</button>
      <span id="error_res"></span>
      </form>
    </div>
    
  );
};

export default CinCard;
