import { ImageOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Post } from '@/types/admin';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export default function PostList({ posts, onEdit, onDelete }: PostListProps) {
  return (
    <div>
      {/* Section Title */}
      <h2
        style={{
          fontFamily: 'SmileySans-Oblique, system-ui, sans-serif',
          fontSize: '28px',
          color: '#F0F4F8',
          marginTop: '64px',
          marginBottom: '24px',
          lineHeight: 1.3,
        }}
      >
        已发布作品
      </h2>

      {posts.length === 0 ? (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16"
        >
          <ImageOff
            size={64}
            style={{ color: 'rgba(138,157,176,0.3)', marginBottom: '16px' }}
          />
          <p
            style={{
              fontFamily: '"Noto Sans SC", system-ui, sans-serif',
              fontSize: '16px',
              color: '#8A9DB0',
            }}
          >
            暂无发布作品
          </p>
          <p
            style={{
              fontFamily: '"Noto Sans SC", system-ui, sans-serif',
              fontSize: '14px',
              color: 'rgba(138,157,176,0.5)',
              marginTop: '8px',
            }}
          >
            拖拽图片到上方区域开始发布
          </p>
        </motion.div>
      ) : (
        /* Grid */
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '16px' }}
        >
          <AnimatePresence mode="popLayout">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
              >
                <PostCard post={post} onEdit={onEdit} onDelete={onDelete} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
