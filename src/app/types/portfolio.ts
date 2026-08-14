export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  achievements?: string[];
}

export interface Skill {
  name: string;
  category: 'Programming' | 'AI / LLM' | 'Gen AI / Agentic' | 'MLOps / Cloud' | 'Domains' | 'Data Tools' | 'Web & APIs';
}

export interface Research {
  title: string;
  conference: string;
  highlights: string[];
}

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    description: string;
    profileImage: string;
  };
  contact: {
    phone: string;
    email: string;
    location: string;
    github: string;
    linkedin: string;
    resume: string;
  };
  about: {
    content: string;
    education: {
      degree: string;
      institution: string;
      period: string;
      highlights: string[];
    };
    experience: {
      title: string;
      company: string;
      period: string;
      description: string;
      bullets?: string[];
    }[];
    research?: Research[];
  };
  projects: Project[];
  skills: Skill[];
}
