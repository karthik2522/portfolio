import { jsPDF } from "jspdf";

export function generateResume() {
  const doc = new jsPDF({ unit: "pt", format: "a4", compress: true });
  const PW = doc.internal.pageSize.getWidth();
  const PH = doc.internal.pageSize.getHeight();
  const ML = 48;
  const MR = 48;
  const usableW = PW - ML - MR;
  const CONTENT_BOTTOM = PH - 42;

  let y = 0;

  const rgb  = (h) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  const fill = (h) => doc.setFillColor(...rgb(h));
  const draw = (h) => doc.setDrawColor(...rgb(h));
  const txt  = (h) => doc.setTextColor(...rgb(h));

  // ── FOOTER (declaration + page number) ──────────────────────────────────
  const drawFooter = () => {
    const p = doc.getNumberOfPages();
    doc.setPage(p);
    draw("#d1d5db");
    doc.setLineWidth(0.4);
    doc.line(ML, PH - 30, PW - MR, PH - 30);
    txt("#9ca3af");
    doc.setFont("helvetica", "italic");
    doc.setFontSize(6.8);
    doc.text(
      "I Karthik Hudedamani hereby declare that the information contained herein is true and correct to the best of my knowledge and belief.",
      PW / 2, PH - 18, { align: "center" }
    );
  };

  const newPage = () => {
    drawFooter();
    doc.addPage();
    y = 46;
  };

  const need = (h) => { if (y + h > CONTENT_BOTTOM) newPage(); };

  // ── SECTION HEADER (ATS-safe: plain text + thin rule) ───────────────────
  const section = (title) => {
    y += 14;
    need(28);
    // Left accent pip
    fill("#7c3aed");
    doc.rect(ML, y - 11, 3, 14, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.8);
    txt("#0f0f1a");
    doc.text(title.toUpperCase(), ML + 10, y);
    draw("#c4b5fd");
    doc.setLineWidth(0.5);
    doc.line(ML + 10 + doc.getTextWidth(title.toUpperCase()) + 6, y - 2, PW - MR, y - 2);
    y += 14;
  };

  const addBullet = (text, indent) => {
    const ind = indent ?? 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    txt("#374151");
    const lines = doc.splitTextToSize("• " + text, usableW - ind - 4);
    need(lines.length * 11 + 2);
    doc.text(lines, ML + ind, y);
    y += lines.length * 11 + 2;
  };

  const labelVal = (label, value) => {
    need(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    txt("#1e1b2e");
    doc.text(label + ":", ML + 8, y);
    const lw = doc.getTextWidth(label + ":");
    doc.setFont("helvetica", "normal");
    txt("#4b5563");
    const lines = doc.splitTextToSize(value, usableW - 10 - lw);
    doc.text(lines, ML + 10 + lw, y);
    y += lines.length * 11 + 3;
  };

  // ═══════════════════════════════════════════════════════════════════════
  // HEADER  — clean white bg, ATS-safe (all text is real selectable text)
  // ═══════════════════════════════════════════════════════════════════════
  // Top accent stripe
  fill("#7c3aed");
  doc.rect(0, 0, PW, 5, "F");

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(27);
  txt("#0f0f1a");
  doc.text("Karthik Hudedamani", ML, 42);

  // Title — "Software Engineer" first for ATS keyword prominence
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  txt("#7c3aed");
  doc.text(
    "Software Engineer  ·  Python Backend Developer  ·  FastAPI  ·  LLM / RAG  ·  PostgreSQL",
    ML, 57
  );

  // Thin divider
  draw("#e0d7fa");
  doc.setLineWidth(0.5);
  doc.line(ML, 63, PW - MR, 63);

  // Contact line 1
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  txt("#4b5563");
  doc.text(
    "karthikkarthik2522@gmail.com   |   +91 7019047085   |   Bangalore, India",
    ML, 74
  );
  // Contact line 2
  doc.text(
    "github.com/karthik2522   |   linkedin.com/in/karthik-hudedamani-6316bb16b   |   karthik2522.github.io/portfolio",
    ML, 86
  );

  y = 106;

  // ═══════════════════════════════════════════════════════════════════════
  // PROFESSIONAL SUMMARY
  // ═══════════════════════════════════════════════════════════════════════
  section("Professional Summary");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  txt("#374151");
  const sum = doc.splitTextToSize(
    "Results-driven Software Engineer with 4+ years of experience designing and delivering scalable backend systems, RESTful APIs, and real-time data pipelines. Proficient in Python, FastAPI, PostgreSQL, and cloud platforms (AWS / Azure). Proven track record of achieving 90–100% improvements in data accuracy and system reliability across healthcare, industrial IoT, and regulatory-compliance domains. Experienced in Agile/Scrum methodologies, CI/CD pipelines, version control (Git), and cross-functional stakeholder collaboration.",
    usableW
  );
  need(sum.length * 11 + 8);
  doc.text(sum, ML, y);
  y += sum.length * 11 + 10;

  // ═══════════════════════════════════════════════════════════════════════
  // TECHNICAL SKILLS  — keyword-rich for ATS parsing
  // ═══════════════════════════════════════════════════════════════════════
  section("Technical Skills");
  labelVal("Languages",            "Python, JavaScript, Java, SQL");
  labelVal("Frameworks & APIs",    "FastAPI, REST API, HL7 v2.x / v3.x, JSP, JSON");
  labelVal("Databases",            "PostgreSQL, MySQL, MSSQL, Oracle Database, MongoDB");
  labelVal("Cloud & DevOps",       "AWS, Azure, Git, CI/CD Pipelines, Docker, Deployment Automation");
  labelVal("Tools & Platforms",    "Mirth Engine, Apache Server, VS Code, PyCharm, Figma, Jira, E-hub");
  labelVal("Methodologies",        "Agile / Scrum, OOP, Microservices, Data Pipelines, Root Cause Analysis");
  labelVal("Operating Systems",    "Windows, Linux");
  labelVal("Soft Skills",          "Problem Solving, Leadership, Analytical Thinking, Cross-functional Collaboration");
  y += 4;

  // ═══════════════════════════════════════════════════════════════════════
  // PROFESSIONAL EXPERIENCE
  // ═══════════════════════════════════════════════════════════════════════
  section("Professional Experience");
  const jobs = [
    {
      company:  "Rockwell Automation",
      role:     "Software Engineer I",
      period:   "2024 – Present",
      location: "Bangalore, India",
      bullets: [
        "Designed, developed, and maintained scalable Python / FastAPI backend applications, improving overall system throughput by 30%.",
        "Identified and resolved 50+ complex production defects through systematic root cause analysis, increasing uptime and system stability.",
        "Built and optimized automated data pipelines achieving 95–100% data accuracy across real-time industrial monitoring dashboards.",
        "Collaborated with product, QA, and DevOps teams in Agile/Scrum sprints to deliver features on schedule with high code quality.",
        "Maintained clean version-control practices using Git; contributed to CI/CD pipeline enhancements and deployment automation.",
        "Integrated PostgreSQL, MySQL, and NoSQL databases with REST API layers for robust, high-performance backend data access.",
        "Supported system monitoring, alerting, and cloud infrastructure management on AWS and Azure environments.",
      ],
    },
    {
      company:  "eClinicalWorks India Private Limited",
      role:     "Technical Specialist – Healthcare Integration",
      period:   "2022 – 2024",
      location: "Bangalore, India",
      bullets: [
        "Designed and developed HIPAA-compliant healthcare data interfaces using HL7 v2.x / v3.x standards for EMR / EHR interoperability.",
        "Integrated clinical systems with third-party healthcare platforms using Mirth Engine, Java, SQL, XML, and Apache Server.",
        "Translated complex business requirements into precise interface specifications, reducing integration errors by 40%.",
        "Provided Tier-2/3 technical support for interface engines, maintaining 99%+ uptime for critical clinical data flows.",
        "Collaborated across engineering, QA, and client teams to diagnose and resolve data interoperability issues.",
      ],
    },
  ];
  for (const job of jobs) {
    need(52);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    txt("#0f0f1a");
    doc.text(job.company, ML, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    txt("#6b7280");
    doc.text(job.period, PW - MR, y, { align: "right" });
    y += 13;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    txt("#7c3aed");
    doc.text(job.role, ML, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    txt("#9ca3af");
    doc.text(job.location, PW - MR, y, { align: "right" });
    y += 14;
    for (const b of job.bullets) addBullet(b);
    y += 8;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // KEY ACHIEVEMENTS
  // ═══════════════════════════════════════════════════════════════════════
  section("Key Achievements");
  addBullet("Improved industrial dashboard data-monitoring accuracy by 90% for FTDM at Rockwell Automation, drastically reducing manual intervention and operational delays.");
  addBullet("Delivered 95–100% data accuracy on Python / FastAPI real-time pipelines powering production monitoring for enterprise clients.");
  addBullet("Reduced healthcare interface integration errors by 40% at eClinicalWorks through structured HL7 specification analysis and rigorous testing.");
  y += 4;

  // ═══════════════════════════════════════════════════════════════════════
  // PROJECTS
  // ═══════════════════════════════════════════════════════════════════════
  section("Projects");
  const projects = [
    {
      title: "FTDM – FactoryTalk Data Mosaix",
      tags:  "Python  |  FastAPI  |  PostgreSQL  |  AWS  |  Real-time Dashboards",
      desc:  "Built interactive dashboards for industrial clients to visualize and analyze real-time process and production data streams. Achieved 90% improvement in data-monitoring accuracy, minimizing manual intervention and operational delays across manufacturing facilities.",
    },
    {
      title: "CPCB – Central Pollution Control Board",
      tags:  "Python  |  FastAPI  |  PostgreSQL  |  Regulatory Compliance  |  Monitoring",
      desc:  "Contributed to a real-time environmental data monitoring system ensuring compliance with CPCB regulations for the Government of India. Delivered bug fixes, system enhancements, and new features guaranteeing accurate regulatory reporting.",
    },
    {
      title: "Clinical Integration Platform",
      tags:  "HL7 v2.x/v3.x  |  Java  |  Mirth Engine  |  EMR  |  EHR",
      desc:  "Integrated multiple third-party vendor systems with eClinicalWorks (eCW) EMR product. Designed and maintained interoperability modules, improving clinical workflow efficiency and patient data exchange accuracy across healthcare networks.",
    },
  ];
  for (const p of projects) {
    need(55);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    txt("#0f0f1a");
    doc.text(p.title, ML, y);
    y += 12;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    txt("#7c3aed");
    doc.text(p.tags, ML + 8, y);
    y += 12;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    txt("#374151");
    const lines = doc.splitTextToSize(p.desc, usableW - 8);
    need(lines.length * 11 + 4);
    doc.text(lines, ML + 8, y);
    y += lines.length * 11 + 10;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // HACKATHON PROJECTS
  // ═══════════════════════════════════════════════════════════════════════
  section("Hackathon Projects");
  need(72);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  txt("#0f0f1a");
  doc.text("Employ Chain", ML, y);
  const titleW = doc.getTextWidth("Employ Chain");
  // Badge pill
  fill("#fef3c7");
  doc.roundedRect(ML + titleW + 8, y - 9, 82, 12, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  txt("#b45309");
  doc.text("HACK-A-SOL 2.0", ML + titleW + 13, y - 1);
  y += 12;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  txt("#7c3aed");
  doc.text("devfolio.co/projects/employ-chain-d850", ML + 8, y);
  y += 12;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  txt("#6d28d9");
  doc.text("Blockchain  |  NodeJS  |  ReactJS  |  Web3  |  Smart Contracts  |  NFT  |  Solidity", ML + 8, y);
  y += 12;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  txt("#374151");
  const hackLines = doc.splitTextToSize(
    "A Decentralized Employment & Verification System leveraging Blockchain technology. Verifies criminal background, work history, and educational qualifications, issuing NFTs as Proof of Employment — reducing months of manual verification to just hours.",
    usableW - 8
  );
  need(hackLines.length * 11 + 4);
  doc.text(hackLines, ML + 8, y);
  y += hackLines.length * 11 + 10;

  // ═══════════════════════════════════════════════════════════════════════
  // EDUCATION
  // ═══════════════════════════════════════════════════════════════════════
  section("Education");
  need(42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  txt("#0f0f1a");
  doc.text("K S Institute of Technology", ML, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  txt("#6b7280");
  doc.text("Bangalore, India", PW - MR, y, { align: "right" });
  y += 13;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  txt("#374151");
  doc.text("Bachelor of Engineering – Computer Science  (B.E. – CSE)", ML, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  txt("#9ca3af");
  doc.text("2018 – 2022", PW - MR, y, { align: "right" });
  y += 16;

  // ═══════════════════════════════════════════════════════════════════════
  // CERTIFICATIONS
  // ═══════════════════════════════════════════════════════════════════════
  section("Certifications");
  const certs = [
    "Complete Prompt Engineering Bootcamp 2026 – Udemy",
    "DevOps Fundamentals – Simplilearn",
    "Google Cloud Platform – Skills Badges",
    "Python 101 for Data Science – IBM Cognitive Classes",
    "SQL Advanced – HackerRank",
    "REST API – HackerRank",
    "Java Beginners to Advanced – Udemy",
    "Python Beginners to Advanced – Udemy",
  ];
  for (const c of certs) addBullet(c);

  drawFooter();
  doc.save("Karthik_Hudedamani_Resume.pdf");
}