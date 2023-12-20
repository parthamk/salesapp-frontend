


// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => (
  isAuthenticated ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" />
);

export default PrivateRoute;
