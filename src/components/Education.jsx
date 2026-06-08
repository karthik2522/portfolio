import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiAcademicCap } from 'react-icons/hi';

const education = [
  {
    institution: 'K S Institute of Technology',
    degree: 'Bachelor of Engineering',
    field: 'Computer Science',
    icon: '🎓',
    color: 'from-purple-500 to-indigo-500',
    border: 'hover:border-purple-500/40',
    bg: 'from-purple-500/10 to-indigo-500/5',
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="py-28 px-6 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Academic Background</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative bg-gradient-to-br ${edu.bg} rounded-2xl p-8 border border-white/5 ${edu.border} transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Icon */}
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
                  {edu.icon}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className={`text-xl font-bold bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}>
                        {edu.institution}
                      </h3>
                      <p className="text-white font-semibold mt-1">{edu.degree}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <HiAcademicCap className="text-slate-500" size={14} />
                        <p className="text-slate-400 text-sm">{edu.field}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
