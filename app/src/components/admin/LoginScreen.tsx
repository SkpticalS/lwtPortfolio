import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = useCallback(() => {
    if (password === 'lwt1886') {
      localStorage.setItem('lwt_admin_auth', 'true');
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }, [password, onLogin]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleFocus = () => {
    setError(false);
  };

  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center px-4"
      style={{ background: '#0F1214' }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="w-full"
        style={{
          maxWidth: '400px',
          background: '#1A1E23',
          borderRadius: '24px',
          padding: '48px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo */}
        <h1
          className="text-center"
          style={{
            fontFamily: 'SmileySans-Oblique, system-ui, sans-serif',
            fontSize: '28px',
            color: '#F0F4F8',
            letterSpacing: '0.1em',
            marginBottom: '8px',
          }}
        >
          罗文韬
        </h1>

        {/* Subtitle */}
        <p
          className="text-center"
          style={{
            fontFamily: '"Noto Sans SC", system-ui, sans-serif',
            fontSize: '14px',
            color: '#8A9DB0',
            marginBottom: '32px',
          }}
        >
          作品管理后台
        </p>

        {/* Password Input */}
        <div>
          <label
            style={{
              fontFamily: '"Noto Sans SC", system-ui, sans-serif',
              fontSize: '14px',
              color: '#8A9DB0',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            请输入密码
          </label>
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            className="w-full transition-all duration-200"
            style={{
              background: '#0F1214',
              border: error
                ? '1px solid #E85A5A'
                : '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '14px 16px',
              color: '#F0F4F8',
              fontSize: '16px',
              fontFamily: '"Noto Sans SC", system-ui, sans-serif',
              outline: 'none',
              boxShadow: error
                ? '0 0 0 3px rgba(232,90,90,0.15)'
                : 'none',
            }}
            onFocusCapture={(e) => {
              (e.target as HTMLInputElement).style.borderColor = '#E8905A';
              (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(232,144,90,0.15)';
            }}
            onBlurCapture={(e) => {
              if (!error) {
                (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.15)';
                (e.target as HTMLInputElement).style.boxShadow = 'none';
              }
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: '"Noto Sans SC", system-ui, sans-serif',
              fontSize: '14px',
              color: '#E85A5A',
              marginTop: '12px',
            }}
          >
            密码错误，请重试
          </motion.p>
        )}

        {/* Login Button */}
        <motion.button
          onClick={handleSubmit}
          className="w-full text-white"
          style={{
            marginTop: '16px',
            background: 'linear-gradient(90deg, #E8905A, #C75B2A)',
            borderRadius: '9999px',
            padding: '14px 36px',
            fontSize: '16px',
            fontWeight: 500,
            fontFamily: '"Noto Sans SC", system-ui, sans-serif',
            border: 'none',
            cursor: 'pointer',
          }}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(232,144,90,0.35)' }}
          whileTap={{ scale: 0.98 }}
          animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : {}}
            transition={shake ? { duration: 0.4 } : {}}
        >
          进入后台
        </motion.button>

        {/* Hint */}
        <p
          className="text-center"
          style={{
            fontFamily: '"Noto Sans SC", system-ui, sans-serif',
            fontSize: '12px',
            color: 'rgba(138,157,176,0.5)',
            marginTop: '16px',
          }}
        >
          默认密码：lwt1886
        </p>
      </motion.div>
    </div>
  );
}
