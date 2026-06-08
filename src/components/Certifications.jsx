import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiAcademicCap } from 'react-icons/hi';

const certs = [
  { name: 'DevOps from Simplilearn', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { name: 'Google Cloud Platform – Badges', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { name: 'Python 101 for Data Science from IBM – Cognitive Classes', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { name: 'SQL ADVANCE from Hackerrank', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { name: 'RestAPI from Hackerrank', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { name: 'Java for Beginners to Advance by Udemy', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { name: 'Python Beginners to Advance by Udemy', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { name: 'Complete Prompt Engineering Bootcamp 2026 by Udemy', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="py-28 px-6 bg-[#0d0d14]">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Credentials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`flex items-center gap-4 p-5 rounded-xl ${cert.bg} border ${cert.border} hover:scale-[1.02] transition-transform duration-200`}
            >
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${cert.bg}`}>
                <HiAcademicCap className={cert.color} size={20} />
              </div>
              <span className="text-slate-300 text-sm font-medium leading-snug">{cert.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
