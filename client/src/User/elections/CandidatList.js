import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CandidateList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppConfig from '../../config';
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
            const response = await fetch(`${AppConfig.serverUrl}/api/get/candidat`,
            {
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
            const response = await fetch(`${AppConfig.serverUrl}/vote`, {
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
      <div className="container mt-4" style={{ background: '#f8f9fa'  }}>
        <h3 className="text-center mb-4">{voted}</h3>
        <div>
          {candidates.map((candidate, index) => (
            <div key={index} className="card mb-4 mx-auto" style={{ maxWidth: '500px'  }}>
              <img
                src={candidate.imageUrl}
                alt={candidate.name}
                className="card-img-top"
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{candidate.position}</h5>
                <p className="card-text">{candidate.name}</p>
                <div className="form-check "> {}
                <input
                    className="form-check-input mr"
                    type="checkbox"
                    onChange={() => handleCheckboxChange(candidate.cin)}
                    checked={selectedCandidate === candidate.cin}
                    
                    style={{ transform: 'scale(3)' , marginLeft:'350px' }}
                  />
                  
                  
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className={`btn btn-lg btn-block mt-4 ${voted === 'deja votee' ? 'btn-danger' : 'btn-success'}`}
          onClick={handleVote}
          disabled={!selectedCandidate}>Vote</button>
      </div></main>
    );
    
  };
  
  export default CandidateList;