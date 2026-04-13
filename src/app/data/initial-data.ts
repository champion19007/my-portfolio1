import { PortfolioData } from '../types/portfolio';
import { PlaceHolderImages } from '../lib/placeholder-images';

/**
 * Safely finds a placeholder image URL by its ID.
 * @param id The ID of the image in placeholder-images.json
 * @param fallback The fallback URL if the ID is not found
 */
const getPlaceholderUrl = (id: string, fallback: string): string => {
  if (!PlaceHolderImages) return fallback;
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? image.imageUrl : fallback;
};

export const INITIAL_DATA: PortfolioData = {
  hero: {
    name: "Alex Dev",
    title: "Full Stack Engineer & Innovation Catalyst",
    description: "Building scalable digital solutions with a focus on clean code and exceptional user experiences.",
    profileImage: getPlaceholderUrl('profile-pic', "https://picsum.photos/seed/dev1/400/400")
  },
  about: {
    content: "With over 5 years of experience in the tech industry, I specialize in creating robust web applications using modern technologies. My journey started with a passion for problem-solving and has evolved into a career dedicated to high-performance software development.",
    experience: [
      {
        title: "Senior Full Stack Developer",
        company: "GreenTech Solutions",
        period: "2021 - Present",
        description: "Leading the development of sustainable energy monitoring dashboards and optimizing cloud infrastructure."
      },
      {
        title: "Software Engineer",
        company: "LaunchPad Labs",
        period: "2018 - 2021",
        description: "Developed and maintained several high-traffic e-commerce platforms using React and Node.js."
      }
    ]
  },
  projects: [
    {
      id: "1",
      title: "Eco-Shop Dashboard",
      description: "A comprehensive e-commerce management system with real-time inventory tracking.",
      imageUrl: getPlaceholderUrl('project-1', "https://picsum.photos/seed/proj1/800/600"),
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com",
      achievements: ["Reduced load times by 40%", "Implemented automated testing suite"]
    },
    {
      id: "2",
      title: "Atmosphere App",
      description: "A sleek weather forecasting application providing hyper-local climate insights.",
      imageUrl: getPlaceholderUrl('project-2', "https://picsum.photos/seed/proj2/800/600"),
      tags: ["React Native", "Firebase", "Weather API"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com"
    },
    {
      id: "3",
      title: "Insight Analytics",
      description: "AI-driven data visualization platform for enterprise-level decision making.",
      imageUrl: getPlaceholderUrl('project-3', "https://picsum.photos/seed/proj3/800/600"),
      tags: ["Python", "TensorFlow", "D3.js"],
      liveUrl: "https://example.com",
      repoUrl: "https://github.com"
    }
  ],
  skills: [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "PostgreSQL", category: "Backend" },
    { name: "Docker", category: "Tools" },
    { name: "AWS", category: "Tools" },
    { name: "Git", category: "Tools" }
  ]
};
