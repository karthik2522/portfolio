import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillGroups = [
  {
    category: 'Languages & Frameworks',
    color: 'from-purple-500 to-indigo-500',
    items: ['Python', 'JavaScript', 'FastAPI', 'RestAPI', 'HL7 v2.x / v3.x', 'JSON'],
  },
  {
    category: 'Databases',
    color: 'from-pink-500 to-rose-500',
    items: ['PostgreSQL', 'MySQL', 'MSSQL', 'Oracle Database', 'MongoDB'],
  },
  {
    category: 'Cloud & DevOps',
    color: 'from-cyan-500 to-blue-500',
    items: ['AWS', 'Azure', 'Git', 'DevOps', 'Deployment Pipelines'],
  },
  {
    category: 'Tools & Platforms',
    color: 'from-amber-500 to-orange-500',
    items: ['Mirth Engine', 'E-hub', 'Figma', 'VS Code', 'PyCharm', 'Apache Server'],
  },
  {
    category: 'Soft Skills',
    color: 'from-green-500 to-teal-500',
    items: ['Problem Solving', 'Leadership', 'Communication', 'Analytical Thinking', 'Troubleshooting'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-28 px-6 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">What I Know</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Skills &{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="bg-[#12121a] rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-900/20"
            >
              <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${group.color} text-white text-xs font-semibold mb-4`}>
                {group.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate-300 border border-white/10 hover:border-purple-500/40 hover:text-purple-300 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
