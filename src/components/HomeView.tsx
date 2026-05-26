import { motion } from 'motion/react';
import { Bolt, ArrowRight, ExternalLink, Mail, Send, Check } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { Post, Byte } from '../types';

interface HomeViewProps {
  posts: Post[];
  bytes: Byte[];
}

export default function Home({ posts, bytes }: HomeViewProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const latestPosts = posts.slice(0, 3);
  const recentBytes = bytes.filter((byte) => byte.type === 'discovery').slice(0, 3);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    setEmail('');
    setError('');
  };

  return (
    <div className="flex flex-col gap-16 w-full">
      <section className="py-16 md:py-28 border-b border-white/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            backgroundPosition: 'center top'
          }}
        />
        <div className="relative z-10 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-sans font-black text-4xl md:text-7xl uppercase tracking-tighter text-white mb-6 leading-none"
          >
            Exploring code, craft, <span className="text-white/40 block md:inline">and creativity.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="font-sans text-base md:text-lg text-white/75 max-w-xl mb-10 leading-relaxed"
          >
            My curated digital journal of my everyday findings, thoughts and experiments in software engineering. A blend of long-form essays and quick bytes which emphasizes simplicity, clarity and practical insights. No fluff, just the good stuff.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <a href="/posts" className="font-sans font-black text-[10px] uppercase tracking-widest bg-white text-black hover:bg-neutral-200 px-6 py-4 rounded-none transition-all active:scale-97 cursor-pointer no-underline">
              Read Latest Posts
            </a>
            <a href="/bytes" className="font-sans font-bold text-[10px] uppercase tracking-widest bg-transparent border border-white/20 text-white hover:bg-white/10 px-6 py-4 rounded-none transition-all active:scale-97 cursor-pointer no-underline">
              Browse Bytes
            </a>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
        <div className="md:col-span-8 flex flex-col gap-10">
          <div className="border-b border-white/10 pb-3">
            <h2 className="font-sans font-black text-[11px] uppercase tracking-[0.25em] text-white/50">Latest Essays</h2>
          </div>

          <div className="flex flex-col">
            {latestPosts.map((post, i) => (
              <motion.article
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                key={post.id}
                className="py-8 border-b border-white/10 group cursor-pointer hover:border-white/30 transition-colors duration-200 pr-4"
              >
                <a href={`/posts/${post.slug}`} className="block no-underline text-white">
                  <div className="flex items-center gap-2.5 mb-3 text-[10px] font-mono tracking-wider">
                    <span className="text-white/40">{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-[#00ecff] uppercase font-bold">{post.category}</span>
                  </div>
                  <h3 className="font-sans text-xl md:text-2xl font-extrabold tracking-tight text-white group-hover:text-[#00ecff] transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-white/70 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </a>
              </motion.article>
            ))}
          </div>

          <div>
            <a href="/posts" className="inline-flex items-center gap-2 font-sans font-black text-[10px] uppercase tracking-widest text-[#00ecff] hover:text-white transition-all cursor-pointer hover:gap-3 no-underline">
              View Archive <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <aside className="md:col-span-4 flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <div className="border-b border-white/10 pb-3 flex items-center gap-2">
              <Bolt className="w-4 h-4 text-[#00ecff]" />
              <h2 className="font-sans font-black text-[11px] uppercase tracking-[0.25em] text-white/50">Recent Bytes</h2>
            </div>

            <div className="flex flex-col gap-4">
              {recentBytes.map((byte, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  key={byte.id}
                  className="bg-neutral-950 border border-white/10 rounded-none p-5 hover:border-white/30 transition-all group cursor-pointer"
                >
                  <a href="/bytes" className="block no-underline text-white">
                    <h4 className="font-sans text-sm md:text-base font-black text-white mb-2 leading-snug group-hover:text-[#00ecff] transition-colors">
                      {byte.title}
                    </h4>
                    <p className="font-sans text-[11px] text-white/60 line-clamp-3 mb-4 leading-relaxed">
                      {byte.content}
                    </p>
                    <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                      <span>{byte.date}</span>
                      <span className="text-[#00ecff] group-hover:translate-x-[2px] group-hover:translate-y-[-2px] transition-transform">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-neutral-900 border border-white/10 rounded-none p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Mail className="w-24 h-24 text-white" />
            </div>
            <div className="relative z-10">
              <h3 className="font-sans text-xs font-black uppercase tracking-widest text-[#00ecff] mb-2">Subscribe</h3>
              <p className="font-sans text-xs text-white/70 mb-4 leading-relaxed">
                Get long-form engineering essays and technical bytes delivered straight to your inbox. No spam, ever.
              </p>

              {subscribed ? (
                <div className="bg-neutral-950 border border-[#00ecff]/20 rounded-none p-4 flex flex-col items-center text-center gap-2">
                  <Check className="w-8 h-8 text-[#00ecff] bg-[#00ecff]/10 rounded-full p-2" />
                  <p className="font-sans text-[10px] font-black uppercase tracking-widest text-[#00ecff]">Successfully Subscribed!</p>
                  <p className="font-sans text-[10px] text-white/50">Welcome aboard, check your inbox soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="bg-black border border-white/10 text-white px-4 py-2.5 rounded-none focus:outline-none focus:border-white font-sans text-xs w-full h-10"
                  />
                  {error && <span className="text-red-400 text-[10px] font-sans">{error}</span>}
                  <button
                    type="submit"
                    className="bg-white text-black font-sans font-black text-[10px] uppercase tracking-widest h-10 rounded-none hover:bg-neutral-200 active:scale-98 transition-all w-full flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    Subscribe <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}
