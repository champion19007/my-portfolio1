/**
 * Sai Yashwant Reddy Panthy — Unified Portfolio JavaScript
 * Single-Page Dual-Theme Architecture with Instant 0ms Transition
 */

// 1. Instant Theme Switcher
function setPortfolioTheme(theme, preserveScroll = true) {
  const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
  if (theme !== 'dark' && theme !== 'light') {
    theme = 'dark';
  }

  // Calculate scroll ratio before switching
  let scrollRatio = 0;
  if (preserveScroll) {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      scrollRatio = window.scrollY / totalHeight;
    }
  }

  if (theme === 'dark') {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.style.backgroundColor = '#000A18';
    try {
      localStorage.setItem('portfolio_theme', 'dark');
    } catch(e) {}

    // Play dark videos, pause light videos
    const darkView = document.getElementById('portfolio-dark');
    const lightView = document.getElementById('portfolio-light');
    if (darkView) {
      darkView.querySelectorAll('video').forEach(v => {
        try { v.play().catch(() => {}); } catch(e) {}
      });
    }
    if (lightView) {
      lightView.querySelectorAll('video').forEach(v => {
        try { v.pause(); } catch(e) {}
      });
    }
  } else {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.style.backgroundColor = '#ffffff';
    try {
      localStorage.setItem('portfolio_theme', 'light');
    } catch(e) {}

    // Play light videos, pause dark videos
    const lightView = document.getElementById('portfolio-light');
    const darkView = document.getElementById('portfolio-dark');
    if (lightView) {
      lightView.querySelectorAll('video').forEach(v => {
        try { v.play().catch(() => {}); } catch(e) {}
      });
    }
    if (darkView) {
      darkView.querySelectorAll('video').forEach(v => {
        try { v.pause(); } catch(e) {}
      });
    }
  }

  // Restore proportional scroll position
  if (preserveScroll && scrollRatio > 0) {
    requestAnimationFrame(() => {
      const newTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (newTotal > 0) {
        window.scrollTo({
          top: scrollRatio * newTotal,
          behavior: 'instant'
        });
      }
    });
  }

  // Synchronize browser address bar query param with active theme
  try {
    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.get('theme') !== theme) {
      currentUrl.searchParams.set('theme', theme);
      window.history.replaceState({ theme }, '', currentUrl.toString());
    }
  } catch(e) {}

  // Trigger scroll detector update immediately and after DOM reflow
  if (window.jQuery && typeof initScrollUpdate === 'function') {
    initScrollUpdate();
    setTimeout(initScrollUpdate, 60);
    setTimeout(initScrollUpdate, 250);
  }
}

function togglePortfolioTheme() {
  const isDark = document.body.classList.contains('theme-dark');
  setPortfolioTheme(isDark ? 'light' : 'dark', true);
}

// Global aliases
window.togglePortfolioTheme = togglePortfolioTheme;
window.setPortfolioTheme = setPortfolioTheme;
window.toggleTheme = togglePortfolioTheme;

