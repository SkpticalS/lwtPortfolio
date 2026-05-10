import { useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import ProjectDetailModal from '@/components/ProjectDetailModal';
import type { Project } from '@/components/ProjectDetailModal';
import { projectsData } from '@/components/ProjectDetailModal';

const cardEasing = 'cubic-bezier(0.16, 1, 0.3, 1)';

export default function PortfolioProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { ref: titleRef, isInView: titleInView } = useInViewAnimation({ threshold: 0.1 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInViewAnimation({ threshold: 0.1 });

  const handleOpenModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  return (
    <>
      <section
        id="projects"
        style={{ background: '#0F1214', padding: '100px 0' }}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div
            ref={titleRef}
            className="mb-4"
            style={{
              opacity: titleInView ? 1 : 0,
              transform: titleInView ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.8s ${cardEasing}, transform 0.8s ${cardEasing}`,
            }}
          >
            <h2
              className="text-[28px] md:text-[36px]"
              style={{
                fontFamily: '"LXGW WenKai", "SmileySans-Oblique", system-ui, sans-serif',
                color: '#F0F4F8',
                lineHeight: 1.2,
              }}
            >
              精选项目
            </h2>
          </div>

          {/* Subtitle */}
          <div
            ref={subtitleRef}
            className="mb-12"
            style={{
              opacity: subtitleInView ? 1 : 0,
              transform: subtitleInView ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.8s 0.1s ${cardEasing}, transform 0.8s 0.1s ${cardEasing}`,
            }}
          >
            <p
              className="text-base"
              style={{
                fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                color: '#8A9DB0',
                fontWeight: 300,
              }}
            >
              点击查看详情
            </p>
          </div>

          {/* Project Cards */}
          <div className="flex flex-col" style={{ gap: '48px' }}>
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={handleOpenModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        originRect={null}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Individual Project Card Component
// ---------------------------------------------------------------------------

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.1 });
  const isEven = index % 2 === 1;
  const staggerDelay = 0.15 * index;

  const handleClick = useCallback(() => {
    onOpen(project);
  }, [project, onOpen]);

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      id={`project-${project.id}`}
      className="group cursor-pointer overflow-hidden rounded-[24px] transition-all duration-400 md:flex"
      style={{
        background: '#1E2328',
        border: '1px solid rgba(255,255,255,0.08)',
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? 'translateY(0)'
          : `translateY(40px) translateX(${isEven ? '20px' : '-20px'})`,
        transition: `opacity 0.8s ${staggerDelay}s ${cardEasing}, transform 0.8s ${staggerDelay}s ${cardEasing}, border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
        flexDirection: isEven ? 'row-reverse' : 'row',
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(232,144,90,0.3)';
        el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(255,255,255,0.08)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div className="md:w-[40%]">
        <img
          src={project.image.startsWith('/') ? project.image : `/projects/${project.image}`}
          alt={project.title}
          className="h-[240px] w-full object-cover md:h-full"
          style={{ borderRadius: isEven ? '0 24px 24px 0' : '24px 0 0 24px' }}
        />
      </div>

      {/* Content */}
      <div
        className="flex flex-1 flex-col justify-between p-6 md:p-8"
        style={{
          alignItems: 'flex-start',
        }}
      >
        <div>
          <h3
            className="text-[20px] md:text-[28px]"
            style={{
              fontFamily: '"LXGW WenKai", "SmileySans-Oblique", system-ui, sans-serif',
              color: '#F0F4F8',
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
          {project.role && (
            <span
              className="mb-1 mt-2 inline-block text-[12px]"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                color: '#E8905A',
                fontWeight: 400,
              }}
            >
              {project.role}
            </span>
          )}
          <p
            className="mt-2 text-base"
            style={{
              fontFamily: '"Noto Sans SC", system-ui, sans-serif',
              color: '#8A9DB0',
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full px-4 py-1.5 text-[13px] font-medium"
                style={{
                  background: 'rgba(232,144,90,0.15)',
                  color: '#E8905A',
                  fontFamily: '"Noto Sans SC", system-ui, sans-serif',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="mt-6 flex w-full justify-end">
          <ArrowRight
            size={24}
            style={{ color: '#E8905A' }}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  );
}
