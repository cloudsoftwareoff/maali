import React from 'react';
import './idcard.css';

const TunisiaIdCard = ({ idNumber, name, birthDate, address, photo }) => {
  return (
    <div className="id-card">
      <header>
        <img src="/tunisia-flag.png" alt="Tunisia Flag" />
        <h1>République Tunisienne</h1>
        <h2>Carte d'identité nationale</h2>
      </header>
      <main>
        <div className="photo">
          <img src={photo} alt="ID " />
        </div>
        <div className="info">
          <h3>Informations</h3>
          <ul>
            <li>Numéro d'identification : {idNumber}</li>
            <li>Nom : {name}</li>
            <li>Date de naissance : {birthDate}</li>
            <li>Adresse : {address}</li>
          </ul>
        </div>
      </main>
      <footer>
        <p>Ministère de l'Intérieur</p>
        <p>République Tunisienne</p>
      </footer>
    </div>
  );
};

export default TunisiaIdCard;
