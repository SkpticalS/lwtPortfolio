import { useEffect, useState, useCallback } from 'react';
import { X, ExternalLink } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  gallery: string[];
  role?: string;
  externalLink?: string;
}

interface ProjectDetailModalProps {
  project: Project | null;
  originRect: DOMRect | null;
  isOpen: boolean;
  onClose: () => void;
}

export const projectGalleryMap: Record<string, string[]> = {
  theater: ['/project-theater-1.png', '/project-theater-2.png'],
  campus: ['/project-campus-1.png', '/project-campus-2.png'],
  chuanxiaohai: ['/projects/chuanxiaohai.png', '/projects/character-peek.png'],
  animall: ['/projects/animall-game.png'],
  tongzhimeng: ['/projects/tongzhimeng1.png', '/projects/tongzhimeng2.png'],
  juxiangxiuyun: ['/projects/juxiangxiuyun.png', '/projects/juxiangxiuyun-character.png', '/projects/juxiangxiuyun-demo.gif', '/projects/oriental-tower.gif'],
  roblox: ['/projects/jinyuanzhou.png', '/project-roblox-1.png', '/project-roblox-2.png'],
  workflow3d: ['/projects/ancient-tower-ue5.png', '/projects/character-peek.png', '/projects/chuanxiaohai.png'],
  lora: ['/projects/lora-training.png'],
};

