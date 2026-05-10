import { useState, useCallback } from 'react';
import { LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Post } from '@/types/admin';
import { getUserPosts, saveUserPosts } from '@/utils/projectData';
import StatsBar from './StatsBar';
import UploadZone from './UploadZone';
import ImagePreviewGrid from './ImagePreviewGrid';
import PublishForm from './PublishForm';
import PostList from './PostList';
import EditModal from './EditModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface DashboardProps {
  onLogout: () => void;
}

function generateId(): string {
  return `post_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [posts, setPosts] = useState<Post[]>(getUserPosts);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [deletePost, setDeletePost] = useState<Post | null>(null);

  const handleFilesSelected = useCallback((files: string[]) => {
    setUploadedImages((prev) => [...prev, ...files]);
  }, []);

  const handleReorder = useCallback((newImages: string[]) => {
    setUploadedImages(newImages);
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handlePublish = useCallback(
    (data: { title: string; description: string; tags: string[] }) => {
      if (uploadedImages.length === 0) {
        const newPost: Post = {
          id: generateId(),
          title: data.title,
          description: data.description,
          tags: data.tags,
          images: [],
          coverIndex: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          order: posts.length,
        };
        const updated = [newPost, ...posts];
        saveUserPosts(updated);
        setPosts(updated);
      } else {
        setIsPublishing(true);
        const newPost: Post = {
          id: generateId(),
          title: data.title,
          description: data.description,
          tags: data.tags,
          images: uploadedImages,
          coverIndex: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          order: posts.length,
        };
        const updated = [newPost, ...posts];
        saveUserPosts(updated);
        setPosts(updated);
        setUploadedImages([]);
        setIsPublishing(false);
        setPublishSuccess(true);
        setTimeout(() => setPublishSuccess(false), 1500);
      }
    },
    [uploadedImages, posts]
  );

  const handleEdit = useCallback((post: Post) => {
    setEditPost(post);
  }, []);

  const handleDelete = useCallback((post: Post) => {
    setDeletePost(post);
  }, []);

  const handleSaveEdit = useCallback(
    (updatedPost: Post) => {
      const updated = posts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
      saveUserPosts(updated);
      setPosts(updated);
      setEditPost(null);
    },
    [posts]
  );

  const handleConfirmDelete = useCallback(
    (post: Post) => {
      const updated = posts.filter((p) => p.id !== post.id);
      saveUserPosts(updated);
      setPosts(updated);
      setDeletePost(null);
    },
    [posts]
  );

  return (
    <div
      className="min-h-[100dvh]"
      style={{ background: '#0F1214', padding: '32px' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1000px' }}>
        {/* Top Bar */}
        <div
          className="mb-12 flex items-center justify-between"
          style={{ marginBottom: '48px' }}
        >
          {/* Left: Logo + Title */}
          <div className="flex items-center">
            <span
              style={{
                fontFamily: 'SmileySans-Oblique, system-ui, sans-serif',
                fontSize: '20px',
                color: '#F0F4F8',
              }}
            >
              罗文韬
            </span>
            <span
              className="mx-3"
              style={{ color: '#8A9DB0', fontSize: '16px' }}
            >
              |
            </span>
            <span
              style={{
                fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                fontSize: '16px',
                color: '#8A9DB0',
              }}
            >
              作品管理
            </span>
          </div>

          {/* Right: Logout */}
          <motion.button
            onClick={onLogout}
            className="inline-flex items-center gap-2 transition-colors duration-200"
            style={{
              background: 'none',
              border: 'none',
              color: '#8A9DB0',
              fontSize: '14px',
              fontFamily: '"Noto Sans SC", system-ui, sans-serif',
              cursor: 'pointer',
              padding: '8px 12px',
            }}
            whileHover={{ color: '#E85A5A' }}
          >
            <LogOut size={16} />
            退出
          </motion.button>
        </div>

        {/* Stats Bar */}
        <StatsBar posts={posts} />

        {/* Publish Section */}
        <div>
          <h2
            style={{
              fontFamily: 'SmileySans-Oblique, system-ui, sans-serif',
              fontSize: '28px',
              color: '#F0F4F8',
              marginBottom: '24px',
              lineHeight: 1.3,
            }}
          >
            发布新作品
          </h2>

          <UploadZone onFilesSelected={handleFilesSelected} />

          <ImagePreviewGrid
            images={uploadedImages}
            onReorder={handleReorder}
            onRemove={handleRemoveImage}
          />

          <PublishForm
            onPublish={handlePublish}
            isPublishing={isPublishing}
            publishSuccess={publishSuccess}
          />
        </div>

        {/* Post List */}
        <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editPost && (
          <EditModal
            post={editPost}
            onClose={() => setEditPost(null)}
            onSave={handleSaveEdit}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletePost && (
          <DeleteConfirmModal
            post={deletePost}
            onCancel={() => setDeletePost(null)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
