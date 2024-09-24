/* // src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
interface PrivateRouteProps {
  element: React.ReactElement;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = Cookies.get('authToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return element;
};
export default PrivateRoute; */