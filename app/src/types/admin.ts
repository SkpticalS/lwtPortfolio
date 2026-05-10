export interface Post {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  coverIndex: number;
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  gallery: string[];
}