document.addEventListener('DOMContentLoaded', () => {

  // Initialize theme from URL query param, then localStorage, defaulting to 'dark'
  const urlParams = new URLSearchParams(window.location.search);
  const initialTheme = urlParams.get('theme') || localStorage.getItem('portfolio_theme') || 'dark';
  setPortfolioTheme(initialTheme, false);

  // Global Keyboard shortcut (Ctrl/Cmd + Shift + D or Alt + T) to toggle theme
  window.addEventListener('keydown', (e) => {
    if ((e.altKey && e.key.toLowerCase() === 't') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd')) {
      togglePortfolioTheme();
    }
  });

  // -------------------------------------------------------------
  // GLOBAL: Scroll Progress & Scrolled State
  // -------------------------------------------------------------
  const scrollProgress = document.getElementById('scrollProgress');
  const onScrollGlobal = () => {
    document.documentElement.classList.toggle('scrolled', window.scrollY > 20);
    if (document.body.classList.contains('theme-light') && scrollProgress) {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
      }
    }
  };
  window.addEventListener('scroll', onScrollGlobal, { passive: true });
  onScrollGlobal();

  // -------------------------------------------------------------
  // LIGHT MODE: Email Copy to Clipboard
  // -------------------------------------------------------------
  const EMAIL_ADDR = "saiyashwantreddypanthy@gmail.com";
  const footerContractPill = document.getElementById('footerContractPill');
  const footerCopyBtn = document.getElementById('footerCopyBtn');

  function copyEmailAction(e) {
    if (e) e.preventDefault();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL_ADDR).then(() => {
        alert("Email copied to clipboard: " + EMAIL_ADDR);
      }).catch(() => {
        prompt("Copy email address:", EMAIL_ADDR);
      });
    } else {
      prompt("Copy email address:", EMAIL_ADDR);
    }
  }

  if (footerContractPill) footerContractPill.addEventListener('click', copyEmailAction);
  if (footerCopyBtn) footerCopyBtn.addEventListener('click', copyEmailAction);

  // -------------------------------------------------------------
  // LIGHT MODE: Career Milestones & Journey (Dynamic Chronological Grid)
  // -------------------------------------------------------------
  const careerMilestones = [
    {
      category: "Industry",
      period: "Jan 2026 – Jul 2026",
      statusBadge: "Current / Upcoming",
      company: "Tata Group",
      role: "Gen AI Data Analyst Intern",
      location: "Mumbai, India",
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
      bullets: [
        "Conducted exploratory data analysis (EDA) using GenAI tools to assess data quality, identify risk indicators, and structure insights for predictive modeling.",
        "Proposed a no-code predictive modeling framework to assess customer delinquency risk, leveraging GenAI for structured model logic and evaluation criteria.",
        "Designed an AI-driven collections strategy leveraging agentic AI and automation, incorporating ethical AI principles, regulatory compliance, and scalable implementation frameworks."
      ],
      tags: ["GenAI", "Agentic AI", "Predictive Modeling", "Delinquency Risk", "EDA"]
    },
    {
      category: "Industry",
      period: "Feb 2026 – Apr 2026",
      statusBadge: "Quantitative Finance",
      company: "JPMorgan Chase & Co.",
      role: "Quantitative Researcher Intern",
      location: "Corporate Investment Banking",
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      bullets: [
        "Analyzed an extensive book of commercial loans to estimate customer probability of default (PD).",
        "Applied dynamic programming algorithms to convert continuous FICO credit scores into optimal categorical bins for default prediction modeling."
      ],
      tags: ["Quantitative Finance", "Dynamic Programming", "Probability of Default", "FICO Scoring"]
    },
    {
      category: "Industry",
      period: "Nov 2025 – Jan 2026",
      statusBadge: "Strategic Consulting",
      company: "Boston Consulting Group (BCG)",
      role: "Data Science Intern",
      location: "Consulting Analytics",
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
      bullets: [
        "Performed enterprise customer churn analysis using Python, Pandas, and NumPy across large-scale historical datasets.",
        "Built and tuned a Random Forest classification model, achieving 50% recall in identifying high-value at-risk accounts.",
        "Presented predictive insights and customer retention strategies through executive-level business summaries."
      ],
      tags: ["Random Forest", "Customer Churn", "Python / Pandas", "50% Recall", "Executive Strategy"]
    },
    {
      category: "Education",
      period: "Graduating Dec 2025",
      statusBadge: "Degree & Research",
      company: "Manipal University Jaipur",
      role: "B.Tech in Computer Science Engineering (AI & ML)",
      location: "Rajasthan, India",
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
      bullets: [
        "Specialized in deep learning architectures (CNNs, Transformers, BiLSTM/GRU), predictive analytics, and scalable MLOps infrastructure.",
        "Delivered technical talks at IEEE conferences and the prestigious American Control Conference (ACC'24).",
        "Maintained top-tier academic performance while leading AI/ML research initiatives and peer workshops."
      ],
      tags: ["Deep Learning", "Transformers", "Computer Vision", "Manipal University", "ACC'24"]
    },
    {
      category: "Research",
      period: "ACROSET 2025",
      statusBadge: "IEEE Peer-Reviewed",
      company: "IEEE Xplore & ACROSET 2025",
      role: "Published Research Author",
      location: "Global Indexing",
      link: "https://ieeexplore.ieee.org/abstract/document/11280596",
      linkText: "Read Paper on IEEE Xplore ↗",
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
      bullets: [
        "Authored 'A Hybrid Minimax–MCTS Chess Engine Enhanced by RLHF Using Stockfish and AlphaZero' published at ACROSET 2025.",
        "Designed a hybrid engine architecture fusing Minimax search trees with Monte Carlo Tree Search (MCTS) and RLHF neural evaluation.",
        "Scaled self-play training to 10M games across distributed CPU workers, improving playing strength by ~100–150 Elo points over classical baselines."
      ],
      tags: ["IEEE Xplore", "RLHF", "Minimax", "MCTS", "Stockfish", "AlphaZero", "10M Self-Play Games"]
    },
    {
      category: "Industry",
      period: "Oct 2025 – Nov 2025",
      statusBadge: "Forensic Technology",
      company: "Deloitte",
      role: "Data Analytics Trainee",
      location: "Corporate Simulation",
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
      bullets: [
        "Completed a data analysis and forensic technology simulation focused on business investigation workflows and transaction anomalies.",
        "Engineered an interactive Tableau dashboard visualizing key risk indicators to drive executive decision-making.",
        "Applied advanced Excel routines to clean dirty ledger records, classify transactions, and derive business conclusions."
      ],
      tags: ["Tableau", "Forensic Tech", "Business Investigation", "Excel", "Data Cleaning"]
    },
    {
      category: "Education",
      period: "2024 – 2025",
      statusBadge: "1st Place Winner",
      company: "Hackathons & Competitions",
      role: "Hackathon Champion & Finalist",
      location: "National & Global",
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
      bullets: [
        "Winner (1st Place): Codestellation CodeWar 4.0 Hackathon against hundreds of competitive engineering teams.",
        "Finalist: eYRC (e-Yantra International Robotics Competition) hosted by IIT Bombay, developing autonomous robotic systems.",
        "Finalist: Next Big Thing National Innovation Hackathon for AI-driven societal impact solutions."
      ],
      tags: ["CodeWar 4.0 Winner", "eYRC Finalist", "Next Big Thing", "IIT Bombay", "Hackathons"]
    },
    {
      category: "Industry",
      period: "Jul 2024 – Nov 2024",
      statusBadge: "Robotics & Vision",
      company: "Main Flow Services & Technologies",
      role: "Software Intern",
      location: "Remote",
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
      bullets: [
        "Trained YOLO computer vision models for real-time object detection and deployed Docker-based ROS2 containerized nodes.",
        "Automated ROS2 telemetry data processing pipelines and configured PLC-controlled motor drive systems for hardware control."
      ],
      tags: ["YOLO", "ROS2", "Docker", "PLC Automation", "Computer Vision", "Robotics"]
    }
  ];

  const roadmapContainer = document.getElementById('roadmapTimelineContainer');
  const tabButtons = document.querySelectorAll('.roadmap-tab-btn');

  function renderRoadmap(filter) {
    if (!roadmapContainer) return;

    const filtered = filter === 'All' 
      ? careerMilestones 
      : careerMilestones.filter(m => m.category.toLowerCase() === filter.toLowerCase());

    roadmapContainer.innerHTML = filtered.map(item => `
      <div class="timeline-milestone-card">
        <div class="milestone-header-row">
          <div class="milestone-company-wrap">
            <div class="milestone-company-icon">
              ${item.iconSvg}
            </div>
            <div>
              <div class="milestone-company-name">${item.company}</div>
              <div class="milestone-sub-row">
                <span class="milestone-role-title">${item.role}</span>
                <span class="milestone-location-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  ${item.location}
                </span>
              </div>
            </div>
          </div>
          <div class="milestone-date-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${item.period}
          </div>
        </div>

        <ul class="milestone-bullets-list">
          ${item.bullets.map(b => `<li class="milestone-bullet-item">${b}</li>`).join('')}
        </ul>

        <div class="milestone-tags-row">
          ${item.tags.map(t => `<span class="milestone-tag">${t}</span>`).join('')}
          ${item.link ? `
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="milestone-paper-link-btn" title="View Published Research">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              ${item.linkText || 'Read Paper ↗'}
            </a>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  // Initial render of all milestones
  renderRoadmap('All');

  // Tab click handlers
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-tab');
      renderRoadmap(filter);
    });
  });

  // -------------------------------------------------------------
  // LIGHT MODE: Interactive Projects Slider (Drag, Wheel, Arrows)
  // -------------------------------------------------------------
  const sliderWrapper = document.querySelector('.projects-slider-wrapper');
  const sliderPrevBtn = document.getElementById('sliderPrevBtn');
  const sliderNextBtn = document.getElementById('sliderNextBtn');

  if (sliderWrapper) {
    // 1. Arrow Button Smooth Scroll
    if (sliderPrevBtn) {
      sliderPrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sliderWrapper.scrollBy({ left: -340, behavior: 'smooth' });
      });
    }
    if (sliderNextBtn) {
      sliderNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sliderWrapper.scrollBy({ left: 340, behavior: 'smooth' });
      });
    }

    // 2. Mouse Wheel Horizontal Scrolling
    sliderWrapper.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        sliderWrapper.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });

    // 3. Mouse Drag-to-Scroll
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    sliderWrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      hasDragged = false;
      sliderWrapper.style.cursor = 'grabbing';
      startX = e.pageX - sliderWrapper.offsetLeft;
      scrollStart = sliderWrapper.scrollLeft;
    });

    sliderWrapper.addEventListener('mouseleave', () => {
      isDown = false;
      sliderWrapper.style.cursor = 'grab';
    });

    sliderWrapper.addEventListener('mouseup', () => {
      isDown = false;
      sliderWrapper.style.cursor = 'grab';
    });

    sliderWrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const currentX = e.pageX - sliderWrapper.offsetLeft;
      const walk = (currentX - startX) * 1.5;
      if (Math.abs(walk) > 6) {
        hasDragged = true;
      }
      sliderWrapper.scrollLeft = scrollStart - walk;
    });

    // Prevent navigation if user dragged the card
    sliderWrapper.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (hasDragged) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    });
  }

  // -------------------------------------------------------------
  // LIGHT MODE: Skills Section Copy Email to Clipboard
  // -------------------------------------------------------------
  const copyContractBtn = document.getElementById('copyContractBtn');
  const copyTooltip = document.getElementById('copyTooltip');
  if (copyContractBtn) {
    copyContractBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = "saiyashwantreddypanthy@gmail.com";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          if (copyTooltip) {
            copyTooltip.classList.add('active');
            setTimeout(() => copyTooltip.classList.remove('active'), 2500);
          }
        }).catch(() => {
          prompt("Copy email address:", textToCopy);
        });
      } else {
        prompt("Copy email address:", textToCopy);
      }
    });
  }

  // -------------------------------------------------------------
  // LIGHT MODE: Mobile Header Navigation Menu
  // -------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const aicmNav = document.querySelector('.aicm-nav-links');
  if (mobileToggle && aicmNav) {
    mobileToggle.addEventListener('click', () => {
      aicmNav.classList.toggle('active-mobile');
    });
  }

  // -------------------------------------------------------------
  // DARK MODE: Swiper Carousel & Scroll Detection
  // -------------------------------------------------------------
  if (window.jQuery) {
    const $ = window.jQuery;

    // Mobile menu toggle
    $('.toggle-menu').on('click', function () {
      $('.header').toggleClass('menu-open');
    });

    // Detect scroll animation
    function runScrollDetect() {
      if (!document.body.classList.contains('theme-dark')) return;
      const winTop = $(window).scrollTop();
      const winBottom = winTop + $(window).outerHeight();

      $('.js_detect-scroll').each(function () {
        const el = $(this);
        const offset = el.offset();
        if (offset && (winBottom - 40 > offset.top || offset.top <= winTop)) {
          el.addClass('visible');
        }
      });
    }

    window.initScrollUpdate = runScrollDetect;
    $(window).on('scroll', runScrollDetect);
    runScrollDetect();

    // Initialize Journey Swiper in Dark Mode
    if (typeof Swiper !== 'undefined') {
      const whySwiper = $('.why .swiper')[0];
      if (whySwiper) {
        new Swiper(whySwiper, {
          slidesPerView: 'auto',
          spaceBetween: 20,
          freeMode: {
            enabled: true,
            sticky: false,
          },
          grabCursor: true
        });
      }
    }
  }

});
