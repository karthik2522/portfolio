import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import { generateResume } from '../utils/generateResume';

const Particle = ({ style }) => (
  <div
    className="absolute rounded-full bg-purple-500/10 animate-pulse"
    style={style}
  />
);

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
        {[...Array(6)].map((_, i) => (
          <Particle
            key={i}
            style={{
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              top: `${10 + i * 15}%`,
              left: `${5 + i * 16}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium"
        >
          ✨ Available for new opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black mb-4 text-white leading-tight"
        >
          Karthik{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Hudedamani
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 mb-3 font-medium"
        >
          Python Backend Developer &nbsp;|&nbsp; FastAPI &nbsp;|&nbsp; REST APIs &nbsp;|&nbsp; PostgreSQL &nbsp;|&nbsp; AWS
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-500 mb-10 flex items-center justify-center gap-2"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Bangalore, India
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <a
            href="https://github.com/karthik2522"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all duration-300 text-sm font-medium group"
          >
            <FaGithub className="group-hover:rotate-12 transition-transform" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/karthik-hudedamani-6316bb16b/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all duration-300 text-sm font-medium group"
          >
            <FaLinkedin className="group-hover:rotate-12 transition-transform" />
            LinkedIn
          </a>
          <a
            href="mailto:karthikkarthik2522@gmail.com"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all duration-300 text-sm font-medium shadow-lg shadow-purple-700/30 hover:shadow-purple-700/50"
          >
            <FaEnvelope />
            Hire Me
          </a>
          <button
            onClick={generateResume}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all duration-300 text-sm font-medium group cursor-pointer"
          >
            <HiDownload className="group-hover:translate-y-0.5 transition-transform" />
            Resume
          </button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 mx-auto text-slate-600 hover:text-purple-400 transition-colors cursor-pointer group"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <HiArrowDown className="animate-bounce group-hover:text-purple-400" size={18} />
        </motion.button>
      </div>
    </section>
  );
}
