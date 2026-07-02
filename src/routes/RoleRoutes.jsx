import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { hasRole } from '@/utils/roleUtils';

/**
 * Route guard that ensures a user has one of the allowed roles.
 * If the user is not logged in, redirects to the login page.
 * If the user's role is not in the allowedRoles list, redirects to the unauthorized page.
 */
export const RoleRoute = ({ children, allowedRoles, redirectTo = '/unauthorized' }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full dark:border-gray-700"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
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
