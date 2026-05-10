import { useState, useCallback, useRef, useEffect } from 'react';
import { X, Save, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Post } from '@/types/admin';

interface EditModalProps {
  post: Post | null;
  onClose: () => void;
  onSave: (post: Post) => void;
}

const TAG_SUGGESTIONS = [
  'Unity',
  'UE5',
  'Blender',
  'AIGC',
  'Roblox',
  'C#',
  'Shader',
  '关卡设计',
  '角色绑定',
  '卡通渲染',
];

export default function EditModal({ post, onClose, onSave }: EditModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setTags([...post.tags]);
      setImages([...post.images]);
    }
  }, [post]);

  const addTag = useCallback(
    (tag: string) => {
      const trimmed = tag.trim();
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
      }
      setTagInput('');
    },
    [tags]
  );

  const removeTag = useCallback(
    (index: number) => {
      setTags(tags.filter((_, i) => i !== index));
    },
    [tags]
  );

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleReorderImages = (newImages: string[]) => {
    setImages(newImages);
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const newImages = [...images];
    const [draggedItem] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, draggedItem);
    handleReorderImages(newImages);
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter((file) => {
      if (!file.type.startsWith('image/')) return false;
      if (file.size > 10 * 1024 * 1024) {
        alert(`图片 "${file.name}" 超过 10MB 限制，已跳过`);
        return false;
      }
      return true;
    });

    const promises = files.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(promises).then((newImages) => {
      setImages((prev) => [...prev, ...newImages]);
    });
    e.target.value = '';
  };

  const handleSave = () => {
    if (!post || !title.trim()) return;
    onSave({
      ...post,
      title: title.trim(),
      description: description.trim(),
      tags,
      images,
      coverIndex: 0,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="scrollbar-thin relative overflow-y-auto"
            style={{
              background: '#1A1E23',
              borderRadius: '24px',
              padding: '40px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '85vh',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 transition-colors duration-200"
              style={{
                background: 'none',
                border: 'none',
                color: '#8A9DB0',
                cursor: 'pointer',
                padding: '4px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#F0F4F8';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#8A9DB0';
              }}
            >
              <X size={24} />
            </button>

            {/* Title */}
            <h2
              style={{
                fontFamily: 'SmileySans-Oblique, system-ui, sans-serif',
                fontSize: '28px',
                color: '#F0F4F8',
                marginBottom: '24px',
                lineHeight: 1.3,
              }}
            >
              编辑作品
            </h2>

            {/* Title Input */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                  fontSize: '14px',
                  color: '#8A9DB0',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                作品标题 *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full transition-all duration-200"
                style={{
                  background: '#0F1214',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  color: '#F0F4F8',
                  fontSize: '16px',
                  fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#E8905A';
                  e.target.style.boxShadow = '0 0 0 3px rgba(232,144,90,0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                  fontSize: '14px',
                  color: '#8A9DB0',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                作品描述
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full transition-all duration-200"
                style={{
                  background: '#0F1214',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  color: '#F0F4F8',
                  fontSize: '16px',
                  fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                  outline: 'none',
                  minHeight: '120px',
                  resize: 'vertical',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#E8905A';
                  e.target.style.boxShadow = '0 0 0 3px rgba(232,144,90,0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Tags */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                  fontSize: '14px',
                  color: '#8A9DB0',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                技术标签
              </label>
              <input
                type="text"
                placeholder="输入标签后按 Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="w-full transition-all duration-200"
                style={{
                  background: '#0F1214',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  color: '#F0F4F8',
                  fontSize: '16px',
                  fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#E8905A';
                  e.target.style.boxShadow = '0 0 0 3px rgba(232,144,90,0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.boxShadow = 'none';
                }}
              />

              <div className="mt-2 flex flex-wrap" style={{ gap: '8px' }}>
                {TAG_SUGGESTIONS.filter((s) => !tags.includes(s)).map((s) => (
                  <button
                    key={s}
                    onClick={() => addTag(s)}
                    className="transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'rgba(232,144,90,0.08)',
                      color: '#8A9DB0',
                      borderRadius: '9999px',
                      padding: '4px 12px',
                      fontSize: '13px',
                      fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                      border: '1px solid rgba(232,144,90,0.15)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(232,144,90,0.15)';
                      (e.currentTarget as HTMLElement).style.color = '#E8905A';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(232,144,90,0.08)';
                      (e.currentTarget as HTMLElement).style.color = '#8A9DB0';
                    }}
                  >
                    + {s}
                  </button>
                ))}
              </div>

              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap" style={{ gap: '8px' }}>
                  {tags.map((tag, index) => (
                    <span
                      key={tag}
                      className="inline-flex items-center"
                      style={{
                        background: 'rgba(232,144,90,0.15)',
                        color: '#E8905A',
                        borderRadius: '9999px',
                        padding: '4px 12px',
                        fontSize: '13px',
                        fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                        fontWeight: 500,
                        gap: '6px',
                      }}
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#E8905A',
                          cursor: 'pointer',
                          padding: '2px',
                        }}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Image Management */}
            <div>
              <label
                style={{
                  fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#F0F4F8',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                作品图片
              </label>

              <div
                className="grid"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '10px',
                }}
              >
                {images.map((img, index) => (
                  <div
                    key={`${img.slice(0, 20)}-${index}`}
                    className="relative"
                    style={{
                      aspectRatio: '1',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border:
                        dragOverIndex === index
                          ? '2px solid #E8905A'
                          : '1px solid rgba(255,255,255,0.08)',
                      opacity: dragIndex === index ? 0.6 : 1,
                      transform: dragIndex === index ? 'scale(1.05)' : 'scale(1)',
                      boxShadow:
                        dragIndex === index
                          ? '0 8px 24px rgba(0,0,0,0.3)'
                          : 'none',
                      cursor: 'move',
                      transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                    }}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <img
                      src={img}
                      alt={`图片 ${index + 1}`}
                      className="h-full w-full"
                      style={{ objectFit: 'cover' }}
                      draggable={false}
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1.5 right-1.5 flex items-center justify-center transition-colors duration-200"
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.6)',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '3px',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = '#E85A5A';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.6)';
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                {/* Mini Upload Zone */}
                <div
                  className="flex cursor-pointer flex-col items-center justify-center transition-all duration-200"
                  style={{
                    aspectRatio: '1',
                    borderRadius: '10px',
                    border: '1px dashed rgba(232,144,90,0.3)',
                    padding: '16px',
                    textAlign: 'center',
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Upload size={20} style={{ color: '#E8905A', marginBottom: '4px' }} />
                  <span
                    style={{
                      fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                      fontSize: '11px',
                      color: '#8A9DB0',
                    }}
                  >
                    添加图片
                  </span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <motion.button
              onClick={handleSave}
              disabled={!title.trim()}
              className="mt-6 inline-flex w-full items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(90deg, #E8905A, #C75B2A)',
                borderRadius: '9999px',
                padding: '16px 40px',
                fontSize: '16px',
                fontWeight: 500,
                color: '#FFFFFF',
                fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                border: 'none',
                cursor: title.trim() ? 'pointer' : 'not-allowed',
                opacity: title.trim() ? 1 : 0.5,
                marginTop: '24px',
              }}
              whileHover={title.trim() ? { scale: 1.02, boxShadow: '0 8px 24px rgba(232,144,90,0.35)' } : {}}
              whileTap={title.trim() ? { scale: 0.98 } : {}}
            >
              <Save size={18} />
              保存修改
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
