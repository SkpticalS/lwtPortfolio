import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Image, Clock } from 'lucide-react';
import type { Post } from '@/types/admin';

interface StatsBarProps {
  posts: Post[];
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  delay: number;
}

function StatCard({ icon, value, label, delay }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'string' ? 0 : value;
  const isNumeric = typeof value === 'number';

  useEffect(() => {
    if (!isNumeric) return;
    const duration = 800;
    const steps = 30;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * numericValue));
      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayValue(numericValue);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [numericValue, isNumeric]);

  const display = isNumeric ? displayValue : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="flex-1"
      style={{
        background: '#1A1E23',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="mb-2" style={{ color: '#E8905A' }}>
        {icon}
      </div>
      <div
        style={{
          fontFamily: 'SmileySans-Oblique, system-ui, sans-serif',
          fontSize: '32px',
          color: '#E8905A',
          lineHeight: 1.2,
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontFamily: '"Noto Sans SC", system-ui, sans-serif',
          fontSize: '14px',
          color: '#8A9DB0',
          marginTop: '4px',
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function StatsBar({ posts }: StatsBarProps) {
  const totalImages = posts.reduce((acc, post) => acc + post.images.length, 0);

  const getLastUpdated = () => {
    if (posts.length === 0) return '暂无';
    const sorted = [...posts].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    const date = new Date(sorted[0].updatedAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins} 分钟前`;
    if (diffHours < 24) return `${diffHours} 小时前`;
    return `${diffDays} 天前`;
  };

  return (
    <div
      className="flex flex-col sm:flex-row"
      style={{ gap: '24px', marginBottom: '48px' }}
    >
      <StatCard
        icon={<Layers size={24} />}
        value={posts.length}
        label="已发布作品"
        delay={0}
      />
      <StatCard
        icon={<Image size={24} />}
        value={totalImages}
        label="本地图片"
        delay={0.1}
      />
      <StatCard
        icon={<Clock size={24} />}
        value={getLastUpdated()}
        label="最后更新"
        delay={0.2}
      />
    </div>
  );
}
