import { PortfolioData } from '../types/portfolio';
import { PlaceHolderImages } from '../lib/placeholder-images';

const getPlaceholderUrl = (id: string, fallback: string): string => {
  if (!PlaceHolderImages) return fallback;
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? image.imageUrl : fallback;
};

export const INITIAL_DATA: PortfolioData = {
  hero: {
    name: "Sai Yashwant Reddy Panthy",
    title: "AI & Machine Learning Engineer",
    description: "Experienced in Data Science, Computer Vision, and Generative AI. Delivering research-driven and analytical solutions for complex deep learning challenges.",
    profileImage: getPlaceholderUrl('profile-pic', "https://picsum.photos/seed/sai1/400/400")
  },
  about: {
    content: "I am an AI and Machine Learning Engineer with a strong foundation in building and evaluating deep learning models. I specialize in designing automated data pipelines and delivering research-backed solutions in both academic and industry settings. My expertise spans Computer Vision, NLP (LLMs, RAG), and High-Performance AI systems.",
    education: {
      degree: "B. Tech in Computer Science Engineering (AI&ML)",
      institution: "Manipal University Jaipur | Rajasthan, India",
      period: "Expected Dec 2025",
      highlights: [
        "Presented talks at IEEE and American Control Conference (ACC'24)",
        "Winner, Codestellation CodeWar 4.0 Hackathon (1st Place)",
        "Finalist, International Robotics Competition (eYRC)"
      ]
    },
    experience: [
      {
        title: "Data Science Intern",
        company: "BCG (Boston Consulting Group)",
        period: "Nov 2025 - Jan 2026",
        description: "Executed customer churn analysis using Python, Pandas, and NumPy. Developed a Random Forest model achieving 80% recall and presented strategic insights for business decision-making."
      },
      {
        title: "Data Analytics Intern",
        company: "Deloitte",
        period: "Oct 2025 - Nov 2025",
        description: "Completed simulation involving data analysis and forensic technology. Created comprehensive data dashboards using Tableau and Excel to derive business-critical conclusions."
      },
      {
        title: "Software Intern",
        company: "Main Flow Services & Technologies",
        period: "Jul 2024 - Nov 2024",
        description: "Trained YOLO models for object detection and deployed Docker-based ROS2 systems. Automated ROS2 data processing pipelines and configured PLC-controlled motor systems."
      }
    ]
  },
  projects: [
    {
      id: "res-1",
      title: "Minimax-MCTS Chess Engine",
      description: "A hybrid chess engine enhanced by RLHF using Stockfish and AlphaZero methodologies.",
      imageUrl: getPlaceholderUrl('project-1', "https://picsum.photos/seed/chess/800/600"),
      tags: ["Python", "Reinforcement Learning", "MCTS"],
      achievements: ["Scaled self-play training to 10M games", "Improved playing strength by ~150 Elo"]
    },
    {
      id: "res-2",
      title: "PolyPrimer Framework",
      description: "Deep Learning framework for Multiplex PCR Primer Design integrating Transformer and CNN-BiLSTM architectures.",
      imageUrl: getPlaceholderUrl('project-2', "https://picsum.photos/seed/bio/800/600"),
      tags: ["Deep Learning", "Transformers", "Bioinformatics"],
      achievements: ["Automated dataset generation", "Reduced invalid primer candidates by 40%"]
    },
    {
      id: "proj-1",
      title: "Advanced Stock Forecaster",
      description: "Deep learning system using CNN-BiLSTM-GRU to analyze historical market data and identify future trends.",
      imageUrl: getPlaceholderUrl('project-3', "https://picsum.photos/seed/stock/800/600"),
      tags: ["TensorFlow", "Finance", "Time Series"]
    },
    {
      id: "proj-2",
      title: "Real-Time Animal Detection",
      description: "CCTV-based animal detection system for enhanced safety monitoring using computer vision.",
      imageUrl: getPlaceholderUrl('project-2', "https://picsum.photos/seed/animal/800/600"),
      tags: ["OpenCV", "YOLO", "PyTorch"]
    }
  ],
  skills: [
    { name: "Python", category: "Programming" },
    { name: "SQL", category: "Programming" },
    { name: "Bash", category: "Programming" },
    { name: "PyTorch", category: "AI & ML" },
    { name: "TensorFlow", category: "AI & ML" },
    { name: "scikit-learn", category: "AI & ML" },
    { name: "OpenCV", category: "AI & ML" },
    { name: "Transformers", category: "AI & ML" },
    { name: "Docker", category: "Tools & Platforms" },
    { name: "Git", category: "Tools & Platforms" },
    { name: "MLflow", category: "Tools & Platforms" },
    { name: "Weights & Biases", category: "Tools & Platforms" },
    { name: "Computer Vision", category: "Domains" },
    { name: "LLMs & RAG", category: "Domains" },
    { name: "Deep Learning", category: "Domains" },
    { name: "NLP", category: "Domains" }
  ]
};
