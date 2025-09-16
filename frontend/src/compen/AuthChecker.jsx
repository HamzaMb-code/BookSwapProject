import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthChecker({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
}