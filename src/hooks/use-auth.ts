import { useState, useEffect } from 'react';
interface AuthUser {
  email: string;
}
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/me');
        if (!response.ok) {
          if (response.status === 401) {
            setUser(null);
          } else {
            throw new Error('Failed to fetch user');
          }
        } else {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setUser(null);
      } finally {
        setIsPending(false);
      }
    };
    fetchUser();
  }, []);
  return { user, isPending, error };
}