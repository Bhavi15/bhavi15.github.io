// ══════════════════════════════════════════════════
//   BHAVISHA PATEL — GenAI Developer Portfolio
// ══════════════════════════════════════════════════

export const engineer = {
  name:       'BHAVISHA PATEL',
  title:      'GenAI Developer & ML Engineer',
  tagline:    'I design multimodal AI systems — from RAG pipelines that see and reason across documents, to fine-tuned transformers and computer vision models shipped to GitHub.',
  location:   'Scarborough, Ontario, Canada',
  email:      'pbhavu1507@gmail.com',
  github:     'github.com/Bhavi15',
  linkedin:   'linkedin.com/in/bhavishapatel',
  available:  true,
  status:     'OPEN TO AI/ML ENGINEER ROLES',

  // About page highlights — NO stats, just compelling facts
  highlights: [
    { icon: '⚡', label: 'Enterprise AI',  desc: 'Built GenAI tools at TCS for Canada\'s top financial institution' },
    { icon: '🎓', label: 'Dual 4.0 GPA',   desc: 'AI + Business Analytics certs at Seneca Polytechnic' },
    { icon: '🤖', label: 'Multimodal AI',  desc: 'GPT-4V · LangGraph · FAISS — systems that read text, images and PDFs together' },
    { icon: '🔬', label: '7 Projects',     desc: 'From multimodal RAG to OCR — every project ships to GitHub' },
  ],

  // About page quick stats row
  stats: [
    { v: '6+',    l: 'Months Experience' },
    { v: '4.0',   l: 'GPA (Both Certs)'  },
    { v: '7',     l: 'GitHub Projects'   },
    { v: '90%',   l: 'Code Approval Rate'},
  ],
};

// Scene order: ABOUT → EXPERIENCE → PROJECTS → SKILLS → CONTACT
export const SCENES = ['ABOUT', 'EXPERIENCE', 'PROJECTS', 'SKILLS', 'CONTACT'];

export const SCENE_META = {
  ABOUT:      { idx:0, label:'01', name:'About',      tagline:'Who I am'           },
  EXPERIENCE: { idx:1, label:'02', name:'Experience', tagline:'Where I\'ve worked' },
  PROJECTS:   { idx:2, label:'03', name:'Projects',   tagline:'What I\'ve built'   },
  SKILLS:     { idx:3, label:'04', name:'Skills',     tagline:'Tools & expertise'  },
  CONTACT:    { idx:4, label:'05', name:'Contact',    tagline:'Let\'s connect'      },
};

