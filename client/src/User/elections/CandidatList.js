import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CandidateList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppConfig from '../../config';

import VoteResult from '../../admin/Vote_result';

const CandidateList = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voted, setVote] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const card_number = sessionStorage.getItem("card_number");

  useEffect(() => {
    // Fetch candidate data 
    const fetchCandidates = async () => {
      try {
        const response = await fetch(`${AppConfig.serverUrl}/api/candidate/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('user_token')}`,
          },
          body: JSON.stringify({ card_number }),
        });

        if (response.ok) {
          const data = await response.json();
          setCandidates(data);
        } else {
          if (response.status === 403) {
            setVote(true);
          }
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async () => {
    if (selectedCandidate) {
      try {
        const response = await fetch(`${AppConfig.serverUrl}/vote/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('user_token')}`,
          },
          body: JSON.stringify({ selectedCandidate, card_number }),
        });

        if (response.ok) {
          setSelectedCandidate(null);
          navigate('/', { replace: true });
          window.location.reload();
        } else {
          console.error('Failed to submit vote:', response.statusText);
        }
      } catch (error) {
        console.error('Error during vote:', error);
      }
    } else {
      console.warn('Please select a candidate before voting');
    }
  };

  const handleCheckboxChange = (candidateId) => {
    setSelectedCandidate(candidateId);
  };

  return (
    <main>
      {isLoading ? (
        <div className="text-center mt-4">
          <p>Loading...</p>
        </div>
      ) : voted ? (
        <VoteResult />
      ) : (
        <div className="container mt-4" style={{ background: '#f8f9fa' }}>
          <h3 className="text-center mb-4">{voted}</h3>
          {candidates.length === 0 ? (
            <p className="text-center">No candidates available.</p>
          ) : (
            <div>
              {candidates.map((candidate, index) => (
                <div key={index} className="card mb-4 mx-auto" style={{ maxWidth: '500px' }}>
                  <img
                    src={candidate.imageUrl}
                    alt={candidate.name}
                    className="card-img-top"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{candidate.position}</h5>
                    <p className="card-text">{candidate.name}</p>
                    <div className="form-check ">
                      <input
                        className="form-check-input mr"
                        type="checkbox"
                        onChange={() => handleCheckboxChange(candidate.cin)}
                        checked={selectedCandidate === candidate.cin}
                        style={{ transform: 'scale(3)', marginLeft: '350px' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
        className={`btn btn-lg btn-block mt-4 ${voted === 'deja votee' ? 'btn-danger' : 'btn-success'}`}
        onClick={handleVote}
        
        disabled={!selectedCandidate}>Vote</button>
          
        </div>
      )}
    </main>
  );
};

export default CandidateList;
