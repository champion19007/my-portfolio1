import { PortfolioData } from '../types/portfolio';

export const INITIAL_DATA: PortfolioData = {
  hero: {
    name: "Sai Yashwant Reddy Panthy",
    title: "AI & Machine Learning Engineer",
    description: "Specializing in RAG applications, ML pipelines, and Agentic AI systems. Published IEEE researcher and hackathon winner focused on building production-grade AI-powered analytics solutions.",
    profileImage: ""
  },
  contact: {
    phone: "+91 8369682814",
    email: "saiyashwantreddypanthy@gmail.com",
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
        "Paper published at ACROSET 2025, IEEE Xplore",
        "Presented talks at IEEE and American Control Conference (ACC'24)",
        "Winner, Codestellation CodeWar 4.0 Hackathon (1st Place)",
        "Finalist, International Robotics Competition (eYRC) and Next Big Thing Hackathon"
      ]
    },
    experience: [
      {
        title: "Gen AI Data Analyst Intern",
        company: "Tata Group",
        period: "Jan 2026 - Jul 2026",
        description: "Leading exploratory data analysis and predictive modeling using Generative AI tools.",
        bullets: [
          "Conducted EDA using GenAI tools to assess data quality and identify risk indicators.",
          "Proposed a no-code predictive modeling framework for customer delinquency risk.",
          "Designed an AI-driven collections strategy leveraging agentic AI and ethical automation."
        ]
      },
      {
        title: "Quantitative Researcher Intern",
        company: "JPMorgan Chase & Co.",
        period: "Feb 2026 - Apr 2026",
        description: "Applying quantitative analysis to risk estimation and default prediction.",
        bullets: [
          "Analyzed a book of loans to estimate customer probability of default.",
          "Applied dynamic programming to convert FICO scores into categorical data for prediction."
        ]
      },
      {
        title: "Data Science Intern",
        company: "BCG",
        period: "Nov 2025 - Jan 2026",
        description: "Executed customer churn analysis and optimization using Python and Random Forest.",
        bullets: [
          "Developed a Random Forest model achieving 50% recall for customer churn.",
          "Presented strategic insights to support business decision-making."
        ]
      },
      {
        title: "Data Analytics Trainee",
        company: "Deloitte",
        period: "Oct 2025 - Nov 2025",
        description: "Simulated business investigation workflows and Tableau dashboard creation.",
        bullets: [
          "Built Tableau dashboards to visualize key patterns in business investigation workflows.",
          "Used Excel for data classification and record cleaning to derive business conclusions."
        ]
      },
      {
        title: "Software Intern",
        company: "Main Flow Services & Technologies",
        period: "Jul 2024 - Nov 2024",
        description: "Focused on Computer Vision and ROS2 robotics integration.",
        bullets: [
          "Trained YOLO models for object detection and deployed Docker-based ROS2 systems.",
          "Automated ROS2 data processing pipelines and configured PLC-controlled systems."
        ]
      }
    ],
    research: [
      {
        title: "A Hybrid Minimax–MCTS Chess Engine Enhanced by RLHF",
        conference: "ACROSET Conference | IEEE Xplore",
        highlights: [
          "Combined Minimax, MCTS, and reinforcement learning-based evaluation.",
          "Scaled self-play training to 10M games using distributed CPU workers.",
          "Improved playing strength by ~100–150 Elo over baseline engines."
        ]
      }
    ]
  },
  projects: [
    {
      id: "pdf-ai",
      title: "PDF AI SaaS — LLM Chat Application",
      description: "RAG-based chatbot enabling natural-language Q&A over PDF documents using LangChain, OpenAI embeddings, and Pinecone vector database.",
      tags: ["LangChain", "OpenAI", "Pinecone"],
      repoUrl: "https://github.com/champion19007/pdf-ai-saas"
    },
    {
      id: "mlops-pipelines",
      title: "CI/CD & MLOps Pipelines",
      description: "Automated pipelines for ML workloads using AWS services like CodePipeline and CloudFormation. Implemented build, test, and deployment stages.",
      tags: ["AWS", "GitHub Actions", "Docker"],
      repoUrl: "https://github.com/champion19007/ci-cd-mlops"
    },
    {
      id: "stock-forecaster",
      title: "Advanced Stock Forecaster",
      description: "Deep learning time-series forecasting system using CNN, BiLSTM, and GRU architectures to analyze historical market data.",
      tags: ["TensorFlow", "BiLSTM", "Keras"],
      repoUrl: "https://github.com/champion19007/Advanced-Stock-Forecaster-CNN-BiLSTM-GRU-"
    },
    {
      id: "animal-detection",
      title: "Real-Time Animal Detection",
      description: "Computer vision system for real-time safety monitoring using YOLO to automatically identify animals in live CCTV streams.",
      tags: ["YOLO", "OpenCV", "PyTorch"],
      repoUrl: "https://github.com/champion19007/Real-Time-Animal-Detection-Using-CCTV-Camera-OpenVision"
    },
    {
      id: "mlops-forge",
      title: "MLOps-Forge",
      description: "Comprehensive AI infrastructure and automated pipeline framework for production machine learning.",
      tags: ["Python", "MLOps", "Terraform"],
      repoUrl: "https://github.com/champion19007/MLOps-Forge"
    },
    {
      id: "data-pipeline",
      title: "End-to-End Data Pipeline",
      description: "Robust data engineering pipeline designed for high throughput data processing and ETL.",
      tags: ["SQL", "ETL", "Python"],
      repoUrl: "https://github.com/champion19007/End-to-End-Data-Pipeline"
    },
    {
      id: "cv-mlops",
      title: "end-to-end-cv-mlops-project",
      description: "A complete MLOps workflow for Computer Vision, from data ingestion to model deployment.",
      tags: ["Jupyter", "PyTorch", "MLOps"],
      repoUrl: "https://github.com/champion19007/end-to-end-cv-mlops-project"
    },
    {
      id: "bank-churn",
      title: "bank-churn-mlops-pipeline",
      description: "Production-ready MLOps pipeline for predicting customer churn in banking environments.",
      tags: ["Python", "MLOps", "Azure"],
      repoUrl: "https://github.com/champion19007/bank-churn-mlops-pipeline"
    },
    {
      id: "aws-cicd",
      title: "aws-cicd-pipeline",
      description: "Automated deployment pipelines built on AWS for scalable cloud applications.",
      tags: ["AWS", "Shell", "CI/CD"],
      repoUrl: "https://github.com/champion19007/aws-cicd-pipeline"
    },
    {
      id: "rl-chess",
      title: "RL-Chess-Engine-Minimax-MCTS",
      description: "Hybrid chess engine leveraging Reinforcement Learning, Minimax, and Monte Carlo Tree Search.",
      tags: ["Python", "RL", "MCTS"],
      repoUrl: "https://github.com/champion19007/RL-Chess-Engine-Minimax-MCTS"
    },
    {
      id: "chess-cpp",
      title: "Chess-Engine-Deep-RL-Cpp",
      description: "High-performance chess engine implemented in C++ with Deep Reinforcement Learning.",
      tags: ["C++", "Deep RL", "Minimax"],
      repoUrl: "https://github.com/champion19007/Chess_engine_with_Deep_Reinforcement_learning-minmax-mcts-Cpp"
    },
    {
      id: "zoom-clone",
      title: "F-13-zoom-lite-clone-",
      description: "A lightweight Zoom clone for real-time video conferencing.",
      tags: ["TypeScript", "WebRTC", "Next.js"],
      repoUrl: "https://github.com/champion19007/F-13-zoom-lite-clone-"
    },
    {
      id: "restaurant-recommender",
      title: "Restaurant-Recommender",
      description: "Recommendation system using Yelp dataset to suggest restaurants based on cuisine and city preferences.",
      tags: ["Jupyter", "Data Science", "RecSys"],
      repoUrl: "https://github.com/champion19007/City-Cuisine-Based-Restaurant-Recommender-Using-Yelp-Dataset"
    }
  ],
  skills: [
    { name: "Python", category: "Programming" },
    { name: "SQL", category: "Programming" },
    { name: "Bash", category: "Programming" },
    { name: "JavaScript", category: "Programming" },
    { name: "LangChain", category: "AI / LLM" },
    { name: "Hugging Face Transformers", category: "AI / LLM" },
    { name: "PyTorch", category: "AI / LLM" },
    { name: "TensorFlow", category: "AI / LLM" },
    { name: "scikit-learn", category: "AI / LLM" },
    { name: "OpenCV", category: "AI / LLM" },
    { name: "RAG Pipelines", category: "Gen AI / Agentic" },
    { name: "Vector Databases (Pinecone)", category: "Gen AI / Agentic" },
    { name: "Prompt Engineering", category: "Gen AI / Agentic" },
    { name: "Agentic AI Concepts", category: "Gen AI / Agentic" },
    { name: "Docker", category: "MLOps / Cloud" },
    { name: "AWS (CodePipeline, CloudFormation)", category: "MLOps / Cloud" },
    { name: "MLflow", category: "MLOps / Cloud" },
    { name: "Weights & Biases", category: "MLOps / Cloud" },
    { name: "CI/CD Pipelines", category: "MLOps / Cloud" },
    { name: "Machine Learning", category: "Domains" },
    { name: "Deep Learning (CNNs, Transformers)", category: "Domains" },
    { name: "NLP", category: "Domains" },
    { name: "Computer Vision", category: "Domains" },
    { name: "Pandas & NumPy", category: "Data Tools" },
    { name: "Tableau", category: "Data Tools" },
    { name: "Streamlit & Gradio", category: "Data Tools" },
    { name: "Excel", category: "Data Tools" },
    { name: "RESTful APIs", category: "Web & APIs" },
    { name: "Next.js", category: "Web & APIs" },
    { name: "JSON", category: "Web & APIs" }
  ]
};
