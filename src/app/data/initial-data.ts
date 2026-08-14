import { PortfolioData } from '../types/portfolio';

export const INITIAL_DATA: PortfolioData = {
  hero: {
    name: "Sai Yashwant Reddy Panthy",
    title: "AI & Machine Learning Engineer",
    description: "Specializing in Deep Learning, Computer Vision, and MLOps. Research-driven engineer focused on building scalable data pipelines and production-grade AI systems.",
    profileImage: ""
  },
  contact: {
    phone: "+91 8369682814",
    email: "saiyashwantreddypanth@gmail.com",
    location: "Mumbai",
    github: "https://github.com/champion19007",
    linkedin: "https://linkedin.com/in/saiyashwantreddy",
    resume: "https://drive.google.com/file/d/1qN0M9mAJjsOx-PQ9bgxT0HkqvuDuGhMv/view?usp=sharing"
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
      id: "mlops-forge",
      title: "MLOps-Forge",
      description: "Comprehensive AI infrastructure and automated pipeline framework for production-grade machine learning.",
      imageUrl: "https://picsum.photos/seed/mlops1/800/600",
      imageHint: "server architecture",
      tags: ["Python", "MLOps", "Docker"],
      repoUrl: "https://github.com/champion19007/MLOps-Forge"
    },
    {
      id: "data-pipeline",
      title: "End-to-End-Data-Pipeline",
      description: "Robust data engineering pipeline designed for scalability and high throughput data processing.",
      imageUrl: "https://picsum.photos/seed/pipeline1/800/600",
      imageHint: "data pipeline",
      tags: ["Python", "ETL", "SQL"],
      repoUrl: "https://github.com/champion19007/End-to-End-Data-Pipeline"
    },
    {
      id: "cv-mlops",
      title: "end-to-end-cv-mlops-project",
      description: "A complete MLOps workflow for Computer Vision, from data ingestion to model deployment.",
      imageUrl: "https://picsum.photos/seed/cv1/800/600",
      imageHint: "computer vision",
      tags: ["PyTorch", "OpenCV", "MLOps"],
      repoUrl: "https://github.com/champion19007/end-to-end-cv-mlops-project"
    },
    {
      id: "ci-cd-mlops",
      title: "ci-cd-mlops",
      description: "Automated pipelines tailored for Machine Learning workflows ensuring seamless model integration.",
      imageUrl: "https://picsum.photos/seed/cicd1/800/600",
      imageHint: "automation code",
      tags: ["Python", "GitHub Actions", "Docker"],
      repoUrl: "https://github.com/champion19007/ci-cd-mlops"
    },
    {
      id: "bank-churn",
      title: "bank-churn-mlops-pipeline",
      description: "Production-ready MLOps pipeline for predicting customer churn in banking environments.",
      imageUrl: "https://picsum.photos/seed/bank1/800/600",
      imageHint: "banking finance",
      tags: ["Python", "Azure", "MLOps"],
      repoUrl: "https://github.com/champion19007/bank-churn-mlops-pipeline"
    },
    {
      id: "aws-cicd",
      title: "aws-cicd-pipeline",
      description: "Automated deployment pipelines built on AWS for scalable cloud applications.",
      imageUrl: "https://picsum.photos/seed/aws1/800/600",
      imageHint: "cloud computing",
      tags: ["Shell", "AWS", "CI/CD"],
      repoUrl: "https://github.com/champion19007/aws-cicd-pipeline"
    },
    {
      id: "animal-detection",
      title: "Real-Time-Animal-Detection",
      description: "CCTV-based monitoring system using advanced Computer Vision for real-time safety.",
      imageUrl: "https://picsum.photos/seed/animal1/800/600",
      imageHint: "animal monitoring",
      tags: ["OpenCV", "YOLO", "PyTorch"],
      repoUrl: "https://github.com/champion19007/Real-Time-Animal-Detection-Using-CCTV-Camera-OpenVision"
    },
    {
      id: "pdf-ai",
      title: "pdf-ai-saas",
      description: "SaaS platform leveraging AI for intelligent PDF parsing and interaction using LLMs.",
      imageUrl: "https://picsum.photos/seed/pdf1/800/600",
      imageHint: "document ai",
      tags: ["TypeScript", "Next.js", "AI"],
      repoUrl: "https://github.com/champion19007/pdf-ai-saas"
    },
    {
      id: "rl-chess",
      title: "RL-Chess-Engine-Minimax-MCTS",
      description: "Hybrid chess engine leveraging Reinforcement Learning, Minimax, and MCTS.",
      imageUrl: "https://picsum.photos/seed/chess1/800/600",
      imageHint: "chess board",
      tags: ["Python", "Reinforcement Learning", "MCTS"],
      repoUrl: "https://github.com/champion19007/RL-Chess-Engine-Minimax-MCTS"
    },
    {
      id: "chess-cpp",
      title: "Chess-Engine-Deep-RL-Cpp",
      description: "High-performance chess engine implemented in C++ with Deep Reinforcement Learning.",
      imageUrl: "https://picsum.photos/seed/code1/800/600",
      imageHint: "programming code",
      tags: ["C++", "Deep RL", "Minimax"],
      repoUrl: "https://github.com/champion19007/Chess_engine_with_Deep_Reinforcement_learning-minmax-mcts-Cpp"
    },
    {
      id: "zoom-clone",
      title: "F-13-zoom-lite-clone",
      description: "A lightweight Zoom clone for real-time video conferencing.",
      imageUrl: "https://picsum.photos/seed/video1/800/600",
      imageHint: "video conference",
      tags: ["TypeScript", "WebRTC", "Next.js"],
      repoUrl: "https://github.com/champion19007/F-13-zoom-lite-clone-"
    },
    {
      id: "recommender",
      title: "Restaurant-Recommender",
      description: "Recommendation system using Yelp dataset to suggest restaurants based on preferences.",
      imageUrl: "https://picsum.photos/seed/food1/800/600",
      imageHint: "restaurant food",
      tags: ["Jupyter", "Data Science", "RecSys"],
      repoUrl: "https://github.com/champion19007/City-Cuisine-Based-Restaurant-Recommender-Using-Yelp-Dataset"
    },
    {
      id: "stock-forecaster",
      title: "Advanced-Stock-Forecaster",
      description: "Deep learning time-series forecasting using CNN, BiLSTM, and GRU architectures.",
      imageUrl: "https://picsum.photos/seed/stock1/800/600",
      imageHint: "stock market",
      tags: ["TensorFlow", "Finance", "Deep Learning"],
      repoUrl: "https://github.com/champion19007/Advanced-Stock-Forecaster-CNN-BiLSTM-GRU-"
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
    { name: "Hugging Face Transformers", category: "AI & ML" },
    { name: "Docker", category: "Tools & Platforms" },
    { name: "Git", category: "Tools & Platforms" },
    { name: "Linux", category: "Tools & Platforms" },
    { name: "MLflow", category: "Tools & Platforms" },
    { name: "Weights & Biases", category: "Tools & Platforms" },
    { name: "Streamlit", category: "Tools & Platforms" },
    { name: "Gradio", category: "Tools & Platforms" },
    { name: "Machine Learning (Regression, Classification, Clustering, Time Series)", category: "Domains" },
    { name: "Deep Learning (CNNs, Transformers)", category: "Domains" },
    { name: "Computer Vision (Object Detection, Image Classification)", category: "Domains" },
    { name: "NLP & Generative AI (Text Classification, Summarization, LLMs, RAG)", category: "Domains" }
  ]
};