import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VoteResult from './Vote_result';
import AppConfig from '../config';
import ElectionForm from './ElectionForm';
import AdminForm from './AdminForm';
import CandidateForm from './AddCondidat';
import ElectionTimer from '../User/elections/ElectionTime';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState(null);

  useEffect(() => {
    const hasSession = sessionStorage.getItem('admin_token') !== null;
    if (!hasSession) {
      navigate('/login');
    }
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
    <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/login">
      <img src="../../public/img/vote_icon.png" alt="" width="30" height="24" class="d-inline-block align-text-top"/>
      Maali Vote
    </a>
    <table className="mx-auto">
        <tbody>
          <tr>
            <td className="text-center">
              <button
                className="btn btn-primary"
                onClick={() => showForm('addUser')}
              >
                Add User
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
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</nav>  
      <h1 className="text-center">Admin Dashboard</h1>
      

      {currentForm === 'addUser' && <AdminForm />}
      {currentForm === 'addCandidate' && <CandidateForm />}
      {currentForm === 'election' && <ElectionForm />}
      {currentForm === 'result' && <VoteResult />}
    </div>
  );
};

export default AdminDashboard;
