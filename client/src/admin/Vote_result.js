import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppConfig from '../config';
import ElectionTimer from '../User/elections/ElectionTime';

const VoteResult = () => {
  const [votesData, setVotesData] = useState({});
  const [electionEnded, setElectionEnded] = useState(false);

  // Fetch votes data
  const fetchVotes = async () => {
    try {
      const response = await fetch(`${AppConfig.serverUrl}/election/r`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('admin_token')}`,
        },
      });

      const responseData = await response.json();
      setVotesData(responseData);
      setElectionEnded(true);
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  // Render votes based on the received data structure
  const renderVotes = () => {
    if (!votesData || !votesData.votes) {
      return <p>No votes data available.</p>;
    }

    const { votes } = votesData;

    if (Object.keys(votes).length > 0) {
      // Render global votes
      if (votes.global) {
        console.log('global');
        return (
          <div className="row">
  {Object.entries(votes.global).map(([candidateId, voteData]) => (
    <div key={candidateId} className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card">
        {/* { <p>{voteData.nom}: {voteData.votes} votes</p> } */}
        <img
          src={voteData.photo}
          alt={voteData.name}
          className="card-img-top"
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{voteData.name}</h5>
          <b className="card-text">{voteData.votes}</b>
        </div>
      </div>
    </div>
  ))}
</div>

        
        );
      }
    
      // Render votes for each region
      return (
        <div className="row">
          
          {Object.entries(votes).map(([region, candidates]) => (
            <div key={region} className="col-12 col-md-6 col-lg-4 mb-4">
    
           
              <p>{region}:</p>
              {Object.entries(candidates).map(([candidateId, voteData]) => (
              <div key={candidateId} className="card">
              <img
          src={voteData.photo}
          alt={voteData.name}
          className="card-img-top"
          style={{ height: '300px', objectFit: 'cover' }}
        />
                  
                  <div className="card-body">
          <h5 className="card-title">{voteData.name}</h5>
          <b className="card-text">{voteData.votes}</b>
        </div>
                  
                    </div>
              ))}
            </div>
          ))}
        </div>
      );
    } else {
      return <p>No valid votes data received.</p>;
    }
    
  };

  return (
    <div>
      {electionEnded ? (
        <div className="container mt-4">
          {renderVotes()}
        </div>
      ) : (
        <ElectionTimer />
      )}
    </div>
  );
};

export default VoteResult;
