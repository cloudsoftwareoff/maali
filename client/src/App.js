import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useUser } from './user';
import CinCard from './ui/cin';
import Homepage from './ui/Home';
import AdminLogin from './admin/AdminLogin';
import AdminForm from './admin/adminform';
import { useAdmin } from './admin/AdminProvider';
import CandidateForm from './admin/condidat';
import AdminDashboard from './admin/AdminDashboard';

const NotFound = () => (
  <div>
    <h1>404 - Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

const App = () => {
  const { user } = useUser();
  const { admin } = useAdmin();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if both user and admin are defined before setting isLoading to false
    if (user !== undefined && admin !== undefined) {
      setIsLoading(false);
    }
  }, [user, admin]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route path="/" element={<Homepage />} />
        ) : (
          <Route path="/" element={<CinCard />} />
        )}

        <Route path="/login" element={<AdminLogin />} />
        <Route path="/adduser" element={<AdminForm />} />
        <Route path="/addcandidate" element={<CandidateForm />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
