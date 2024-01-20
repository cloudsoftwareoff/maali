import React from 'react';
import './ElectionPage.css';
import CandidateList from './CandidatList';
import ElectionName from './ElectionName';

const ElectionPage = () => {
    
  return (
    <div className="election-page">
      <br/>
      <br/>
      <ElectionName/>
      
        <CandidateList />
        
    </div>
  );
};

export default ElectionPage;
