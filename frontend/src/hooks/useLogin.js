import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const uselogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json();

      if (!response.ok) {
        // Log the server response for debugging purposes
        console.error('Server response:', json);
        setIsLoading(false);
        setError(json.error || 'An error occurred during signup.');
        return;
      }

      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // Update loading state
      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      setError('Failed to fetch: ' + err.message);
    }
  };

  return { login, isLoading, error };
};
