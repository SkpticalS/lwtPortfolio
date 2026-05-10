import { motion, AnimatePresence } from 'framer-motion';
import type { Post } from '@/types/admin';

interface DeleteConfirmModalProps {
  post: Post | null;
  onCancel: () => void;
  onConfirm: (post: Post) => void;
}

export default function DeleteConfirmModal({
  post,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!post) return null;

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            style={{
              background: '#1A1E23',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                fontSize: '18px',
                color: '#F0F4F8',
                marginBottom: '8px',
                fontWeight: 500,
              }}
            >
              确认删除？
            </h3>
            <p
              style={{
                fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                fontSize: '14px',
                color: '#8A9DB0',
                marginBottom: '24px',
              }}
            >
              此操作不可撤销
            </p>

            <div className="flex items-center justify-center" style={{ gap: '16px' }}>
              <motion.button
                onClick={onCancel}
                className="transition-all duration-200"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '9999px',
                  padding: '12px 32px',
                  color: '#F0F4F8',
                  fontSize: '14px',
                  fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                取消
              </motion.button>

              <motion.button
                onClick={() => onConfirm(post)}
                className="transition-all duration-200"
                style={{
                  background: '#E85A5A',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '12px 32px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(232,90,90,0.35)' }}
                whileTap={{ scale: 0.98 }}
              >
                确认删除
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
