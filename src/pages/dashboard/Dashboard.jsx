import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/ui/Loader';

const Dashboard = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && currentUser) {
      const role = currentUser.role || 'member';
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'trainer') {
        navigate('/trainer');
      } else {
        navigate('/member');
      }
    }
  }, [currentUser, loading, navigate]);

  return <Loader.Page text="Redirecting to portal..." />;
};

export default Dashboard;
