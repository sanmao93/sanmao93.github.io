const notes = [
    {
        id: "java-notes",
        icon: "☕",
        title: "Java八股文",
        desc: "Java八股文学习",
        url: "https://www.notion.so/Java-9b5121967c564826916ae7a1b77ade4a",
        date: "2023-10-21",
        tags: ["Java", "编程"]
    },
    {
        id: "coolsites",
        icon: "🌐",
        title: "酷站",
        desc: "一些酷站",
        url: "https://www.notion.so/2cb5245d192f80898c3ed8f428a4b886",
        date: "2025-6-5",
        tags: ["收藏", "网站"]
    },
    {
        id: "notebooklm",
        icon: "🎙️",
        title: "NotebookLM",
        desc: "NotebookLM 使用笔记",
        url: "https://www.notion.so/NotebookLM-8-988a62fd1fdd44018eddbaf644a0403f",
        date: "2025-11-27",
        tags: ["AI", "工具"]
    },
    {
        id: "devbox",
        icon: "📦",
        title: "DevBox",
        desc: "DevBox 开发环境管理工具",
        url: "https://www.notion.so/DevBox-2ce5245d192f80e68a46df7f7e5fc068",
        date: "2024-08-20",
        tags: ["工具", "开发环境"]
    },
    {
        id: "glance",
        icon: "👀",
        title: "Glance面板配置",
        desc: "Glance 学习笔记",
        url: "https://www.notion.so/Glance-2d75245d192f80d8a72ce5d38dc251c0",
        date: "2025-12-29",
        tags: ["工具"]
    },
    {
        id: "nezha",
        icon: "🔱",
        title: "哪吒面板",
        desc: "猫爪云部署哪吒面板",
        url: "https://www.notion.so/2cb5245d192f8057b930c1cd10377c16",
        date: "2025-11-08",
        tags: ["工具", "运维"]
    },
    {
        id: "postgresql",
        icon: "🐘",
        title: "PostgreSQL",
        desc: "PostgreSQL 数据库学习笔记",
        url: "https://www.notion.so/PostgreSQL-8af8d5c405a4491b8cc0e17abe96dc32",
        date: "2025-12-22",
        tags: ["数据库", "SQL", "Postgresql"]
    },
    {
        id: "claude-code",
        icon: "🤖",
        title: "Claude Code",
        desc: "Claude Code 使用笔记",
        url: "https://www.notion.so/Claude-Code-2ce5245d192f80e8a072cc2b341ef1a5",
        date: "2025-02-03",
        tags: ["AI", "工具"]
    },
    {
        id: "message-queues",
        icon: "📨",
        title: "Message Queues",
        desc: "消息队列学习笔记",
        url: "https://www.notion.so/Message-Queues-51fb8891be734d7880e92a1263219b4b",
        date: "2025-01-02",
        tags: ["中间件", "架构"]
    },
    {
        id: "aws-rds",
        icon: "☁️",
        title: "AWS RDS",
        desc: "AWS RDS 数据库服务",
        url: "https://www.notion.so/AWS-RDS-2c75245d192f8093aa3bf64d13c42a5a",
        date: "2025-06-08",
        tags: ["AWS", "数据库"]
    },
    {
        id: "spring-debugger",
        icon: "🐛",
        title: "Spring Debugger",
        desc: "Spring 调试技巧",
        url: "https://www.notion.so/Spring-Debugger-2395245d192f803b844ce6745872bd5d",
        date: "2025-06-20",
        tags: ["Java", "Spring"]
    },
    {
        id: "vscode-jdk",
        icon: "💻",
        title: "Vscode JDK",
        desc: "VSCode 配置 JDK 开发环境",
        url: "https://www.notion.so/Vscode-JDK-2ce5245d192f80d9bc5bf3543254cbad",
        date: "2025-06-07",
        tags: ["工具", "Java"]
    },
    {
        id: "kotlin",
        icon: "🎯",
        title: "Kotlin",
        desc: "Kotlin 学习笔记",
        url: "https://www.notion.so/Kotlin-841a2eea6e004e2480b87f0cb089b185",
        date: "2025-05-03",
        tags: ["Kotlin", "编程"]
    },
    {
        id: "java-notebook",
        icon: "📓",
        title: "Java Notebook",
        desc: "Java 学习笔记本",
        url: "https://www.notion.so/Java-Notebook-2ce5245d192f80d18b10e9efad1dbdea",
        date: "2025-09-03",
        tags: ["Java", "编程"]
    },
    {
        id: "devops",
        icon: "⚙️",
        title: "DevOps",
        desc: "DevOps 实践笔记",
        url: "https://www.notion.so/DevOps-140cfa28ae5548adaa5a80db6b30618e",
        date: "2025-09-01",
        tags: ["运维", "DevOps"]
    },
    {
        id: "mcp",
        icon: "🔌",
        title: "MCP",
        desc: "MCP 协议学习笔记",
        url: "https://www.notion.so/MCP-2555245d192f808c8992dd93afcd69be",
        date: "2025-08-08",
        tags: ["AI", "协议"]
    },
    {
        id: "ssh-pro",
        icon: "🔑",
        title: "SSH Pro",
        desc: "SSH 进阶使用技巧",
        url: "https://www.notion.so/SSH-Pro-e69f7201d6c14e19958cafc11c735c1b",
        date: "2025-08-02",
        tags: ["linux", "工具"]
    },
    {
        id: "rwlock",
        icon: "🔐",
        title: "理解读写锁",
        desc: "并发编程中的读写锁机制",
        url: "https://www.notion.so/a2f0f3bd17aa42049e59e8b1a70ae447",
        date: "2025-12-20",
        tags: ["并发", "编程", "Java"]
    },
    {
        id: "hashmap",
        icon: "🗺️",
        title: "HashMap",
        desc: "HashMap 数据结构学习笔记",
        url: "https://www.notion.so/HashMap-68516209c81c4432b8106107b866838c",
        date: "2024-11-30",
        tags: ["数据结构", "Java"]
    },
    {
        id: "btree",
        icon: "🌳",
        title: "B树B+树",
        desc: "B树及其变体：B+树与B*树",
        url: "https://www.notion.so/B-B-B-d3833d09dcfa4d7e9aaf8fb2eac35cfa",
        date: "2024-11-23",
        tags: ["数据结构"]
    },
    {
        id: "java-strategy",
        icon: "♟️",
        title: "Java策略模式",
        desc: "策略模式使用",
        url: "https://www.notion.so/22b5245d192f80e18071c3d9509e3d41",
        date: "2024-08-28",
        tags: ["Java", "设计模式"]
    },
    {
        id: "tmp",
        icon: "📝",
        title: "善用临时目录",
        desc: "临时目录",
        url: "https://www.notion.so/tmp-2d75245d192f816f9c43c0b96fd9790e",
        date: "2024-10-31",
        tags: ["tmp", "linux"]
    },
    {
        id: "freedom",
        icon: "🕊️",
        title: "自由",
        desc: "关于自由",
        url: "https://www.notion.so/2325245d192f806d8ffff84bd91c4d2c",
        date: "2023-08-20",
        tags: ["随笔"]
    },
    {
        id: "linux-tip",
        icon: "🐧",
        title: "Linux Tip",
        desc: "Linux 使用技巧",
        url: "https://www.notion.so/Linux-Tip-22b5245d192f80ec8173ff9bfa8aa9c7",
        date: "2023-08-06",
        tags: ["linux", "技巧"]
    },
    {
        id: "mac",
        icon: "🍎",
        title: "Mac",
        desc: "Mac 使用笔记",
        url: "https://www.notion.so/Mac-22b5245d192f80509b40e347b17b6733",
        date: "2024-01-08",
        tags: ["Mac", "技巧"]
    },
    {
        id: "shadowrocket",
        icon: "🚀",
        title: "小火箭",
        desc: "代理设置",
        url: "https://www.notion.so/2d25245d192f8099aad6cee129837441",
        date: "2023-11-20",
        tags: ["工具", "代理"]
    },
    {
        id: "arraylist-linkedlist",
        icon: "📋",
        title: "ArrayList vs LinkedList",
        desc: "ArrayList 与 LinkedList 对比",
        url: "https://www.notion.so/ArrayList-vs-LinkedList-5912785ca93b40aaa98d6a8253e117d4",
        date: "2022-10-11",
        tags: ["数据结构", "Java"]
    },
    {
        id: "spring-boot",
        icon: "🍃",
        title: "Spring Boot",
        desc: "Spring Boot 学习笔记",
        url: "https://www.notion.so/Spring-Boot-07754ab814a24a91966d2050b34143bc",
        date: "2022-10-01",
        tags: ["Java", "Spring"]
    },
    {
        id: "threadlocal",
        icon: "🧵",
        title: "ThreadLocal",
        desc: "ThreadLocal 线程本地变量",
        url: "https://www.notion.so/ThreadLocal-22b5245d192f80c09358c43aeaa70f0e",
        date: "2022-06-07",
        tags: ["Java", "并发"]
    }
];
