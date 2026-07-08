import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { hasRole } from '@/utils/roleUtils';
import { Spinner } from '@/components/ui/Loader';

/**
 * Route guard that ensures a user has one of the allowed roles.
 * If the user is not logged in, redirects to the login page.
 * If the user's role is not in the allowedRoles list, redirects to the unauthorized page.
 */
export const RoleRoute = ({ children, allowedRoles, redirectTo = '/unauthorized' }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gym-dark">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(currentUser, allowedRoles)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

