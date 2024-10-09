// AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Si no hay usuario o no es admin, redirigir a la página de inicio
    if (!user || !user.isAdmin) {
        return <Navigate to="/dashboard" />; // O a la ruta que prefieras
    }

    return children; // Permitir el acceso a los hijos si el usuario es admin
};

export default AdminRoute;
