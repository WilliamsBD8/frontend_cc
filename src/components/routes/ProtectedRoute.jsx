// ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { formatDate } from '../../assets/js/functions';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : null);

  if (!user) {
    return <Navigate to="/login" />;
  }
  const currentDate = new Date();

  if (!user.sesion) {
    user.sesion = currentDate.toISOString();
  }

  const dateSesion = new Date(user.sesion);
  const diferenciaMs = currentDate - dateSesion;
  const diferenciaMinutos = Math.floor(diferenciaMs / (1000 * 60));

  if(diferenciaMinutos > 60){
    localStorage.removeItem("user")
    return <Navigate to="/login" />;
  }else{
    user.sesion = currentDate.toISOString();
    localStorage.setItem("user", JSON.stringify(user));
  }

  return children;
};

export default ProtectedRoute;