// ─── PROJECTS — AI-first order, all 7 from GitHub ───────────────────
export const research = [
  {
    id: 'p1',
    title: 'Multimodal RAG System',
    venue: 'LangGraph · GPT-4V · FAISS · Streamlit',
    type: 'GenAI / Agentic AI',
    tags: ['LangGraph', 'GPT-4V', 'RAG', 'FAISS', 'PyMuPDF', 'Streamlit'],
    impact: '<200ms latency · 10× faster than baseline',
    color: '#00D4FF',
    abstract: 'Production-grade multimodal RAG system orchestrating 3 AI agents — Retrieval, QA, and Deep Research — built with LangGraph and GPT-4V. Processes medical documents using hybrid semantic and recursive chunking into FAISS vector store. Includes conversational memory for context-aware multi-turn responses. PyMuPDF pipeline achieves 10× faster document processing than traditional methods.',
    link: 'https://github.com/Bhavi15/Multimodal-RAG',
  },

  {
    id: 'p2',
    title: 'Fine-Tuned Transformer Model',
    venue: 'DistilBERT · PyTorch · HuggingFace',
    type: 'NLP / Fine-Tuning',
    tags: ['DistilBERT', 'PyTorch', 'HuggingFace', 'NLP', 'IMDB 50K'],
    impact: '92.63% accuracy · 92.77% F1-score',
    color: '#7B2FFF',
    abstract: 'Fine-tuned DistilBERT on the IMDB 50K dataset for binary sentiment classification. Built a custom training pipeline with learning rate scheduling and experiment tracking. Achieved 92.63% accuracy and 92.77% F1-score — strong performance on a standard NLP benchmark. Demonstrates end-to-end transformer fine-tuning workflow from data prep to evaluation.',
    link: 'https://github.com/Bhavi15/AI_Exploration',
  },

  {
    id: 'p7',
    title: 'Currency Exchange Forecasting',
    venue: 'SARIMA · GARCH · Tableau · SQL',
    type: 'Time-Series Analytics',
    tags: ['SARIMA', 'GARCH', 'Python', 'SQL', 'Tableau', 'Volatility'],
    impact: 'MAPE < 4% · INR vs GBP/USD/CAD/EUR',
    color: '#A78BFA',
    abstract: 'End-to-end analytics pipeline examining INR exchange rate impacts against GBP, USD, CAD, and EUR. Applied SARIMA for trend forecasting and GARCH for volatility modelling, achieving MAPE under 4%. Includes full EDA, data cleaning, and Tableau dashboards built for strategic financial decision-making. Demonstrates applied time-series methods on real financial data.',
    link: 'https://github.com/Bhavi15/Comparative-Analysis-of-the-Impact-of-Major-Currency-Exchange-Rates',
  },

  {
    id: 'p4',
    title: 'Gujarati Handwritten OCR',
    venue: 'CNN · TensorFlow · Keras · OpenCV · Flask',
    type: 'Computer Vision',
    tags: ['CNN', 'TensorFlow', 'OpenCV', 'Flask', 'Image Processing'],
    impact: '93.40% accuracy · 31,735 images · 446 characters',
    color: '#FFB800',
    abstract: 'Full-stack web application for recognising Gujarati handwritten characters. Collected and processed a dataset of 31,735 images covering 446 Gujarati characters and digits 0–9. Custom CNN achieves 93.40% accuracy. Flask backend provides real-time OCR inference from uploaded images through a user-friendly web interface. Released under GNU GPL v3.',
    link: 'https://github.com/Bhavi15/Gujarati_Handwritten_Character_Recognition_System',
  },

  {
    id: 'p5',
    title: 'Toronto Crime Prediction',
    venue: 'Sklearn · Pandas · Matplotlib · Seaborn',
    type: 'ML Classification',
    tags: ['Sklearn', 'Classification', 'Regression', 'Python', 'EDA'],
    impact: 'Predicts: Assault · Robbery · Auto Theft · B&E',
    color: '#FF3366',
    abstract: 'End-to-end ML pipeline predicting crime categories — Assault, Robbery, Auto Theft, Break and Enter — from attributes like year, division, and location. Combines classification and regression analyses with thorough feature engineering. Companion project performs exploratory data analysis on the Toronto Traffic Collision Dataset using statistical inference and hypothesis testing.',
    link: 'https://github.com/Bhavi15/Comprehensive-analysis-of-Toronto-crime-data',
  },

  {
    id: 'p6',
    title: 'Toronto Traffic Collision EDA',
    venue: 'Pandas · Matplotlib · SciPy · Statistical Inference',
    type: 'Data Analysis / EDA',
    tags: ['EDA', 'Statistical Inference', 'Python', 'Pandas', 'Visualization'],
    impact: 'Real-world collision dataset · Hypothesis testing',
    color: '#FF8C00',
    abstract: 'Exploratory data analysis on a real-world Toronto traffic collision dataset to uncover meaningful patterns using statistical inference methods. Applies hypothesis testing, correlation analysis, and visual storytelling to surface actionable insights. Demonstrates rigorous data science workflow from raw data cleaning through to statistically validated findings.',
    link: 'https://github.com/Bhavi15/EDA-on-Toronto-Traffic-Collision-Dataset',
  },

  {
    id: 'p3',
    title: 'Mental Health Web App',
    venue: 'MobileNet · TensorFlow · Keras · Flask · NLTK',
    type: 'Computer Vision / NLP',
    tags: ['MobileNet', 'TensorFlow', 'Keras', 'Flask', 'NLTK', 'OpenCV'],
    impact: '98.60% facial emotion accuracy',
    color: '#00FF88',
    abstract: 'Full-stack mental health application combining facial emotion detection and NLP-based mood analysis. Uses MobileNet architecture for real-time facial emotion recognition, achieving 98.60% accuracy on the dataset. NLTK-powered chatbot provides contextual mental health support. Flask backend serves both the CV model and NLP pipeline through a unified web interface.',
    link: 'https://github.com/Bhavi15/Mental_Health_Web',
  }
]

