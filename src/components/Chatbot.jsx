import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';

// ── Groq / Llama-3 integration ─────────────────────────────────────────────────
// API key lives ONLY in Vercel env vars (server-side). Never exposed in bundle.
const AI_API_ENDPOINT = '/api/chat';

const SYSTEM_PROMPT = `You are a smart, friendly AI assistant embedded in Karthik Hudedamani's personal portfolio website. Your job is to answer questions about Karthik accurately and helpfully. Always speak in third person about Karthik. Keep answers concise (3–6 sentences max) unless asked for detail. Use a professional yet warm tone.

=== ABOUT KARTHIK HUDEDAMANI ===
Full Name: Karthik Hudedamani
Title: Software Engineer | Python Backend Developer
Location: Bangalore, India
Email: karthikkarthik2522@gmail.com
Phone: +91 7019047085
GitHub: github.com/karthik2522
LinkedIn: linkedin.com/in/karthik-hudedamani-6316bb16b
Portfolio: karthik2522.github.io/portfolio

=== PROFESSIONAL SUMMARY ===
Results-driven Software Engineer with 4+ years of experience designing and delivering scalable backend systems, RESTful APIs, and real-time data pipelines. Proficient in Python, FastAPI, PostgreSQL, and cloud platforms (AWS/Azure). Proven track record of achieving 90–100% improvements in data accuracy and system reliability across healthcare, industrial IoT, and regulatory-compliance domains. Experienced in Agile/Scrum, CI/CD pipelines, version control (Git), and cross-functional collaboration.

=== WORK EXPERIENCE ===
1. Rockwell Automation — Software Engineer I (2024 – Present, Bangalore)
   - Designed and maintained scalable Python/FastAPI backend applications, improving throughput by 30%
   - Resolved 50+ complex production bugs through root cause analysis
   - Built automated data pipelines achieving 95–100% data accuracy on industrial dashboards
   - Worked with PostgreSQL, MySQL, NoSQL databases and REST APIs
   - AWS/Azure cloud infrastructure, CI/CD pipeline improvements
   - Agile/Scrum methodology

2. eClinicalWorks India Pvt Ltd — Technical Specialist, Healthcare Integration (2022 – 2024, Bangalore)
   - Designed HIPAA-compliant healthcare interfaces using HL7 v2.x/v3.x for EMR/EHR interoperability
   - Integrated clinical systems using Mirth Engine, Java, SQL, XML, Apache Server
   - Reduced integration errors by 40% through structured specification analysis
   - Maintained 99%+ uptime for critical clinical data flows

=== TECHNICAL SKILLS ===
Languages: Python, JavaScript, Java, SQL
Frameworks & APIs: FastAPI, REST API, HL7 v2.x/v3.x, JSP, JSON
Databases: PostgreSQL, MySQL, MSSQL, Oracle Database, MongoDB
Cloud & DevOps: AWS, Azure, Git, CI/CD, Docker, Deployment Automation
Tools: Mirth Engine, Apache Server, VS Code, PyCharm, Figma, Jira
Methodologies: Agile/Scrum, OOP, Microservices, Data Pipelines, Root Cause Analysis
AI/ML: LLMs, RAG (Retrieval-Augmented Generation), Prompt Engineering

=== PROJECTS ===
1. FTDM – FactoryTalk Data Mosaix (Rockwell Automation)
   Stack: Python, FastAPI, PostgreSQL, AWS, Dashboards
   Built interactive real-time industrial dashboards. Improved data monitoring accuracy by 90%.

2. CPCB – Central Pollution Control Board
   Stack: Python, FastAPI, PostgreSQL, Regulatory Compliance
   Real-time environmental monitoring system for the Government of India ensuring CPCB compliance.

3. Clinical Integration Platform (eClinicalWorks)
   Stack: HL7 v2/v3, Java, Mirth Engine, EMR/EHR
   Integrated multiple vendor systems with eClinicalWorks EMR for improved clinical workflows.

4. Employ Chain (Hackathon: HACK-A-SOL 2.0)
   Stack: Blockchain, NodeJS, ReactJS, Web3, Solidity, Smart Contracts, NFT
   Decentralized employment verification system — issues NFT as Proof of Employment. Reduces verification from months to hours.
   Link: devfolio.co/projects/employ-chain-d850

=== KEY ACHIEVEMENTS ===
- 90% improvement in industrial data-monitoring accuracy (FTDM, Rockwell Automation)
- 95–100% data accuracy on Python/FastAPI real-time pipelines
- 40% reduction in healthcare interface integration errors (eClinicalWorks)
- Maintained 99%+ uptime for critical clinical data flows
- Hackathon finalist – HACK-A-SOL 2.0

=== EDUCATION ===
K S Institute of Technology, Bangalore
Bachelor of Engineering – Computer Science (B.E. – CSE), 2018–2022

=== CERTIFICATIONS ===
- Complete Prompt Engineering Bootcamp 2026 – Udemy
- DevOps Fundamentals – Simplilearn
- Google Cloud Platform – Skills Badges
- Python 101 for Data Science – IBM Cognitive Classes
- SQL Advanced – HackerRank
- REST API – HackerRank
- Java & Python Beginners to Advanced – Udemy

If the user asks something outside the scope of Karthik's profile (e.g. general coding questions), briefly answer but always tie back to Karthik's relevant skills or experience. Never make up information not listed above.

IMPORTANT: When sharing any link or email, ALWAYS use markdown format: [label](url) or [email](mailto:email). Never write bare URLs.

Official links:
- Email: [karthikkarthik2522@gmail.com](mailto:karthikkarthik2522@gmail.com)
- LinkedIn: [linkedin.com/in/karthik-hudedamani-6316bb16b](https://www.linkedin.com/in/karthik-hudedamani-6316bb16b)
- GitHub: [github.com/karthik2522](https://github.com/karthik2522)
- Portfolio: [karthik2522.github.io/portfolio](https://karthik2522.github.io/portfolio)
- Employ Chain project: [devfolio.co/projects/employ-chain-d850](https://devfolio.co/projects/employ-chain-d850)`;

