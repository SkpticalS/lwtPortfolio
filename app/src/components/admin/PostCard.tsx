import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { Post } from '@/types/admin';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const coverImage = post.images[post.coverIndex] || post.images[0];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: '1',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Image */}
      <img
        src={coverImage}
        alt={post.title}
        className="h-full w-full"
        style={{ objectFit: 'cover' }}
        draggable={false}
      />

      {/* Hover Overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-200"
        style={{
          background: 'rgba(0,0,0,0.7)',
          opacity: isHovered ? 1 : 0,
          padding: '16px',
        }}
      >
        <h4
          className="text-center"
          style={{
            fontFamily: '"Noto Sans SC", system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
            color: '#F0F4F8',
            wordBreak: 'keep-all',
          }}
        >
          {post.title}
        </h4>
        <p
          style={{
            fontFamily: '"Noto Sans SC", system-ui, sans-serif',
            fontSize: '14px',
            color: '#8A9DB0',
            marginTop: '4px',
          }}
        >
          {post.tags.length} 个标签
        </p>

        {/* Action Buttons */}
        <div className="flex items-center" style={{ gap: '16px', marginTop: '12px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(post);
            }}
            className="transition-transform duration-200 hover:scale-110"
            style={{
              background: 'none',
              border: 'none',
              color: '#E8905A',
              cursor: 'pointer',
              padding: '4px',
            }}
            title="编辑"
          >
            <Edit size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(post);
            }}
            className="transition-transform duration-200 hover:scale-110"
            style={{
              background: 'none',
              border: 'none',
              color: '#E85A5A',
              cursor: 'pointer',
              padding: '4px',
            }}
            title="删除"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
