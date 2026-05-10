import type { Post, Project } from '@/types/admin';

export const getBuiltInProjects = (): Project[] => [
  {
    id: 'project-theater',
    title: '剧场穿梭',
    description: '基于Unity开发的第三人称剧场探险游戏，融合平台跳跃与剧场文化元素。采用Toon Shader卡通渲染，打造独特的舞台美术风格。',
    image: '/projects/project-theater-1.png',
    tags: ['Unity', 'C#', '卡通渲染', '关卡设计'],
    gallery: ['/projects/project-theater-1.png', '/projects/project-theater-2.png'],
  },
  {
    id: 'project-campus',
    title: '虚拟校园',
    description: '使用Blender建模与UE5渲染的虚拟大学校园场景，支持光线追踪与实时光照。真实还原校园建筑与环境，打造沉浸式虚拟漫游体验。',
    image: '/projects/project-campus-1.png',
    tags: ['UE5', 'Blender', '关卡设计', 'AIGC'],
    gallery: ['/projects/project-campus-1.png', '/projects/project-campus-2.png'],
  },
  {
    id: 'project-chuanxiaohai',
    title: '传小海吉祥物',
    description: '为校园活动设计的海豚吉祥物3D角色，使用Blender完成建模、骨骼绑定与动画。包含完整的表情系统与动作库。',
    image: '/projects/chuanxiaohai.png',
    tags: ['Blender', '角色绑定', 'AIGC'],
    gallery: ['/projects/chuanxiaohai.png'],
  },
  {
    id: 'project-tongzhimeng',
    title: '童之梦核场景',
    description: 'Blender梦核风格3D场景作品，营造超现实的童年回忆氛围。通过光影与构图传递情感，探索3D艺术的表现边界。',
    image: '/projects/tongzhimeng1.png',
    tags: ['Blender', 'AIGC', '关卡设计'],
    gallery: ['/projects/tongzhimeng1.png', '/projects/tongzhimeng2.png'],
  },
  {
    id: 'project-juxiangxiuyun',
    title: '橘香绣韵虚拟博物馆',
    description: 'UE5渲染的虚拟博物馆项目，展示传统刺绣工艺与橘子文化的融合。卡通风格角色设计，精致的室内场景与光照系统。',
    image: '/projects/juxiangxiuyun.png',
    tags: ['UE5', '卡通渲染', '关卡设计', 'AIGC'],
    gallery: ['/projects/juxiangxiuyun.png', '/projects/juxiangxiuyun-character.png'],
  },
  {
    id: 'project-roblox',
    title: 'Roblox平台跳跃关卡',
    description: '在Roblox Studio中设计的平台跳跃类关卡，包含多层级难度设计与丰富的互动元素。几何方块构成的视觉风格，明快活泼。',
    image: '/projects/marquee-3-roblox.png',
    tags: ['Roblox', '关卡设计', 'C#'],
    gallery: ['/projects/marquee-3-roblox.png', '/projects/project-roblox-1.png', '/projects/project-roblox-2.png'],
  },
  {
    id: 'project-workflow',
    title: '3D卡通角色工作流',
    description: '完整的3D卡通角色制作流程展示，从骨骼绑定、权重绘制到贴图材质、最终渲染的全链路技术方案。',
    image: '/projects/marquee-4-workflow.png',
    tags: ['Blender', '角色绑定', '卡通渲染'],
    gallery: ['/projects/marquee-4-workflow.png', '/projects/character-peek.png'],
  },
];

export const getUserPosts = (): Post[] => {
  try {
    const data = localStorage.getItem('lwt_posts');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const getAllProjects = (): Project[] => {
  const builtIn = getBuiltInProjects();
  const userPosts = getUserPosts();
  const userProjects = userPosts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    image: post.images[post.coverIndex] || post.images[0] || '',
    tags: post.tags,
    gallery: post.images,
  }));
  return [...builtIn, ...userProjects];
};

export const saveUserPosts = (posts: Post[]): void => {
  localStorage.setItem('lwt_posts', JSON.stringify(posts));
};
