import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-28 px-6 bg-[#0d0d14]">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Crafting{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              scalable systems
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <div className="w-72 h-72 mx-auto rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/20 border border-purple-500/20 flex items-center justify-center overflow-hidden">
                <div className="text-8xl font-black bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent select-none">
                  KH
                </div>
              </div>
              {/* floating badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 bg-[#1a1a2e] border border-purple-500/30 rounded-xl px-4 py-2 shadow-xl"
              >
                <p className="text-xs text-slate-400">Experience</p>
                <p className="text-lg font-bold text-purple-400">3+ Years</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-slate-300 leading-relaxed text-base">
              Results-driven Software Engineer with <span className="text-purple-400 font-semibold">3+ years of experience</span> in application
              development, bug fixing, and system enhancements across healthcare, industrial, and environmental compliance domains.
            </p>
            <p className="text-slate-400 leading-relaxed text-base">
              Skilled in designing interfaces, developing real-time monitoring systems, and building interactive dashboards that improve
              data quality, system reliability, and operational efficiency.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { label: 'Projects Delivered', value: '10+' },
                { label: 'Technologies', value: '15+' },
                { label: 'Client Systems', value: '5+' },
                { label: 'Uptime Improved', value: '90%' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-colors">
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{value}</p>
                  <p className="text-slate-400 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