export const projectsData: Project[] = [
  {
    id: 'theater',
    title: '剧场穿梭',
    description: 'Unity TPS + 卡通渲染闯关游戏',
    longDescription: '基于Unity独立开发第三人称射击闯关游戏，搭建3D卡通渲染管线（Toon Shader/描边/多光源），137个C#脚本/2.1万行代码。手写FSM状态机+Cinemachine双相机系统（自由探索/瞄准视角自动混合），NavMeshAgent寻路+Physics.Raycast视线检测。核心难点：解决CharacterController与Root Motion物理割裂，设计3帧速度缓存环与惯性混合模型；实现表里世界维度切换系统（溶解Shader+物理层级热切换+环境配置热切换）。',
    image: '/project-theater-1.png',
    tags: ['Unity', 'C#', 'FSM', 'Cinemachine', 'Toon Shader', 'NavMesh'],
    gallery: projectGalleryMap.theater,
    role: '独立开发',
  },
  {
    id: 'campus',
    title: '虚拟校园',
    description: '海南国际学院Blender建模 + UE5展示',
    longDescription: '基于航拍数据，使用Blender独立完成学院单体建筑建模（AI辅助粗模+手动重拓扑低模），严格遵循行业规范进行模型/材质命名与PBR材质烘焙。协作研究生团队完成UE5场景导入与展示，成果在学校会议展示并收录于官方微信公众号。',
    image: '/project-campus-1.png',
    tags: ['Blender', 'UE5', 'PBR材质', '重拓扑', '建筑可视化'],
    gallery: projectGalleryMap.campus,
    role: '团队项目',
  },
  {
    id: 'chuanxiaohai',
    title: '传小海',
    description: '校园IP形象改造3D全流程',
    longDescription: '使用AIGC工具生成15种概念方案并竞标胜出，独立完成传小海IP形象从概念设计到引擎导入的全流程：建模（迭代2版）→手动骨骼搭建→权重绘制→PBR材质→引擎集成。手动修复自动权重穿模问题，优化肘部/肩部变形；形象至今在学校公众号持续二创，有效提升校园吉祥物认知度。',
    image: '/projects/chuanxiaohai.png',
    tags: ['Blender', '角色设计', '骨骼绑定', 'AIGC', 'PBR'],
    gallery: projectGalleryMap.chuanxiaohai,
    role: '独立开发',
  },
  {
    id: 'animall',
    title: 'Animall',
    description: 'Network联机3D卡通超市家庭乱斗游戏（开发中）',
    longDescription: '独立开发Network联机3D卡通乱斗游戏（超市场景），使用Nanobanana+混元3D建立30分钟AI角色管线（概念→模型→Auto-Rig Pro绑骨→权重→引擎）。基于MKToon搭建卡通渲染并同步至全部商品资产；实现Raycast拾取、物品栏管理、购物车跟随与物品缩小吸附系统；基于Unity NGO实现服务器权威架构，已跑通Host+1 Client全状态同步。',
    image: '/projects/animall-game.png',
    tags: ['Unity', 'Network', 'AIGC', 'MKToon', 'NGO'],
    gallery: projectGalleryMap.animall,
    role: '独立开发 · 进行中',
  },
  {
    id: 'tongzhimeng',
    title: '童之梦',
    description: '梦核场景UE5项目（省级三等奖）',
    longDescription: '独立设计梦核风格超现实场景，60%手动原创建模+40%资产改编，UE5渲染输出；凭借出色的氛围营造获2025年数字媒体竞赛省级三等奖。使用UE5 Lumen全局光照系统营造夜间/柔光氛围，通过Post Process Volume调控Bloom、Chromatic Aberration等后处理效果强化梦核感。',
    image: '/projects/tongzhimeng1.png',
    tags: ['UE5', '梦核美学', 'Lumen', 'Post Processing', '省三等奖'],
    gallery: projectGalleryMap.tongzhimeng,
    role: '独立开发',
  },
  {
    id: 'juxiangxiuyun',
    title: '橘香绣韵',
    description: '数字化虚拟博物馆助农项目',
    longDescription: '参与浙江台州涌泉镇助农项目，设计品牌吉祥物"陈皮皮"及年轻化卡通形象，主导二创玩具与包装设计。独立完成虚拟博物馆3D建模与渲染图输出，通过网站展示吸引线上客流。助农成果：帮助40余户果农建立网络销售渠道，累计销售近10,000件，实现文旅文创带动数商助农的初步商业化闭环。前端页面：https://4o4mkkgshg4ge.ok.kimi.link',
    image: '/projects/juxiangxiuyun.png',
    tags: ['UE5', '文化IP', '前端开发', '虚拟博物馆', '电商'],
    gallery: projectGalleryMap.juxiangxiuyun,
    role: '团队项目 · 队长',
    externalLink: 'https://4o4mkkgshg4ge.ok.kimi.link',
  },
  {
    id: 'roblox',
    title: 'Roblox关卡',
    description: '跨平台关卡设计',
    longDescription: '1天内上手Roblox Studio，使用Lua开发"一二三木头人"生存玩法与平台跳跃关卡原型，将Unity/UE5设计思维迁移至Roblox平台。针对Roblox性能预算优化对象池策略，确保校内GameJam展示流畅度。',
    image: '/projects/jinyuanzhou.png',
    tags: ['Roblox', 'Lua', '关卡设计', '跨平台', 'GameJam'],
    gallery: projectGalleryMap.roblox,
    role: '独立开发',
  },
  {
    id: 'workflow3d',
    title: '3D卡通建模工作流',
    description: '角色绑定到引擎导入全流程',
    longDescription: '建立从概念设计到引擎导入的完整角色生产管线：高模（ZBrush）→拓扑→UV→PBR材质→骨骼绑定→权重优化→动画重定向→Unity/UE5双引擎适配。制定引擎导入规范（命名/材质/碰撞体/LOD），通过Avatar Mask与骨骼映射表实现Mixamo外部动画资源到自定义骨骼的重定向，确保资产跨引擎一致性。',
    image: '/projects/ancient-tower-ue5.png',
    tags: ['Blender', 'ZBrush', '骨骼绑定', '动画重定向', 'LOD'],
    gallery: projectGalleryMap.workflow3d,
    role: '独立开发',
  },
  {
    id: 'lora',
    title: 'LoRA 模型训练',
    description: '自定义风格化角色与场景生成模型',
    longDescription: '训练自定义LoRA模型，实现特定美术风格角色与场景的稳定生成。具备LoRA模型训练能力，基于项目需求微调风格模型，保证AI产出与项目美术风格一致性。已发布两个LoRA模型至LiblibAI与Civitai平台。',
    image: '/projects/lora-training.png',
    tags: ['Stable Diffusion', 'LoRA', 'AIGC', '模型微调'],
    gallery: projectGalleryMap.lora,
    role: '技术探索',
    externalLink: 'https://www.liblib.art/modelinfo/2d7cfc6ca371436bbe3a018541791a32',
  },
];

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  const [activeMedia, setActiveMedia] = useState<string>('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      const videoOrGif = project.gallery.find((g) => g.endsWith('.mp4') || g.endsWith('.gif'));
      setActiveMedia(videoOrGif || project.image);
    }
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) setLightboxImage(null);
        else onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose, lightboxImage]);

  const isVideo = (src: string) => src.endsWith('.mp4');

  const handleThumbnailClick = useCallback((src: string) => {
    setActiveMedia(src);
  }, []);

  if (!isOpen || !project) return null;

  const allThumbnails = [project.image, ...project.gallery.filter((g) => g !== project.image)];

  return (
    <div style={{ display: 'contents' }}>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
        style={{ paddingTop: '5vh', paddingBottom: '5vh' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div
          className="fixed inset-0"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}
          onClick={onClose}
        />

        <div
          className="relative z-10 w-full max-w-[900px] px-4"
          style={{ animation: 'fadeInScale 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <button
            onClick={onClose}
            data-cursor-hover
            className="absolute -right-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <X size={20} style={{ color: '#F0F4F8' }} />
          </button>

          {/* Hero Media */}
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ maxHeight: '50vh', background: '#0A0D10' }}
          >
            {isVideo(activeMedia) ? (
              <video src={activeMedia} autoPlay loop muted playsInline className="h-full w-full object-cover" style={{ maxHeight: '50vh' }} />
            ) : (
              <img
                src={activeMedia}
                alt={project.title}
                className="h-full w-full object-cover"
                style={{ maxHeight: '50vh' }}
                onClick={() => setLightboxImage(activeMedia)}
                data-cursor-hover
              />
            )}
          </div>

          {/* Project Info */}
          <div className="mt-6">
            {project.role && (
              <span className="mb-2 inline-block text-[12px]" style={{ fontFamily: '"JetBrains Mono", monospace', color: '#E8905A' }}>
                {project.role}
              </span>
            )}

            <h2
              className="text-2xl md:text-3xl"
              style={{ fontFamily: '"LXGW WenKai", "SmileySans-Oblique", system-ui, sans-serif', color: '#F0F4F8' }}
            >
              {project.title}
            </h2>

            <p
              className="mt-3 text-[15px]"
              style={{ fontFamily: '"LXGW WenKai", "Noto Sans SC", system-ui, sans-serif', color: '#8A9DB0', lineHeight: 1.8 }}
            >
              {project.longDescription || project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-[12px]"
                  style={{ background: 'rgba(232,144,90,0.15)', color: '#E8905A', fontFamily: '"LXGW WenKai", "Noto Sans SC", system-ui, sans-serif' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="mt-4 inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:opacity-80"
                style={{ color: '#E8905A', fontFamily: '"JetBrains Mono", monospace' }}
              >
                <ExternalLink size={14} />
                查看相关页面
              </a>
            )}
          </div>

          {/* Thumbnail Grid */}
          {allThumbnails.length > 1 && (
            <div className="mt-6">
              <h3
                className="mb-3 text-sm"
                style={{ fontFamily: '"JetBrains Mono", monospace', color: '#8A9DB0', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Screenshots
              </h3>
              <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
                {allThumbnails.map((src, i) => (
                  <div
                    key={i}
                    className="group relative aspect-square overflow-hidden rounded-xl transition-all duration-300"
                    data-cursor-hover
                    style={{
                      border: activeMedia === src ? '2px solid #E8905A' : '2px solid transparent',
                    }}
                    onClick={() => {
                      handleThumbnailClick(src);
                      if (!isVideo(src)) setLightboxImage(src);
                    }}
                  >
                    {isVideo(src) ? (
                      <video src={src} className="h-full w-full object-cover" muted playsInline />
                    ) : (
                      <img
                        src={src}
                        alt={`截图 ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)' }}
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            data-cursor-hover
          >
            <X size={20} style={{ color: '#F0F4F8' }} />
          </button>
          <img
            src={lightboxImage}
            alt="大图"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fadeInScale 0.2s ease-out' }}
          />
        </div>
      )}
    </div>
  );
}
