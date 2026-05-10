import { useState, useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadZoneProps {
  onFilesSelected: (files: string[]) => void;
}

export default function UploadZone({ onFilesSelected }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const files = Array.from(fileList).filter((file) => {
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
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          })
      );

      Promise.all(promises).then((base64Images) => {
        onFilesSelected(base64Images);
      });
    },
    [onFilesSelected]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = '';
  };

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className="cursor-pointer text-center transition-all duration-200"
      style={{
        border: isDragOver
          ? '2px dashed #E8905A'
          : '2px dashed rgba(232,144,90,0.3)',
        borderRadius: '20px',
        padding: '48px',
        background: isDragOver
          ? 'rgba(232,144,90,0.1)'
          : 'rgba(232,144,90,0.05)',
        transform: isDragOver ? 'scale(1.02)' : 'scale(1)',
      }}
      whileTap={{ scale: 0.99 }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInput}
        className="hidden"
      />
      <Upload
        size={48}
        style={{ color: '#E8905A', marginBottom: '16px' }}
      />
      <p
        style={{
          fontFamily: '"Noto Sans SC", system-ui, sans-serif',
          fontSize: '18px',
          color: '#F0F4F8',
        }}
      >
        拖拽图片到此处
      </p>
      <p
        style={{
          fontFamily: '"Noto Sans SC", system-ui, sans-serif',
          fontSize: '14px',
          color: '#8A9DB0',
          marginTop: '8px',
        }}
      >
        或点击选择文件
      </p>
    </motion.div>
  );
}
