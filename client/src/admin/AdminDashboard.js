import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VoteResult from './Vote_result';
import AppConfig from '../config';
import ElectionForm from './ElectionForm';
import AdminForm from './AdminForm';
import CandidateForm from './AddCondidat';

import UserList from './UserList';
import VoteChart from './VoteChart';
import AddAdminForm from './AddAdmin';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState("chart");
  const [votesByHour, setVotesByHour] = useState([]);
  useEffect(() => {
    const hasSession = sessionStorage.getItem('admin_token') !== null;
    if (!hasSession) {
      navigate('/login');
    }

    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('admin_token'); // Assuming you store the token in sessionStorage

        const response = await fetch(`${AppConfig.serverUrl}/vote/graph`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setVotesByHour(data.votesByHour);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    navigate('/login');
  };

  const showForm = (formType) => {
    setCurrentForm(formType);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/login">
            <img src="/img/vote_icon.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />
            Maali Vote
          </a>
          <div className="mx-auto">
            <table>
              <tbody>
                <tr>
                  <td className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => showForm('addUser')}
                    >
                      Add User
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => showForm('showUser')}
                    >
                      Show Users
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-success"
                      onClick={() => showForm('addCandidate')}
                    >
                      Add Candidate
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-info"
                      onClick={() => showForm('election')}
                    >
                      Start Election
                    </button>
                    <button
                      className="btn btn-warning"
                    onClick={() => showForm('result')}
                    >
                      Show Result
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => showForm('newadmin')}
                  
                    >
                      New  Admin
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </nav>

      <h1 className="text-center">Admin Dashboard</h1>

      {currentForm === 'chart' && <VoteChart votesByHour={votesByHour} />}
      {currentForm === 'addUser' && <AdminForm />}
      {currentForm === 'showUser' && <UserList />}
      {currentForm === 'addCandidate' && <CandidateForm />}
      {currentForm === 'election' && <ElectionForm />}
      {currentForm === 'result' && <VoteResult />}
      {currentForm === 'newadmin' && <AddAdminForm />}
    </div>
  );
};

export default AdminDashboard;
