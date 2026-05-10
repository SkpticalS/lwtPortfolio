import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoginScreen from '@/components/admin/LoginScreen';
import Dashboard from '@/components/admin/Dashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('lwt_admin_auth') === 'true';
    setIsAuthenticated(auth);
    setIsLoading(false);
  }, []);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('lwt_admin_auth');
    setIsAuthenticated(false);
  }, []);

  if (isLoading) {
    return (
      <div
        className="flex min-h-[100dvh] items-center justify-center"
        style={{ background: '#0F1214' }}
      >
        <div
          className="h-8 w-8 animate-spin rounded-full"
          style={{
            border: '2px solid rgba(232,144,90,0.3)',
            borderTopColor: '#E8905A',
          }}
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <LoginScreen onLogin={handleLogin} />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Dashboard onLogout={handleLogout} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
