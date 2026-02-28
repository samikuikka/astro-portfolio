export const languages = {
  en: "English",
  cn: "Chinese",
};

export const defaultLang = "en";

export const ui = {
  en: {
    "hero.hello": "Hello",
    "hero.name": "Hi, I'm",
    "hero.subtitle": "AI ENGINEER & BUILDER",
    "hero.contact": "Contact me",
    "about.introduction":
      "I build AI-native applications at Bind, working on agentic contract automation systems. My day-to-day involves agent harnesses and end-to-end AI application development. In my spare time, I dive deeper into RAG systems, memory architectures, and multi-agent workflows.",
    "about.about": "What I'm Building",
    "timeline.bachelor.title": "Bachelor's Beginnings",
    "timeline.bachelor.description":
      "Started on a Bachelor's degree in Computer Science, laying the foundational knowledge with limited prior coding experience.",
    "timeline.master.title": "MSc in Web Technologies",
    "timeline.master.description":
      "Research on cloud-native systems, microservices, and networking at Aalto University. Built a strong foundation in systems design and web technologies.",
    "timeline.vertex.title": "Full-stack Engineer & Scrum Master at Vertex",
    "timeline.vertex.description":
      "Built and scaled a cloud-native CAD document platform (Angular, microservices, Azure). Learned how to ship production-grade systems.",
    "timeline.fullstack.title": "Full Stack Developer & Scrum Master",
    "timeline.ai_side_projects.title": "LLM & Agent Experiments",
    "timeline.ai_side_projects.description":
      "Started building AI agents, itinerary planners, and optimizing agentic system in my spare time.",

    "timeline.ai_startup.title": "AI Engineer at Legal-tech Startup",
    "timeline.ai_startup.description":
      "Working on agentic contract automation at Bind. Building AI-native applications that leverage LLMs and agents to streamline legal processes.",
    // Frontend category
    "skills.frontend": "Frontend",
    "skills.frontend.react.name": "React",
    "skills.frontend.react.description":
      "I have been using React since 2019 and have used it in most of my frontend projects, and currently at my work at Bind.",
    "skills.frontend.nextjs.name": "Next.js",
    "skills.frontend.nextjs.description":
      "Next.js is my go-to framework for server-side rendering and creating applications with great SEO.",
    "skills.frontend.astro.name": "Astro",
    "skills.frontend.astro.description":
      "I'm a huge fan of Astro's island architecture. I prefer using Astro on sites with a lot of static content.",
    "skills.frontend.angular.name": "Angular",
    "skills.frontend.angular.description":
      "Angular is a great framework for building large-scale applications. I use it extensively at work, currently building a cloud-based storage solution for the construction industry.",

    "skills.ai": "AI",
    "skills.agent-systems.title": "Agent Systems",
    "skills.prompt-optimization.title": "Prompt optimization",
    "skills.rag.title": "Retrieval augmented generation",
    "skills.agent-systems.description":
      "Experience building real agentic systems using Inngest AgentKit, Vercel AI SDK, and custom MCP servers. I design multi-tool workflows, stateful agents, and planner–executor architectures that interact with real data and external systems.",
    "skills.prompt-optimization.description":
      "Skilled in optimizing LLM prompts using DSPy, GEPA, and structured evals. I build iterative pipelines that generate, mutate, and refine prompts using feedback signals to reach higher accuracy and more reliable model behavior.",
    "skills.rag.description":
      "Hands-on experience building RAG pipelines: embeddings, chunking, hybrid search, and reranking. I’ve built production-ready RAG systems for real data, including a travel-planner using a 10,000-item Chinese attractions dataset.",

    // Backend category
    "skills.backend": "Backend",
    "skills.backend.nodejs.name": "Node.js",
    "skills.backend.nodejs.description":
      "For JavaScript-based backends, I mostly use Node.js, which I’m most proficient in.",
    "skills.backend.python.name": "Python",
    "skills.backend.python.description":
      "I started using Python for serious projects at work by creating microservices for efficient thumbnail generation.",
    "skills.backend.java.name": "Java",
    "skills.backend.java.description":
      "Java is used in my current job to build reactive microservices with Spring Boot.",
    "skills.backend.dotnet.name": ".NET",
    "skills.backend.dotnet.description":
      "I also have knowledge of .NET, which is used in several of my work microservices.",

    // DevOps category
    "skills.devops": "DevOps",
    "skills.devops.docker.name": "Docker",
    "skills.devops.docker.description":
      "I have used Docker in both personal projects and work to run backend services.",
    "skills.devops.kubernetes.name": "Kubernetes",
    "skills.devops.kubernetes.description":
      "I wrote my Master's thesis on Kubernetes networking, focusing on API gateways and service meshes.",
    "skills.devops.cicd.name": "CI/CD",
    "skills.devops.cicd.description":
      "I have used CI/CD pipelines at work to automate testing and deployment of microservices.",

    // Database category
    "skills.database": "Database",
    "skills.database.mongodb.name": "MongoDB",
    "skills.database.mongodb.description":
      "I have used MongoDB at work to store data for microservices.",
    "skills.database.postgresql.name": "PostgreSQL",
    "skills.database.postgresql.description":
      "I have both professional experience and personal interest in SQL-based databases.",
    "skills.database.mysql.name": "MySQL",
    "skills.database.mysql.description":
      "I have both professional experience and personal interest in SQL-based databases.",
    "skills.database.redis.name": "Redis",
    "skills.database.redis.description":
      "I use Redis for caching information to improve microservices performance.",
    "skills.projects": "Projects",

    // Projects
    "projects.featured": "Featured Projects",
    "projects.realEstate.title": "Real Estate Price Prediction",
    "projects.realEstate.description":
      "A machine learning model to predict real estate prices. Using web scraped data to predict prices of real estate in Helsinki, Finland.",
    "projects.portfolio.title": "Portfolio",
    "projects.portfolio.description":
      "This portfolio website! Hope you like it! :)",
    "projects.aiGameContentCreator.title": "AI game content creator",
    "projects.aiGameContentCreator.description":
      "A web based automation tool for rapid game content creation using AI models. As a part of Aalto University's 2022 Web development course.",
    "projects.oldPortfolio.title": "Old portfolio",
    "projects.oldPortfolio.description":
      "My old portfolio website, built with Astro. It was a great learning experience!",
    "projects.eCommercePlatform.title": "E-commerce platform",
    "projects.eCommercePlatform.description":
      "A mock of an e-commerce platform. This project was a part of a device-agnostic design course in Aalto University.",
    "projects.workoutLogger.title": "Workout logger",
    "projects.workoutLogger.description":
      "Full stack application for logging workouts. This project was a part of a full stack course in Aalto University.",

    "projects.mapShowcase.title": "PlanChinaTrips",
    "projects.mapShowcase.description":
      "Full stack application for travel planning in China. Using government attraction rating system to showcase the best places to visit. Built with Next.js and Leaflet, with Stripe payment integration.",

    // Contact
    "contact.title": " Get in Touch",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
  },
  cn: {
    "hero.hello": "你好",
    "hero.name": "嗨，我是",
    "hero.subtitle": "AI 工程师 ＆ 构建者",
    "hero.contact": "联系我",

    "about.introduction":
      "我在 Bind 构建 AI 原生应用，专注于智能体合同自动化系统。日常工作包括智能体工具框架和端到端 AI 应用开发。业余时间我会深入研究 RAG 系统、记忆架构和多智能体工作流。",
    "about.about": "我在构建什么",

    "timeline.bachelor.title": "学士阶段的开始",
    "timeline.bachelor.description":
      "开始攻读计算机科学学士学位，以几乎没有编程基础为起点打下计算机专业的根基。",

    "timeline.master.title": "Web 技术硕士（MSc）",
    "timeline.master.description":
      "在阿尔托大学（Aalto University）研究云原生系统、微服务和网络。奠定了坚实的系统设计和 Web 技术基础。",

    "timeline.vertex.title": "Vertex 全栈工程师兼 Scrum Master",
    "timeline.vertex.description":
      "构建并扩展云原生 CAD 文档管理平台（Angular、微服务、Azure）。学习了如何交付生产级系统。",

    "timeline.fullstack.title": "全栈开发者 ＆ Scrum Master",

    "timeline.ai_side_projects.title": "LLM 与智能体实验",
    "timeline.ai_side_projects.description":
      "在空闲时间开始构建 AI 智能体、旅行规划器，并优化智能体系统。",

    "timeline.ai_startup.title": "法律科技初创公司的 AI 工程师",
    "timeline.ai_startup.description":
      "在 Bind 从事智能体驱动的合同自动化工作。构建利用 LLM 和智能体优化法律流程的 AI 原生应用。",

    // Frontend category
    "skills.frontend": "前端",
    "skills.frontend.react.name": "React",
    "skills.frontend.react.description":
      "我自2019年开始使用React，并在大部分前端项目中使用它。",
    "skills.frontend.nextjs.name": "Next.js",
    "skills.frontend.nextjs.description":
      "Next.js是我处理服务端渲染和创建SEO优秀应用的首选框架。",
    "skills.frontend.astro.name": "Astro",
    "skills.frontend.astro.description":
      "我是Astro岛屿架构的超级粉丝，在静态内容较多的网站上我更喜欢使用Astro。",
    "skills.frontend.angular.name": "Angular",
    "skills.frontend.angular.description":
      "Angular是构建大型应用的优秀框架。我在当前工作中广泛使用它，目前正在构建面向建筑行业的云存储解决方案。",

    // Backend category
    "skills.backend": "后端",
    "skills.backend.nodejs.name": "Node.js",
    "skills.backend.nodejs.description":
      "对于基于JavaScript的后端，我主要使用Node.js，它也是我最擅长的后端技术。",
    "skills.backend.python.name": "Python",
    "skills.backend.python.description":
      "我在工作中开始认真使用Python，通过创建微服务实现高效的缩略图生成。",
    "skills.backend.java.name": "Java",
    "skills.backend.java.description":
      "Java是我当前工作的语言，我们使用Spring Boot构建响应式微服务。",
    "skills.backend.dotnet.name": ".NET",
    "skills.backend.dotnet.description":
      "我对.NET也有一定了解，因为在工作中有几个微服务使用它。",

    // DevOps category
    "skills.devops": "运维",
    "skills.devops.docker.name": "Docker",
    "skills.devops.docker.description":
      "我在个人项目和工作中都使用Docker来运行后端服务。",
    "skills.devops.kubernetes.name": "Kubernetes",
    "skills.devops.kubernetes.description":
      "我撰写了关于Kubernetes网络的硕士论文，重点研究了API网关和服务网格。",
    "skills.devops.cicd.name": "CI/CD",
    "skills.devops.cicd.description":
      "我在工作中使用CI/CD流水线来自动化测试和部署微服务。",

    // Database category
    "skills.database": "数据库",
    "skills.database.mongodb.name": "MongoDB",
    "skills.database.mongodb.description":
      "我在工作中使用MongoDB存储微服务数据。",
    "skills.database.postgresql.name": "PostgreSQL",
    "skills.database.postgresql.description":
      "我在专业领域和个人兴趣上都使用SQL数据库。",
    "skills.database.mysql.name": "MySQL",
    "skills.database.mysql.description":
      "我在专业领域和个人兴趣上都使用SQL数据库。",
    "skills.database.redis.name": "Redis",
    "skills.database.redis.description":
      "我使用Redis来缓存微服务信息以提升性能。",
    "skills.projects": "项目",

    // Projects
    "projects.featured": "推荐项目",
    "projects.realEstate.title": "房地产价格预测",
    "projects.realEstate.description":
      "一个用于预测房地产价格的机器学习模型。使用网络抓取的数据来预测芬兰赫尔辛基的房地产价格。",
    "projects.portfolio.title": "作品集",
    "projects.portfolio.description": "这是我的作品集网站！希望你喜欢！:)",
    "projects.aiGameContentCreator.title": "AI 游戏内容生成器",
    "projects.aiGameContentCreator.description":
      "一个基于网页的自动化工具，用于利用AI模型快速生成游戏内容。该项目是阿尔托大学2022年网页开发课程的一部分。",
    "projects.oldPortfolio.title": "旧作品集",
    "projects.oldPortfolio.description":
      "我曾经使用Astro构建的旧作品集网站。这是一次极好的学习经历！",
    "projects.eCommercePlatform.title": "电子商务平台",
    "projects.eCommercePlatform.description":
      "一个电子商务平台的模拟项目。该项目是阿尔托大学设备无关设计课程的一部分。",
    "projects.workoutLogger.title": "健身记录器",
    "projects.workoutLogger.description":
      "一个用于记录健身的全栈应用。该项目是阿尔托大学全栈课程的一部分。",

    // Contact
    "contact.title": " 联系我",
    "contact.name": "姓名",
    "contact.email": "邮箱",
    "contact.message": "消息",
    "contact.send": "发送消息",

    "skills.ai": "人工智能",

    "skills.agent-systems.title": "智能体系统",
    "skills.prompt-optimization.title": "提示词优化",
    "skills.rag.title": "RAG 检索增强生成",

    "skills.agent-systems.description":
      "具备构建真实智能体系统的经验，包括使用 Inngest AgentKit、Vercel AI SDK 和自定义 MCP 服务器。我设计多工具协作流程、状态化智能体，以及可与真实数据和外部系统交互的规划器–执行器架构。",

    "skills.prompt-optimization.description":
      "熟练使用 DSPy、GEPA 及结构化评估方法优化 LLM 提示词。我构建迭代式优化流水线，通过生成、变异与反馈驱动的提示词更新，提升模型的准确率与稳定性。",

    "skills.rag.description":
      "具备构建 RAG 流水线的实践经验，包括向量嵌入、切分策略、混合检索和重排序。我曾为真实数据开发生产级 RAG 系统，例如使用包含一万条中国景点数据集的旅行规划器。",
  },
} as const;
