import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppConfig from '../config';
import ElectionTimer from '../User/elections/ElectionTime';

const VoteResult = () => {
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);
  const [electionEnded, setElectionEnded] = useState(false);

  // Fetch candidate data
  const fetchCandidates = async () => {
    try {
      const response = await fetch(`${AppConfig.serverUrl}/api/get/candidat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify({ card_number: "admin" }),
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
      const responseData = await response.json();
      if (responseData.type === 'votes') {
        setVotes(responseData.data);
        setElectionEnded(true);
      } else if (responseData.type === 'remainingTime') {
        setElectionEnded(false);
      }
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

  const renderCandidates = () => {
    // Sort candidates based on votes in descending order
    const sortedCandidates = candidates.sort((a, b) =>
      votes.find((vote) => vote._id === b.cin)?.votes -
      votes.find((vote) => vote._id === a.cin)?.votes
    );

    return sortedCandidates.map((candidate, index) => {
      let medalColor;
      if (index === 0) {
        medalColor = 'gold';
      } else if (index === 1) {
        medalColor = 'silver';
      } else if (index === 2) {
        medalColor = 'bronze';
      }

      return (
        <div key={index} className={`col-md-4 mb-4 ${medalColor}`}>
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
      );
    });
  };

  return (
    <div>
      {electionEnded ? (
        <div className="container mt-4">
          <div className="row">
            {renderCandidates()}
          </div>
        </div>
      ) : (
        <ElectionTimer />
      )}
    </div>
  );
};

export default VoteResult;
