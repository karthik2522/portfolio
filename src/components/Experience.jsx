import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiBriefcase } from 'react-icons/hi';

const experiences = [
  {
    company: 'Rockwell Automation',
    role: 'Software Engineer 1',
    period: '2024 – Present',
    color: 'from-purple-500 to-indigo-500',
    dot: 'bg-purple-500',
    bullets: [
      'Designed, developed, and maintained scalable Python applications with a focus on performance and reliability.',
      'Analysed, debugged, and resolved complex software issues to improve system stability and user experience.',
      'Implemented code enhancements, feature upgrades, and process automation to optimize application functionality.',
      'Collaborated with cross-functional teams to gather requirements, perform root cause analysis, and deliver solutions.',
      'Worked with databases (PostgreSQL/MySQL/NoSQL) and APIs for seamless backend integration.',
    ],
  },
  {
    company: 'eClinicalworks India Private Limited',
    role: 'Technical Specialist',
    period: '2022 – 2024',
    color: 'from-pink-500 to-rose-500',
    dot: 'bg-pink-500',
    bullets: [
      'Designed, developed, and tested healthcare interfaces using HL7 standards and messaging protocols.',
      'Analysed business requirements and identified interface specifications to ensure accurate data exchange.',
      'Experience in integrating EMR systems with various healthcare applications using HL7 standards.',
      'Developed and maintained complex interfaces using Java, SQL, HL7, JSP, Apache server and XML, including Mirth tool, EMR, EHR and E-hub.',
      'Provided technical support and troubleshooting for interface engines, resolving issues to ensure uninterrupted data flow.',
      'Collaborated with cross-functional teams to troubleshoot and resolve interface issues.',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-28 px-6 bg-[#0d0d14]">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Career Path</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Work{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-pink-500/30 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative md:pl-16"
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 top-6 w-4 h-4 rounded-full ${exp.dot} ring-4 ring-[#0d0d14] hidden md:block`} />

                <div className="bg-[#12121a] rounded-2xl p-7 border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className={`text-xl font-bold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                        {exp.company}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <HiBriefcase className="text-slate-500" size={14} />
                        <p className="text-slate-300 font-medium text-sm">{exp.role}</p>
                      </div>
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                        <span className="text-purple-400 mt-1.5 shrink-0">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
