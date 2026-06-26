import { jsPDF } from "jspdf";

export function generateResume() {
  const doc = new jsPDF({ unit: "pt", format: "a4", compress: true });
  const PW = doc.internal.pageSize.getWidth();
  const PH = doc.internal.pageSize.getHeight();
  const ML = 45;
  const MR = 45;
  const usableW = PW - ML - MR;
  const CONTENT_BOTTOM = PH - 38;

  let y = 0;

  const rgb = (h) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  const fill  = (h) => doc.setFillColor(...rgb(h));
  const draw  = (h) => doc.setDrawColor(...rgb(h));
  const txt   = (h) => doc.setTextColor(...rgb(h));

  const drawFooter = () => {
    const p = doc.getNumberOfPages();
    doc.setPage(p);
    txt("#9ca3af");
    doc.setFont("helvetica","italic");
    doc.setFontSize(7);
    doc.text("I Karthik Hudedamani hereby declare that the information contained herein is true and correct to the best of my knowledge and belief.", PW/2, PH-12, { align:"center" });
  };

  const newPage = () => {
    drawFooter();
    doc.addPage();
    fill("#7c3aed");
    doc.rect(0, 0, 4, PH, "F");
    y = 50;
  };

  const need = (h) => { if (y + h > CONTENT_BOTTOM) newPage(); };

  const section = (title) => {
    y += 8;
    need(26);
    doc.setFont("helvetica","bold");
    doc.setFontSize(9.5);
    txt("#7c3aed");
    doc.text(title.toUpperCase(), ML, y);
    draw("#7c3aed");
    doc.setLineWidth(0.6);
    doc.line(ML, y+3, PW-MR, y+3);
    y += 16;
  };

  const addBullet = (text, indent) => {
    const ind = indent || 8;
    doc.setFont("helvetica","normal");
    doc.setFontSize(8.5);
    txt("#374151");
    const lines = doc.splitTextToSize("• "+text, usableW - ind);
    need(lines.length * 11 + 2);
    doc.text(lines, ML + ind, y);
    y += lines.length * 11 + 2;
  };

  const labelVal = (label, value) => {
    need(14);
    doc.setFont("helvetica","bold");
    doc.setFontSize(8.5);
    txt("#374151");
    doc.text(label+": ", ML+8, y);
    const lw = doc.getTextWidth(label+": ");
    doc.setFont("helvetica","normal");
    txt("#4b5563");
    const lines = doc.splitTextToSize(value, usableW - 8 - lw);
    doc.text(lines, ML+8+lw, y);
    y += lines.length * 11 + 3;
  };

  // HEADER
  fill("#1e1b2e");
  doc.rect(0, 0, PW, 112, "F");
  fill("#7c3aed");
  doc.rect(0, 0, 4, 112, "F");
  doc.setFont("helvetica","bold");
  doc.setFontSize(22);
  txt("#ffffff");
  doc.text("Karthik Hudedamani", ML+8, 36);
  doc.setFont("helvetica","normal");
  doc.setFontSize(9);
  txt("#a78bfa");
  doc.text("Python Backend Developer  |  FastAPI  |  LLM  | RAG | PostgreSQL ", ML+8, 52);
  doc.setFontSize(7.8);
  txt("#cbd5e1");
  doc.text("karthikkarthik2522@gmail.com   |   +91 7019047085   |   Bangalore, India", ML+8, 67);
  doc.text("github.com/karthik2522   |   linkedin.com/in/karthik-hudedamani-6316bb16b", ML+8, 81);
  txt("#a78bfa");
  doc.text("Portfolio: karthik2522.github.io/portfolio", ML+8, 95);
  y = 128;

  // SUMMARY
  section("Summary");
  doc.setFont("helvetica","normal");
  doc.setFontSize(8.5);
  txt("#374151");
  const sum = doc.splitTextToSize("Results-driven Software Engineer with 4+ years of experience in application development, bug fixing, and system enhancements across healthcare, industrial, and environmental compliance domains. Skilled in designing interfaces, developing real-time monitoring systems, and building interactive dashboards that improve data quality, system reliability, and operational efficiency.", usableW);
  need(sum.length*11+8);
  doc.text(sum, ML, y);
  y += sum.length*11+10;

  // EXPERIENCE
  section("Experience");
  const jobs = [
    { company:"Rockwell Automation", role:"Software Engineer 1", period:"2024 – Present", bullets:["Designed, developed, and maintained scalable Python applications with a focus on performance and reliability.","Analysed, debugged, and resolved complex software issues to improve system stability and user experience.","Implemented code enhancements, feature upgrades, and process automation to optimize application functionality.","Collaborated with cross-functional teams to gather requirements, perform root cause analysis, and deliver effective solutions.","Utilized best practices in version control (Git) to ensure high-quality deliverables.","Worked with databases (PostgreSQL/MySQL/NoSQL) and APIs for seamless backend integration.","Contributed to continuous improvement of development workflows, deployment pipelines, and system monitoring."] },
    { company:"eClinicalworks India Private Limited", role:"Technical Specialist", period:"2022 – 2024", bullets:["Designed, developed, and tested healthcare interfaces using HL7 standards and messaging protocols.","Analysed business requirements and identified interface specifications to ensure accurate data exchange between systems.","Experience in integrating EMR systems with various healthcare applications and platforms using HL7 standards.","Developed and maintained complex interfaces using Java, SQL, HL7, JSP, Apache server and XML, such as Mirth tool, EMR, EHR and E-hub.","Provided technical support and troubleshooting for interface engines, resolving issues to ensure uninterrupted data flow.","Collaborated with cross-functional teams to troubleshoot and resolve interface issues."] },
  ];
  for (const job of jobs) {
    need(50);
    doc.setFont("helvetica","bold");
    doc.setFontSize(10);
    txt("#1e1b2e");
    doc.text(job.company, ML, y);
    doc.setFont("helvetica","normal");
    doc.setFontSize(8.5);
    txt("#6b7280");
    doc.text(job.period, PW-MR, y, { align:"right" });
    y += 13;
    doc.setFont("helvetica","italic");
    doc.setFontSize(9);
    txt("#7c3aed");
    doc.text(job.role, ML, y);
    y += 14;
    for (const b of job.bullets) addBullet(b);
    y += 8;
  }

  // ACHIEVEMENTS
  section("Achievements");
  addBullet("Strong expertise in Python, FastAPI, REST APIs, PostgreSQL, and data pipelines, delivering 95-100% data accuracy and improved system performance through efficient development and testing practices.");
  addBullet("For FTDM: Enhanced data monitoring accuracy by 90%, minimizing manual intervention and operational delays.");
  y += 6;

  // SKILLS
  section("Skills");
  labelVal("Languages & Frameworks", "Python, JavaScript, FastAPI, REST API, HL7 v2.x / v3.x, JSON");
  labelVal("Databases", "PostgreSQL, MySQL, MSSQL, Oracle Database, MongoDB");
  labelVal("Cloud & DevOps", "AWS, Azure, Git (Version Control), DevOps, Deployment Pipelines");
  labelVal("Tools & Platforms", "Mirth Engine, E-hub, Figma, VS Code, PyCharm, Apache Server, RCM");
  labelVal("Operating Systems", "Windows, Linux, iOS");
  labelVal("Soft Skills", "Problem Solving, Leadership & Communication, Analytical Thinking, Troubleshooting");
  y += 6;

  // PROJECTS
  section("Projects");
  const projects = [
    { title:"Clinical Integration", tags:"HL7  |  Java  |  Mirth Engine  |  EMR", desc:"Integrated multiple vendor systems with eClinicalWorks (eCW) product. Designed and maintained interoperability modules, improving clinical workflow efficiency and patient data exchange." },
    { title:"FTDM – FactoryTalk Data Mosaix", tags:"Python  |  FastAPI  |  PostgreSQL  |  AWS  |  Dashboards", desc:"Developed interactive dashboards for industries to visualize, monitor, and analyze real-time process and production data. Enhanced data monitoring accuracy by 90%, minimizing manual intervention and operational delays." },
    { title:"CPCB – Central Pollution Control Board", tags:"Python  |  REST APIs  |  PostgreSQL  |  Regulatory Tech  |  Monitoring", desc:"Contributed to a real-time environmental data monitoring system ensuring compliance with CPCB regulations for the central Govt. of India. Handled bug fixing, system enhancements, and feature improvements ensuring accurate regulatory reporting." },
  ];
  for (const p of projects) {
    need(55);
    doc.setFont("helvetica","bold");
    doc.setFontSize(9.5);
    txt("#1e1b2e");
    doc.text(p.title, ML, y);
    y += 12;
    doc.setFont("helvetica","italic");
    doc.setFontSize(8);
    txt("#7c3aed");
    doc.text(p.tags, ML+8, y);
    y += 12;
    doc.setFont("helvetica","normal");
    doc.setFontSize(8.5);
    txt("#374151");
    const lines = doc.splitTextToSize(p.desc, usableW-8);
    need(lines.length*11+4);
    doc.text(lines, ML+8, y);
    y += lines.length*11+10;
  }

  // HACKATHON
  section("Hackathon Projects");
  need(70);
  // Title + event badge on same line
  doc.setFont("helvetica","bold");
  doc.setFontSize(9.5);
  txt("#1e1b2e");
  doc.text("Employ Chain", ML, y);
  const titleW = doc.getTextWidth("Employ Chain");
  doc.setFont("helvetica","normal");
  doc.setFontSize(8);
  txt("#d97706");
  doc.text("[ HACK-A-SOL 2.0 ]", ML + titleW + 8, y);
  y += 12;
  // Portfolio link
  doc.setFont("helvetica","normal");
  doc.setFontSize(8);
  txt("#7c3aed");
  doc.text("devfolio.co/projects/employ-chain-d850", ML + 8, y);
  y += 12;
  // Tags
  doc.setFont("helvetica","italic");
  doc.setFontSize(8);
  txt("#6d28d9");
  doc.text("Blockchain  |  NodeJS  |  ReactJS  |  Web3  |  Smart Contracts  |  NFT  |  Solidity", ML+8, y);
  y += 12;
  // Description
  doc.setFont("helvetica","normal");
  doc.setFontSize(8.5);
  txt("#374151");
  const hackLines = doc.splitTextToSize("A Decentralized Employment & Verification System using Blockchain. Verifies criminal background, work history, and educational qualifications, and issues NFTs as Proof of Employment - reducing months of manual verification to just a few hours.", usableW-8);
  need(hackLines.length*11+4);
  doc.text(hackLines, ML+8, y);
  y += hackLines.length*11+10;

  // EDUCATION
  section("Education");
  need(36);
  doc.setFont("helvetica","bold");
  doc.setFontSize(10);
  txt("#1e1b2e");
  doc.text("K S Institute of Technology", ML, y);
  y += 13;
  doc.setFont("helvetica","normal");
  doc.setFontSize(9);
  txt("#374151");
  doc.text("Bachelor of Engineering – Computer Science", ML, y);
  y += 16;

  // CERTIFICATIONS
  section("Certifications");
  const certs = ["DevOps from Simplilearn","Google Cloud Platform – Badges","Python 101 for Data Science from IBM – Cognitive Classes","SQL ADVANCE from Hackerrank","RestAPI from Hackerrank","Java for Beginners to Advance by Udemy","Python Beginners to Advance by Udemy","Complete Prompt Engineering Bootcamp 2026 by Udemy"];
  for (const c of certs) addBullet(c);

  drawFooter();
  doc.save("Karthik_Hudedamani_Resume.pdf");
}