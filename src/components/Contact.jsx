import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: 'karthikkarthik2522@gmail.com', href: 'mailto:karthikkarthik2522@gmail.com' },
  { icon: FaPhone, label: 'Phone', value: '+91 7019047085', href: 'tel:+917019047085' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Bangalore, India', href: null },
  { icon: FaGithub, label: 'GitHub', value: 'github.com/karthik2522', href: 'https://github.com/karthik2522' },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/karthik-hudedamani', href: 'https://www.linkedin.com/in/karthik-hudedamani-6316bb16b/' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-28 px-6 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Let's{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed">
            I'm open to new opportunities, collaborations, or just a chat. Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href || undefined}
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className={`flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300 group ${href ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <Icon className="text-purple-400" size={18} />
                </div>
                <div>
                  <p className="text-slate-500 text-xs">{label}</p>
                  <p className="text-slate-200 text-sm font-medium">{value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#12121a] rounded-2xl p-8 border border-white/5"
          >
            <h3 className="text-white font-bold text-xl mb-6">Send a Message</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:karthikkarthik2522@gmail.com?subject=${encodeURIComponent(e.target.subject.value)}&body=${encodeURIComponent(e.target.message.value)}`;
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <textarea
                name="message"
                placeholder="Your message..."
                required
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-purple-700/30 hover:shadow-purple-700/50 hover:-translate-y-0.5"
              >
                Send Message ✉️
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
