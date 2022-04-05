import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, redirectTo, isLoggin }) {
  return isLoggin ? children : <Navigate to={redirectTo} />;
};
