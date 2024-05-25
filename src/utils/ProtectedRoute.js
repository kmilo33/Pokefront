import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Protected routes to be sure that the user has to login before watch other views
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
};