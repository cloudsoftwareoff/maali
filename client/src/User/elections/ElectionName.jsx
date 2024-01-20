import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppConfig from '../../config';


const ElectionName = ({location}) => {


  const [electionName, setElectionName] = useState('');


  //
  useEffect(() => {
    // Make an HTTP request to get the election name
    axios.get(`${AppConfig.serverUrl}/election/ongoing`) 
      .then(response => {
        const lastElection = response.data.lastElection;
        if (lastElection) {

          setElectionName(lastElection.name);

        } else {
        setElectionName('No ongoing elections');
        }
      })
      .catch(error => {
        console.error('Error fetching election name:', error);
        setElectionName('Error fetching election name');
      });
  }, []); 



  // interface 
  //afficher
  return (
    <div>
    <h3>{electionName}</h3>
    <h4>{location}</h4>
    
    </div>
  );
};

export default ElectionName;
