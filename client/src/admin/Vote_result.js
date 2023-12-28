import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppConfig from '../config';
const VoteResult = () => {
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);

  // Fetch candidate data
    const fetchCandidates = async () => {
    try {
    const response = await fetch(`${AppConfig.serverUrl}/api/get/candidat`,
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify({ card_number:"admin" }),
    });
    
    

    const candidatesData = await response.json();
    setCandidates(candidatesData);
    } catch (error) {
    console.error('Error fetching candidates:', error);
    }
    };

  // Fetch votes data
    const fetchVotes = async () => {
    try {
        const response = await fetch(`${AppConfig.serverUrl}/allvotes`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('admin_token')}`,
        },
    });
    const votesData = await response.json();
    setVotes(votesData);
    } catch (error) {
    console.error('Error fetching votes:', error);
    }
    };

useEffect(() => {
    fetchCandidates();
    fetchVotes();
}, []);

  
  const calculatePercentage = (candidateId) => {
    const candidateVotes = votes.find((vote) => vote._id === candidateId)?.votes || 0;
    const totalVotes = votes.reduce((acc, vote) => acc + vote.votes, 0);
    return totalVotes > 0 ? ((candidateVotes / totalVotes) * 100).toFixed(2) : 0;
    };

    return (
      <div className="container mt-4">
        <div className="row">
          {candidates.map((candidate, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card" style={{ maxWidth: '500px' }}>
                <img
                  src={candidate.imageUrl}
                  alt={candidate.name}
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{candidate.position}</h5>
                  <b className="card-text">{candidate.name}</b>
                  <p className="card-text">Votes: {votes.find((vote) => vote._id === candidate.cin)?.votes || 0}</p>
                  <p className="card-text">Percentage: {calculatePercentage(candidate.cin)}%</p>
                  <div className="form-check"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    
};

export default VoteResult;
