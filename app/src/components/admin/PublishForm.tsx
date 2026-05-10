import { useState, useCallback, useRef } from 'react';
import { Send, Loader2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PublishFormProps {
  onPublish: (data: {
    title: string;
    description: string;
    tags: string[];
  }) => void;
  isPublishing: boolean;
  publishSuccess: boolean;
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

export default function PublishForm({
  onPublish,
  isPublishing,
  publishSuccess,
}: PublishFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const tagInputRef = useRef<HTMLInputElement>(null);

  const canPublish = title.trim().length > 0 && !isPublishing && !publishSuccess;

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

  const handlePublish = () => {
    if (!canPublish) return;
    onPublish({
      title: title.trim(),
      description: description.trim(),
      tags,
    });
  };

  const handleSuccessDismiss = () => {
    setTitle('');
    setDescription('');
    setTags([]);
    setTagInput('');
  };

  return (
    <div className="flex flex-col" style={{ gap: '20px', marginTop: '32px' }}>
      {/* Title Input */}
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
          作品标题 *
        </label>
        <input
          type="text"
          placeholder="输入作品标题"
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

      {/* Description Textarea */}
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
          作品描述
        </label>
        <textarea
          placeholder="输入作品描述（可选）"
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

      {/* Tags Input */}
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
          技术标签
        </label>
        <input
          ref={tagInputRef}
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

        {/* Tag Suggestions */}
        <div className="mt-2 flex flex-wrap" style={{ gap: '8px' }}>
          {TAG_SUGGESTIONS.filter((s) => !tags.includes(s)).map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => addTag(suggestion)}
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
              + {suggestion}
            </button>
          ))}
        </div>

        {/* Active Tags */}
        <AnimatePresence>
          {tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex flex-wrap"
              style={{ gap: '8px' }}
            >
              {tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
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
                    className="inline-flex items-center justify-center"
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
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Publish Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={handlePublish}
          disabled={!canPublish}
          className="inline-flex items-center justify-center gap-2"
          style={{
            background: publishSuccess
              ? '#4CAF50'
              : 'linear-gradient(90deg, #E8905A, #C75B2A)',
            borderRadius: '9999px',
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: 500,
            color: '#FFFFFF',
            fontFamily: '"Noto Sans SC", system-ui, sans-serif',
            border: 'none',
            cursor: canPublish ? 'pointer' : 'not-allowed',
            opacity: !title.trim() && !isPublishing && !publishSuccess ? 0.5 : 1,
          }}
          whileHover={canPublish ? { scale: 1.05, boxShadow: '0 8px 24px rgba(232,144,90,0.35)' } : {}}
          whileTap={canPublish ? { scale: 0.98 } : {}}
        >
          {isPublishing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              发布中...
            </>
          ) : publishSuccess ? (
            <>
              <Check size={18} />
              发布成功
            </>
          ) : (
            <>
              <Send size={18} />
              发布作品
            </>
          )}
        </motion.button>
      </div>

      {/* Success dismiss handler */}
      <AnimatePresence>
        {publishSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => {
              if (publishSuccess) {
                setTimeout(handleSuccessDismiss, 1500);
              }
            }}
            className="hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
