import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { generateResume } from '../utils/generateResume';

const links = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md shadow-lg shadow-purple-900/10 border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.span
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          KH.
        </motion.span>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <motion.li
              key={link}
              whileHover={{ y: -2 }}
              className="text-slate-400 hover:text-purple-400 cursor-pointer text-sm font-medium transition-colors duration-200 relative group"
              onClick={() => scrollTo(link)}
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
            </motion.li>
          ))}
        </ul>

        {/* Resume download */}
        <button
          onClick={generateResume}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/40 text-purple-300 hover:bg-purple-500/20 hover:text-white transition-all duration-200 text-xs font-medium cursor-pointer"
        >
          <FiDownload size={13} />
          Resume
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-purple-400 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#12121a]/95 backdrop-blur-md border-b border-white/5"
          >
            <ul className="flex flex-col py-4">
              {links.map((link) => (
                <li
                  key={link}
                  className="px-8 py-3 text-slate-300 hover:text-purple-400 hover:bg-white/5 cursor-pointer transition-colors text-sm font-medium"
                  onClick={() => scrollTo(link)}
                >
                  {link}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
