import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { HiLightningBolt } from 'react-icons/hi';

const projects = [
  {
    title: 'Clinical Integration',
    description:
      'Integrated multiple vendor systems with eClinicalWorks (eCW) product. Designed and maintained interoperability modules, improving clinical workflow efficiency and patient data exchange.',
    tags: ['HL7', 'Java', 'Mirth Engine', 'EMR'],
    color: 'from-purple-500/20 to-indigo-500/10',
    border: 'hover:border-purple-500/40',
    dot: 'bg-purple-500',
  },
  {
    title: 'FTDM – FactoryTalk Data Mosaix',
    description:
      'Developed interactive dashboards for industries to visualize, monitor, and analyze real-time process and production data. Enhanced data monitoring accuracy by 90%, minimizing manual intervention and operational delays.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'AWS', 'Dashboards'],
    color: 'from-pink-500/20 to-rose-500/10',
    border: 'hover:border-pink-500/40',
    dot: 'bg-pink-500',
  },
  {
    title: 'CPCB – Central Pollution Control Board',
    description:
      'Contributed to a real-time environmental data monitoring system to ensure compliance with CPCB regulations for the central Govt. of India. Handled bug fixing, system enhancements, and feature improvements ensuring accurate regulatory reporting and system stability.',
    tags: ['Python', 'REST APIs', 'PostgreSQL', 'Regulatory Tech', 'Monitoring'],
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'hover:border-cyan-500/40',
    dot: 'bg-cyan-500',
  },
];

const hackathons = [
  {
    title: 'Employ Chain',
    event: 'HACK-A-SOL 2.0',
    description:
      'A Decentralized Employment & Verification System using Blockchain. Verifies criminal background, work history, and educational qualifications, and issues NFTs as Proof of Employment — reducing months of manual verification to just a few hours.',
    tags: ['Blockchain', 'NodeJS', 'ReactJS', 'Web3', 'Smart Contracts', 'NFT', 'Solidity'],
    link: 'https://devfolio.co/projects/employ-chain-d850',
    github: 'https://github.com/Project-EmployChain',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-28 px-6 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Featured{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative bg-gradient-to-br ${project.color} rounded-2xl p-6 border border-white/5 ${project.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl ${project.dot} bg-opacity-20 flex items-center justify-center`}>
                  <div className={`w-4 h-4 rounded-full ${project.dot}`} />
                </div>
                <FiExternalLink className="text-slate-600 group-hover:text-purple-400 transition-colors" size={18} />
              </div>

              <h3 className="text-white font-bold text-lg mb-3 leading-snug">{project.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-black/20 text-slate-400 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hackathon Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <HiLightningBolt className="text-yellow-400" size={20} />
            <h3 className="text-xl font-bold text-white">Hackathon Projects</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {hackathons.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 rounded-2xl p-6 border border-white/5 hover:border-yellow-500/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 font-semibold mb-3">
                      <HiLightningBolt size={11} />
                      {h.event}
                    </span>
                    <h4 className="text-white font-bold text-lg leading-snug">{h.title}</h4>
                  </div>
                  <a href={h.link} target="_blank" rel="noreferrer">
                    <FiExternalLink className="text-slate-600 group-hover:text-yellow-400 transition-colors mt-1" size={18} />
                  </a>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">{h.description}</p>

                <div className="flex flex-wrap gap-2">
                  {h.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-black/20 text-slate-400 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