// ── Local fallback knowledge base (used when no API key is set) ───────────────
const KB = [
  {
    patterns: ['hi', 'hello', 'hey', 'howdy', 'sup', 'good morning', 'good evening'],
    response: "Hey there! 👋 I'm Karthik's AI assistant. Ask me anything about his skills, experience, projects, or how to get in touch!",
  },
  {
    patterns: ['who are you', 'what are you', 'about you', 'introduce'],
    response: "I'm a virtual assistant built for Karthik Hudedamani's portfolio. I can tell you about his skills, work experience, projects, education, and contact info. What would you like to know?",
  },
  {
    patterns: ['who is karthik', 'about karthik', 'tell me about', 'introduce karthik'],
    response: "Karthik Hudedamani is a Software Engineer with 4+ years of experience in Python backend development, FastAPI, LLMs, RAG pipelines, and PostgreSQL. He has worked at Rockwell Automation and eClinicalWorks, delivering high-performance systems across healthcare, industrial IoT, and regulatory-compliance domains.",
  },
  {
    patterns: ['skill', 'tech', 'stack', 'language', 'framework', 'know', 'expertise'],
    response: "Karthik's core tech stack:\n\n🐍 **Languages:** Python, JavaScript, Java, SQL\n⚡ **Frameworks:** FastAPI, REST API, HL7 v2/v3\n🗄️ **Databases:** PostgreSQL, MySQL, MongoDB, MSSQL\n☁️ **Cloud/DevOps:** AWS, Azure, Git, CI/CD, Docker\n🔧 **Tools:** Mirth Engine, Apache Server, Figma, Jira\n🏗️ **Methods:** Agile/Scrum, Microservices, Data Pipelines",
  },
  {
    patterns: ['experience', 'work', 'job', 'company', 'career', 'rockwell', 'eclinical'],
    response: "Karthik's professional journey:\n\n🏢 **Rockwell Automation** (2024 – Present)\nSoftware Engineer I — Python/FastAPI apps, data pipelines, 95–100% data accuracy\n\n🏥 **eClinicalWorks** (2022 – 2024)\nTechnical Specialist — HL7 v2/v3 healthcare integrations, EMR/EHR systems, reduced integration errors by 40%",
  },
  {
    patterns: ['project', 'ftdm', 'cpcb', 'clinical', 'dashboard', 'built', 'created'],
    response: "Notable projects:\n\n📊 **FTDM – FactoryTalk Data Mosaix**\nReal-time industrial dashboards (Python, FastAPI, PostgreSQL, AWS) — 90% better data accuracy\n\n🌿 **CPCB – Pollution Control Board**\nEnvironmental compliance monitoring system for Govt. of India\n\n🏥 **Clinical Integration Platform**\nHL7/EMR interoperability modules for eClinicalWorks\n\n⛓️ **Employ Chain** *(Hackathon – HACK-A-SOL 2.0)*\nBlockchain-based decentralized employment verification with NFT credentials",
  },
  {
    patterns: ['hackathon', 'employ chain', 'blockchain', 'web3', 'nft'],
    response: "Karthik built **Employ Chain** at HACK-A-SOL 2.0 — a decentralized employment & verification system on blockchain. It verifies criminal background, work history, and education, then issues NFTs as Proof of Employment, cutting months of verification down to hours. Stack: Blockchain, NodeJS, ReactJS, Web3, Solidity, Smart Contracts.\n\n🔗 [View on Devfolio](https://devfolio.co/projects/employ-chain-d850)",
  },
  {
    patterns: ['education', 'degree', 'college', 'university', 'study', 'studied'],
    response: "🎓 **K S Institute of Technology**, Bangalore\nBachelor of Engineering – Computer Science (B.E. – CSE)\nGraduation: 2022",
  },
  {
    patterns: ['certification', 'certificate', 'course', 'certified'],
    response: "Karthik's certifications:\n\n📜 Complete Prompt Engineering Bootcamp 2026 – Udemy\n☁️ Google Cloud Platform – Skills Badges\n🐍 Python 101 for Data Science – IBM\n⚙️ DevOps Fundamentals – Simplilearn\n🗄️ SQL Advanced & REST API – HackerRank\n☕ Java Beginners to Advanced – Udemy\n🐍 Python Beginners to Advanced – Udemy",
  },
  {
    patterns: ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'linkedin', 'github'],
    response: "You can reach Karthik through:\n\n📧 [karthikkarthik2522@gmail.com](mailto:karthikkarthik2522@gmail.com)\n📱 +91 7019047085\n💼 [linkedin.com/in/karthik-hudedamani-6316bb16b](https://www.linkedin.com/in/karthik-hudedamani-6316bb16b)\n🐙 [github.com/karthik2522](https://github.com/karthik2522)\n🌐 [karthik2522.github.io/portfolio](https://karthik2522.github.io/portfolio)",
  },
  {
    patterns: ['resume', 'cv', 'download'],
    response: "You can download Karthik's ATS-optimized resume directly from the **Resume** button in the navbar or the Hero section! It's a premium PDF tailored for Software Engineer roles. 📄",
  },
  {
    patterns: ['location', 'where', 'city', 'based', 'bangalore'],
    response: "Karthik is based in **Bangalore, India** 🇮🇳",
  },
  {
    patterns: ['llm', 'ai', 'ml', 'machine learning', 'rag', 'langchain', 'openai'],
    response: "Karthik has hands-on experience with **LLMs and RAG (Retrieval-Augmented Generation)** pipelines — part of his backend specialization at Rockwell Automation. He completed the Complete Prompt Engineering Bootcamp 2026, showcasing his AI/LLM expertise.",
  },
  {
    patterns: ['achievement', 'accomplishment', 'proud', 'impact'],
    response: "Key achievements:\n\n🏆 90% improvement in industrial data-monitoring accuracy (FTDM)\n🎯 95–100% data accuracy on Python/FastAPI real-time pipelines\n🔗 40% reduction in healthcare interface integration errors\n💡 Maintained 99%+ uptime for critical clinical data flows\n🏅 Hackathon finalist – HACK-A-SOL 2.0",
  },
  {
    patterns: ['bye', 'goodbye', 'see you', 'thanks', 'thank you', 'thx'],
    response: "Thanks for stopping by! 😊 Feel free to reach out to Karthik anytime. Have a great day! 🚀",
  },
];

