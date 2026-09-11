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
} as const;
