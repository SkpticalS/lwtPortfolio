import { useState, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImagePreviewGridProps {
  images: string[];
  onReorder: (images: string[]) => void;
  onRemove: (index: number) => void;
}

export default function ImagePreviewGrid({
  images,
  onReorder,
  onRemove,
}: ImagePreviewGridProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.stopPropagation();
      if (dragIndex === null || dragIndex === index) return;
      setDragOverIndex(index);
    },
    [dragIndex]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      e.stopPropagation();
      if (dragIndex === null || dragIndex === dropIndex) {
        setDragIndex(null);
        setDragOverIndex(null);
        return;
      }

      const newImages = [...images];
      const [draggedItem] = newImages.splice(dragIndex, 1);
      newImages.splice(dropIndex, 0, draggedItem);
      onReorder(newImages);
      setDragIndex(null);
      setDragOverIndex(null);
    },
    [dragIndex, images, onReorder]
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);

  if (images.length === 0) return null;

  return (
    <div
      ref={gridRef}
      className="grid"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '12px',
        marginTop: '24px',
      }}
    >
      <AnimatePresence>
        {images.map((img, index) => (
          <motion.div
            key={`${img.slice(0, 32)}-${index}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: dragIndex === index ? 1.05 : 1,
              opacity: dragIndex === index ? 0.6 : 1,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="relative"
            style={{
              aspectRatio: '1',
              borderRadius: '12px',
              overflow: 'hidden',
              border:
                dragOverIndex === index
                  ? '2px solid #E8905A'
                  : '1px solid rgba(255,255,255,0.08)',
              boxShadow:
                dragIndex === index
                  ? '0 8px 24px rgba(0,0,0,0.3)'
                  : 'none',
              cursor: 'move',
              transition: 'border-color 0.2s, box-shadow 0.2s',
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
              alt={`预览 ${index + 1}`}
              className="h-full w-full"
              style={{ objectFit: 'cover' }}
              draggable={false}
            />
            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(index);
              }}
              className="absolute top-2 right-2 flex items-center justify-center transition-colors duration-200"
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#E85A5A';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.6)';
              }}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