// ─── EXPERIENCE & EDUCATION ───────────────────────
export const systems = [
  {
    id: 'e1',
    name: 'TCS',
    type: 'GenAI Developer · Tata Consultancy Services, Canada',
    desc: 'Delivered enterprise-grade GenAI tools for one of Canada\'s top financial institutions. Built an AI-powered VS Code extension using LLMs and the VSCode API, achieving 90% code approval rates and reducing QA time by 60%. Developed an autonomous AWS Strands security agent and designed agentic SDLC automation pipelines using LangGraph.',
    metrics: [
      { k: 'Duration',      v: '6+ mo' },
      { k: 'Code Approval', v: '90%'   },
      { k: 'QA Speedup',   v: '60%'   },
      { k: 'Role',          v: 'GenAI Dev' },
    ],
    tech: ['AWS Strands', 'LangGraph', 'VSCode API', 'LLMs', 'Python', 'Node.js', 'Angular'],
    color: '#00D4FF',
    year: 'Aug 2025 – Jan 2026',
  },
  {
    id: 'e2',
    name: 'SENECA',
    type: 'Graduate Certificates · Seneca Polytechnic, Canada',
    desc: 'Completed dual graduate certificates with a perfect 4.0 GPA in both programs. Artificial Intelligence (2024–25) covered deep learning, NLP, MLOps, and computer vision. Business Analytics (2023–24) covered statistical modelling, data-driven decision making, and analytics engineering.',
    metrics: [
      { k: 'AI GPA',       v: '4.0'      },
      { k: 'Analytics GPA',v: '4.0'      },
      { k: 'Programs',     v: '2 Certs'  },
      { k: 'Period',       v: '2023–25'  },
    ],
    tech: ['Deep Learning', 'NLP', 'MLOps', 'Computer Vision', 'Statistics', 'Business Analytics'],
    color: '#00FF88',
    year: '2023 – 2025',
  },
  {
    id: 'e3',
    name: 'BVM / GTU',
    type: 'B.Tech Information Technology · Gujarat Technological University, India',
    desc: 'Bachelor of Technology in Information Technology with Distinction. Built strong foundations in algorithms, data structures, software engineering, and computer vision. Final-year capstone project was the Gujarati Handwritten Character Recognition System — a CNN-based OCR app processing 31,735 images.',
    metrics: [
      { k: 'Result',   v: 'Distinction' },
      { k: 'Degree',   v: 'B.Tech IT'  },
      { k: 'Period',   v: '2018–2022'  },
      { k: 'Country',  v: 'India'      },
    ],
    tech: ['C/C++', 'Python', 'TensorFlow', 'Algorithms', 'Data Structures', 'Computer Vision'],
    color: '#7B2FFF',
    year: '2018 – 2022',
  },
];

// ─── SKILLS — expanded with latest AI ecosystem ───
export const stack = {
  // Tab 1: GenAI & LLM frameworks
  genai: [
    { name: 'LangChain / LangGraph',    level: 95, sub: 'RAG pipelines & multi-agent orchestration' },
    { name: 'AWS Bedrock / Strands',    level: 88, sub: 'Enterprise agentic AI at scale'            },
    { name: 'CrewAI',                   level: 82, sub: 'Role-based autonomous AI crews'            },
    { name: 'Claude API (Anthropic)',   level: 85, sub: 'Tool use, vision, long-context reasoning'  },
    { name: 'OpenAI API / GPT-4V',     level: 90, sub: 'Chat, function calling, multimodal'        },
    { name: 'LlamaIndex / Pydantic AI', level: 80, sub: 'Document intelligence & structured I/O'   },
  ],
  // Tab 2: ML/DL frameworks
  ml: [
    { name: 'PyTorch',                  level: 90, sub: 'Deep learning, custom training loops'      },
    { name: 'HuggingFace Transformers', level: 92, sub: 'Fine-tuning BERT, GPT, DistilBERT'        },
    { name: 'TensorFlow / Keras',       level: 88, sub: 'CNNs, MobileNet, production models'       },
    { name: 'Scikit-learn',             level: 87, sub: 'Classical ML, pipelines, evaluation'       },
    { name: 'FAISS / Pinecone / Qdrant',level: 86, sub: 'Vector search & semantic retrieval'       },
    { name: 'OpenCV',                   level: 82, sub: 'Image processing & computer vision'        },
  ],
  // Tab 3: Infra & tools
  infra: [
    { name: 'Python',                   level: 96, sub: 'Primary language for all AI/ML work'       },
    { name: 'FastAPI / Flask',          level: 88, sub: 'ML API serving & web backends'             },
    { name: 'AWS (S3, EC2, SageMaker)', level: 85, sub: 'Cloud ML deployment & storage'             },
    { name: 'Docker / GitHub Actions',  level: 82, sub: 'Containerisation & CI/CD pipelines'        },
    { name: 'VSCode Extension API',     level: 84, sub: 'AI-powered developer tooling'              },
    { name: 'SQL / MongoDB / NoSQL',    level: 83, sub: 'MySQL, MongoDB, Qdrant data layers'        },
  ],
  domains: [
    { name: 'Generative AI & LLMs',        icon: '◆' },
    { name: 'Agentic AI & Multi-Agent Systems', icon: '◆' },
    { name: 'Retrieval-Augmented Generation',   icon: '◆' },
    { name: 'NLP & Transformer Fine-Tuning',    icon: '◆' },
    { name: 'Computer Vision & OCR',            icon: '◆' },
    { name: 'MLOps & Production AI',            icon: '◆' },
    { name: 'AWS Bedrock & Cloud AI',           icon: '◆' },
    { name: 'VS Code AI Extension Dev',         icon: '◆' },
    { name: 'Time-Series Forecasting',          icon: '◆' },
  ],
};
