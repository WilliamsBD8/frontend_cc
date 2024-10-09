
import { Route } from 'react-router-dom';
import Login from '../auth/login.jsx';
import Register from '../auth/register.jsx';
import Forgot from '../auth/forgot.jsx';
import Dashboard from '../pages/dashboard.jsx';
import Products from '../pages/products/products.jsx';
import Invoices from '../pages/invoices/index.jsx';
import InvoicesCreated from '../pages/invoices/created.jsx';
import InvoicesEdit from '../pages/invoices/edit.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';
import AdminRoute from './AdminRoute.jsx';

export const RenderRoutes = () => {
    return (
      <>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgot_password" element={<Forgot />} />
        
        <Route exact path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route exact path="/products" element={
          <ProtectedRoute>
            <AdminRoute>
              <Products />
            </AdminRoute>
          </ProtectedRoute>
        } />

        <Route exact path="/invoices" element={
          <ProtectedRoute>
            <Invoices />
          </ProtectedRoute>
        } />

        <Route exact path="/invoices/created/:type" element={
          <ProtectedRoute>
            <InvoicesCreated />
          </ProtectedRoute>
        } />
        <Route exact path="/invoices/edit/:id" element={
          <ProtectedRoute>
            <InvoicesEdit />
          </ProtectedRoute>
        } />
      </>
    )
  };
  