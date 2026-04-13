export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  achievements?: string[];
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
}

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    description: string;
    profileImage: string;
  };
  about: {
    content: string;
    experience: {
      title: string;
      company: string;
      period: string;
      description: string;
    }[];
  };
  projects: Project[];
  skills: Skill[];
}
