import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/ui/Loader';

/**
 * Route guard that redirects unauthenticated users to the login page.
 * If authenticated, renders the child components or a nested route outlet.
 */
export const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gym-dark">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

/**
 * Route guard that redirects authenticated users to the home or dashboard page.
 * Used for pages like Login and Register which should not be accessible by logged-in users.
 */
export const GuestRoute = ({ children, redirectTo = '/' }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gym-dark">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

