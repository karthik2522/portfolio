import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5 bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          KH.
        </span>
        <p className="text-slate-600 text-sm text-center">
          © {new Date().getFullYear()} Karthik Hudedamani. All rights reserved.
        </p>
        <div className="flex gap-4">
          {[
            { icon: FaGithub, href: 'https://github.com/karthik2522' },
            { icon: FaLinkedin, href: 'https://www.linkedin.com/in/karthik-hudedamani-6316bb16b/' },
            { icon: FaEnvelope, href: 'mailto:karthikkarthik2522@gmail.com' },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
