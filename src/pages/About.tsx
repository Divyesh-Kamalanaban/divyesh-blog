import { motion } from 'motion/react';
import { Mail, Link as LinkIcon, Twitter, Terminal, Database, Server, Compass, Check } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface AboutViewProps {
  technicalStack: {
    languages: string[];
    infrastructure: string[];
    data: string[];
  };
  currentGear: string[];
}

export default function About({ technicalStack, currentGear }: AboutViewProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  // Social Links links or simulation triggers
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setFormSent(false);
      setShowContactModal(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-10">
      {/* Hero Profile */}
      <section className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-10 pb-8 border-b border-white/10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-44 h-44 md:w-56 md:h-56 flex-shrink-0 overflow-hidden border-2 border-white bg-neutral-950"
        >
          <img 
            alt="Divyesh Headshot" 
            className="w-full h-full object-cover select-none filter contrast-110 saturate-0" 
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuArXeKtJKHq-NetbXbdHnnnFKqU0hjuJzHpNs6muLxV4t95S-vvhcsPq7p_MeaZZUW8ajfLP8ymQCEK1hKrnrHNPLrLPGeCit7HPkA1uK0P6P8FxtjSpReR03K0fy0wI2ykT8HURPibaZ_sW5TDtIUOyPdw1MqB8rrPRX223Qki9Nm0R8HokEfQNCHu89j56TT6HrEwUMIbiR8-YjQrLkying7xp3HSlSU-Nwpd0yDFWEyCiyK7WxYC02oeCvFZYafsedm9e0Mo-Xc"
          />
        </motion.div>
        <div className="text-center md:text-left flex-grow flex flex-col justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-black text-4xl md:text-6xl text-white mb-2 tracking-tighter uppercase leading-none"
          >
            Hi, I'm Divyesh.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-[11px] uppercase tracking-widest text-[#00ecff] mb-6 font-bold"
          >
            Software Engineer, Writer, and Systems Enthusiast.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center md:justify-start"
          >
            <button 
              onClick={() => setShowContactModal(true)}
              className="flex items-center gap-2 text-white hover:text-[#00ecff] transition-all font-sans font-black text-[10px] uppercase tracking-widest border border-white/20 hover:border-white rounded-none px-4 py-2.5 bg-neutral-900/60 hover:bg-neutral-900 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 animate-pulse" /> Contact Me
            </button>
            <a 
              href="https://github.com/Divyesh-Kamalanaban" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-[#00ecff] transition-all font-sans font-black text-[10px] uppercase tracking-widest border border-white/20 hover:border-white rounded-none px-4 py-2.5 bg-neutral-900/60 hover:bg-neutral-900 cursor-pointer"
            >
              <LinkIcon className="w-3.5 h-3.5" /> GitHub
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-[#00ecff] transition-all font-sans font-black text-[10px] uppercase tracking-widest border border-white/20 hover:border-white rounded-none px-4 py-2.5 bg-neutral-900/60 hover:bg-neutral-900 cursor-pointer"
            >
              <Twitter className="w-3.5 h-3.5" /> Twitter
            </a>
          </motion.div>
        </div>
      </section>

      {/* Biography */}
      <section className="flex flex-col gap-4">
        <h2 className="font-sans text-xs uppercase tracking-[0.25em] text-white/50 border-b border-white/10 pb-3 font-black">
          Biography
        </h2>
        <div className="space-y-4 font-sans text-xs md:text-sm text-white/80 leading-relaxed select-text">
          <p>
            I build reliable, scalable systems and write about the engineering decisions behind them. My focus lies at the intersection of backend architecture, performance optimization, and developer tooling. I believe that good software is not just functional, but readable and maintainable over the long term.
          </p>
          <p>
            Currently, I'm exploring the boundaries of distributed systems and how we can make modern web applications more resilient. When I'm not coding, I'm usually dissecting technical whitepapers or curating "Byte-sized" insights on this site.
          </p>
          <p>
            This space serves as my digital garden—a collection of structured articles, quick snippets, and ongoing projects. It's built with a strong emphasis on typographic clarity and minimalist design, reflecting my approach to engineering: remove the noise, focus on the signal.
          </p>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="flex flex-col gap-4">
        <h2 className="font-sans text-xs uppercase tracking-[0.25em] text-white/50 border-b border-white/10 pb-3 font-black">
          Technical Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {/* Stack Category: Languages */}
          <div className="bg-neutral-950 border border-white/10 rounded-none p-5 hover:border-white/30 transition-all">
            <h3 className="font-sans font-black text-[10px] uppercase tracking-widest text-[#00ecff] mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Languages
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {technicalStack.languages.map((lang) => (
                <span key={lang} className="font-mono text-[10px] bg-neutral-900 border border-white/5 text-white/90 px-2 py-1">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Stack Category: Infrastructure */}
          <div className="bg-neutral-950 border border-white/10 rounded-none p-5 hover:border-white/30 transition-all">
            <h3 className="font-sans font-black text-[10px] uppercase tracking-widest text-[#00ecff] mb-4 flex items-center gap-2">
              <Server className="w-4 h-4" /> Infrastructure
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {technicalStack.infrastructure.map((infra) => (
                <span key={infra} className="font-mono text-[10px] bg-neutral-900 border border-white/5 text-white/90 px-2 py-1">
                  {infra}
                </span>
              ))}
            </div>
          </div>

          {/* Stack Category: Data */}
          <div className="bg-neutral-950 border border-white/10 rounded-none p-5 hover:border-white/30 transition-all">
            <h3 className="font-sans font-black text-[10px] uppercase tracking-widest text-[#00ecff] mb-4 flex items-center gap-2">
              <Database className="w-4 h-4" /> Data
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {technicalStack.data.map((item) => (
                <span key={item} className="font-mono text-[10px] bg-neutral-900 border border-white/5 text-white/90 px-2 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Gear */}
      <section className="flex flex-col gap-4">
        <h2 className="font-sans text-xs uppercase tracking-[0.25em] text-white/50 border-b border-white/10 pb-3 font-black">
          Current Gear
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-sans leading-relaxed select-text select-none">
          {currentGear.map((gear, id) => (
            <motion.li 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: id * 0.05 }}
              key={id} 
              className="flex items-center gap-2.5 bg-neutral-950 border border-white/5 rounded-none p-3.5 hover:border-white/20 transition-all font-sans"
            >
              <Compass className="w-4 h-4 text-[#00ecff] shrink-0" />
              <span className="font-mono text-xs text-white/80 tracking-tight">{gear}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Slide-Up Contact Modal dialog */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md bg-[#0c0c0c] border border-white/10 rounded-none shadow-2xl p-6 relative flex flex-col gap-5"
          >
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="font-sans text-xs uppercase tracking-widest font-black text-white">Get in Touch</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-white/40 hover:text-white font-semibold text-sm cursor-pointer px-2"
              >
                ✕
              </button>
            </div>

            {formSent ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                <Check className="w-12 h-12 text-[#00ecff] bg-[#00ecff]/10 rounded-full p-2.5" />
                <p className="font-sans font-black text-xs uppercase tracking-widest text-[#00ecff]">Message Sent!</p>
                <p className="font-sans text-xs text-white/50">Thanks for reaching out, I will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-bold text-[9px] text-white/40 uppercase tracking-widest">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" 
                    className="w-full bg-neutral-900 border border-white/10 rounded-none px-3 py-2.5 text-xs font-sans text-white focus:outline-none focus:border-white h-10"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-bold text-[9px] text-white/40 uppercase tracking-widest">Your Email</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" 
                    className="w-full bg-neutral-900 border border-white/10 rounded-none px-3 py-2.5 text-xs font-sans text-white focus:outline-none focus:border-white h-10"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-bold text-[9px] text-white/40 uppercase tracking-widest">Message</label>
                  <textarea 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your query..." 
                    rows={4}
                    className="w-full bg-neutral-900 border border-white/10 rounded-none px-3 py-2.5 text-xs font-sans text-white focus:outline-none focus:border-white resize-none"
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-white text-black font-sans font-black text-[10px] uppercase tracking-widest h-10 rounded-none hover:bg-neutral-200 active:scale-97 transition-all w-full flex items-center justify-center gap-2 cursor-pointer mt-2 animate-pulse"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
