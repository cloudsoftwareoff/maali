import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAdmin } from './AdminProvider';

const AdminRoute = ({ element }) => {
  const { admin } = useAdmin();

  
  if (!admin) {
    
    return <Navigate to="/login" />;
  }

  
  return element;
};

export default AdminRoute;