const SUGGESTIONS = [
  "Who is Karthik?",
  "What are his skills?",
  "Work experience",
  "Projects",
  "Contact info",
];

// Local fallback when no API key
function localFallback(input) {
  const lower = input.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.patterns.some((p) => lower.includes(p))) {
      return entry.response;
    }
  }
  return "Hmm, I'm not sure about that! 🤔 Try asking about Karthik's **skills**, **experience**, **projects**, **education**, or **contact info**.";
}

// Call the serverless proxy — the actual Groq API key never touches the browser
async function askLLM(history, userMessage) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text })),
    { role: 'user', content: userMessage },
  ];

  const res = await fetch(AI_API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) throw new Error(`Proxy error: ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.reply;
}

// Parse a line into plain text / **bold** / [label](url) segments
function parseSegments(line) {
  const segments = [];
  const re = /\*\*(.*?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)]+|mailto:[^)]+)\)/g;
  let last = 0, m;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) segments.push({ type: 'text', value: line.slice(last, m.index) });
    if (m[1] !== undefined) segments.push({ type: 'bold', value: m[1] });
    else segments.push({ type: 'link', label: m[2], href: m[3] });
    last = re.lastIndex;
  }
  if (last < line.length) segments.push({ type: 'text', value: line.slice(last) });
  return segments;
}

function FormattedText({ text }) {
  const lines = text.split('\n');
  return (
    <span>
      {lines.map((line, i) => (
        <span key={i}>
          {parseSegments(line).map((seg, j) => {
            if (seg.type === 'bold')
              return <strong key={j} className="font-semibold text-purple-300">{seg.value}</strong>;
            if (seg.type === 'link')
              return (
                <a key={j} href={seg.href}
                  target={seg.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="text-purple-400 underline underline-offset-2 hover:text-purple-300 transition-colors break-all">
                  {seg.label}
                </a>
              );
            return <span key={j}>{seg.value}</span>;
          })}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}

// AI is always attempted; falls back to local KB on proxy failure
const AI_ENABLED = true;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: AI_ENABLED
        ? "Hi! 👋 I'm Karthik's AI assistant powered by **Llama 3.1**. Ask me anything about him!"
        : "Hi! 👋 I'm Karthik's assistant. Ask me about his skills, experience, projects, or contact info!",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || typing) return;
    setInput('');
    setError(null);

    const userMsg = { id: Date.now(), from: 'user', text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    try {
      let reply;
      if (AI_ENABLED) {
        reply = await askLLM(historyRef.current, msg);
      } else {
        await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
        reply = localFallback(msg);
      }
      historyRef.current = [
        ...historyRef.current,
        { from: 'user', text: msg },
        { from: 'bot', text: reply },
      ].slice(-16); // keep last 8 exchanges
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
      setError('AI is temporarily unavailable. Switching to local mode.');
      const reply = localFallback(msg);
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'bot', text: reply }]);
    } finally {
      setTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 shadow-lg shadow-purple-900/50 flex items-center justify-center text-white hover:scale-110 transition-transform"
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle chatbot"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FiX size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FiMessageSquare size={22} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping pointer-events-none" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/60 border border-purple-800/30"
            style={{ maxHeight: '75vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1e1b2e] to-[#2d1f4e] px-4 py-3 flex items-center gap-3 border-b border-purple-800/30">
              <div className="w-9 h-9 rounded-full bg-purple-600/30 flex items-center justify-center flex-shrink-0">
                <RiRobot2Line size={20} className="text-purple-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white flex items-center gap-2">
                  Karthik's Assistant
                  {AI_ENABLED && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-700/60 text-purple-200 font-medium border border-purple-600/40">
                      Llama 3.1
                    </span>
                  )}
                </p>
                <p className="text-xs text-purple-400 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
                  {AI_ENABLED ? 'AI-powered · Open Source LLM' : 'Online'}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-[#0f0c1a] px-3 py-4 space-y-3" style={{ minHeight: 0 }}>
              {/* Error banner */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-amber-300 bg-amber-900/20 border border-amber-700/30 rounded-lg px-3 py-2 flex items-center gap-2"
                  >
                    <span>⚠️</span> {error}
                  </motion.div>
                )}
              </AnimatePresence>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.from === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-purple-700/40 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <RiRobot2Line size={13} className="text-purple-300" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-purple-600 text-white rounded-br-sm'
                        : 'bg-[#1e1b2e] text-gray-200 border border-purple-900/40 rounded-bl-sm'
                    }`}
                  >
                    <FormattedText text={m.text} />
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-700/40 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <RiRobot2Line size={13} className="text-purple-300" />
                  </div>
                  <div className="bg-[#1e1b2e] border border-purple-900/40 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestion chips */}
            {messages.length <= 2 && (
              <div className="bg-[#0f0c1a] px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-2.5 py-1 rounded-full border border-purple-700/50 text-purple-300 hover:bg-purple-700/20 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div className="bg-[#1a1525] border-t border-purple-900/30 px-3 py-3 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything…"
                className="flex-1 bg-[#0f0c1a] border border-purple-800/40 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-colors"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-purple-600 disabled:opacity-40 hover:bg-purple-500 transition-colors flex items-center justify-center flex-shrink-0"
              >
                <FiSend size={15} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
