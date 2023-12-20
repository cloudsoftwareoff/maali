import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CandidateList.css';

const CandidateList = () => {
  const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [voted, setvote] = useState("Candidate List");
    
    const card_number=sessionStorage.getItem("card_number");
    useEffect(() => {
      // Fetch candidate data from your API endpoint
      const fetchCandidates = async () => {
        console.log(card_number);
        try {
            const response = await fetch('http://127.0.0.1:3030/api/get/candidat', {
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
            navigate('/', { replace: true });
            window.location.reload();
          } else {
            if(response.status === 403){

                setvote('you have already voted');
               // console.error('Failed to fetch candidates');
            }
          }
        } catch (error) {
          console.error('Error fetching candidates:', error);
        }
      };
  
      fetchCandidates();
    }, []);
  
    const handleVote = async () => {
        if (selectedCandidate) {
          try {
            const response = await fetch('http://127.0.0.1:3030/vote', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('user_token')}`,  // Assuming you have a token in your user object
              },
              body: JSON.stringify({ selectedCandidate , card_number }),
            });
    
            if (response.ok) {
              console.log('Vote submitted successfully!');
              // Reset selected candidate after voting
              setSelectedCandidate(null);
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
      <div>
        <h3>{voted}</h3>
        <ul>
          {candidates.map((candidate, index) => (
            <li key={index}>
              <b>{candidate.position} <img src={candidate.imageUrl} alt={` of ${candidate.name}`} style={{ width: '70px', height: '70px' }} />
                <strong>{candidate.name}</strong></b>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(candidate.cin)}
                checked={selectedCandidate === candidate.cin}
              />
            </li>
          ))}
        </ul>
        <button onClick={handleVote} disabled={!selectedCandidate}
        style={{
            background: voted === 'deja votee' ? 'red' : 'green',
          }}
        >
          Vote
        </button>
      </div>
    );
  };
  
  export default CandidateList;