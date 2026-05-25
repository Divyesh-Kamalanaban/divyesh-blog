import { ReactNode, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, Check } from 'lucide-react';
import { ActiveTab, Post } from '../types';
import SEOManager from '../components/SEOManager';

interface MainLayoutProps {
  children: ReactNode;
  activeTab: ActiveTab;
  selectedPost: Post | null;
  navigateTo: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchActive: boolean;
  setSearchActive: (active: boolean) => void;
}

export default function MainLayout({
  children,
  activeTab,
  selectedPost,
  navigateTo,
  searchQuery,
  setSearchQuery,
  searchActive,
  setSearchActive
}: MainLayoutProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState<boolean>(false);

  // States for general subscription
  const [subEmail, setSubEmail] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);
  const [subError, setSubError] = useState('');

  const handleModalSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes('@')) {
      setSubError('Please enter a valid email address');
      return;
    }
    setSubSuccess(true);
    setTimeout(() => {
      setSubEmail('');
      setSubSuccess(false);
      setShowSubscribeModal(false);
    }, 2000);
  };

  const handleSearchFocus = () => {
    navigateTo('posts');
    setSearchActive(true);
  };

  return (
    <div className="bg-[#050505] text-[#ffffff] font-sans antialiased min-h-screen flex flex-col selection:bg-neutral-800 selection:text-white">
      <SEOManager activeTab={activeTab} selectedPost={selectedPost} />
      
      {/* TopNavBar Header */}
      <header className="border-b border-white/10 sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-5xl mx-auto h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex flex-col items-start hover:opacity-85 transition-opacity cursor-pointer border-none bg-transparent p-0 text-left"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 mb-0.5 leading-none font-bold">Available for hire</span>
            <span className="font-sans font-black text-xl md:text-2xl tracking-tighter text-white leading-none">
              DIVYESH<span className="text-white/35 italic font-light font-serif">.dev</span>
            </span>
          </button>
 
          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 h-full font-bold">
            {(['home', 'posts', 'bytes', 'about'] as const).map((tab) => {
              const isActive = activeTab === tab && !selectedPost;
              return (
                <button
                  key={tab}
                  onClick={() => navigateTo(tab)}
                  className={`font-sans text-[11px] uppercase tracking-widest h-full flex items-center px-1 transition-all cursor-pointer ${
                    isActive
                      ? 'text-white font-black border-b border-white'
                      : 'text-white/50 hover:text-white border-b border-transparent'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>

          {/* Trailing Actions */}
          <div className="flex items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {searchActive ? (
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden mr-2 hidden sm:block"
                  >
                    <input
                      type="text"
                      placeholder="Type to search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => {
                        if (!searchQuery) setSearchActive(false);
                      }}
                      className="w-full bg-neutral-900 border border-white/15 rounded-md pl-3 pr-3 py-1.5 text-xs font-sans text-white focus:outline-none focus:border-white shadow-inner h-8"
                      autoFocus
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
              
              <button 
                onClick={searchActive ? handleSearchFocus : () => setSearchActive(true)}
                className="p-2 text-white/65 hover:bg-white/10 rounded-full cursor-pointer transition-all hover:text-white flex items-center justify-center animate-fade-in"
                aria-label="Search posts"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Subscribe Button */}
            <button 
              onClick={() => setShowSubscribeModal(true)}
              className="hidden md:inline-flex font-sans font-bold text-[10px] uppercase tracking-widest bg-white text-black hover:bg-neutral-200 px-5 h-9 items-center justify-center transition-all cursor-pointer active:scale-97"
            >
              Subscribe
            </button>

            {/* Burger Trigger for Mobile */}
            <button 
              onClick={() => setShowMobileMenu(prev => !prev)}
              className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-neutral-900 cursor-pointer text-white"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Menu Panel */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-[#050505] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {(['home', 'posts', 'bytes', 'about'] as const).map((tab) => {
                const isActive = activeTab === tab && !selectedPost;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      navigateTo(tab);
                      setShowMobileMenu(false);
                    }}
                    className={`font-sans font-bold text-xs uppercase tracking-widest text-left py-2.5 border-l-2 pl-3 block transition-all cursor-pointer ${
                      isActive
                        ? 'border-white text-white bg-neutral-900/60'
                        : 'border-transparent text-white/50 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full bg-neutral-900 border border-white/15 rounded-md pl-9 pr-4 py-2 text-xs font-sans text-white focus:outline-none focus:border-white shadow-inner h-9"
                    onFocus={() => {
                      navigateTo('posts');
                    }}
                  />
                </div>
                <button 
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowSubscribeModal(true);
                  }}
                  className="w-full font-sans font-bold text-[10px] uppercase tracking-widest bg-white text-black h-10 rounded-md flex items-center justify-center cursor-pointer active:scale-97"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 md:px-12 py-10 flex flex-col gap-10">
        {children}
      </main>

      {/* Footer block */}
      <footer className="border-t border-white/10 bg-[#050505] mt-16 select-none">
        <div className="w-full py-12 px-6 md:px-12 max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand logo & copyright block */}
          <div className="flex flex-col items-center md:items-start tracking-tight">
            <span className="font-sans font-black text-xl text-white tracking-tighter">
              DIVYESH<span className="text-white/35 italic font-light font-serif">.dev</span>
            </span>
            <p className="font-sans text-[10px] text-white/40 uppercase tracking-widest mt-1">
              © 2026 Divyesh. Built with Acorn logic. All rights reserved.
            </p>
          </div>

          {/* Nav Links Footer list */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); alert('RSS Feed is live! Point your aggregator to /feed.xml'); }}
              className="font-sans font-bold text-[10px] uppercase tracking-widest text-white/50 hover:text-white hover:underline decoration-white underline-offset-4 outline-none transition-colors"
            >
              RSS Feed
            </a>
            <a 
              href="https://github.com/Divyesh-Kamalanaban" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-sans font-bold text-[10px] uppercase tracking-widest text-white/50 hover:text-white hover:underline decoration-white underline-offset-4 outline-none transition-colors"
            >
              Github
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo('about'); }}
              className="font-sans font-bold text-[10px] uppercase tracking-widest text-white/50 hover:text-white hover:underline decoration-white underline-offset-4 outline-none transition-colors"
            >
              Source
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); alert('Privacy Notice: This portfolio aggregates zero tracking cookies or state identifiers.'); }}
              className="font-sans font-bold text-[10px] uppercase tracking-widest text-white/50 hover:text-white hover:underline decoration-white underline-offset-4 outline-none transition-colors"
            >
              Privacy Notice
            </a>
          </nav>
        </div>
      </footer>

      {/* Subscribe Modal Overlay */}
      <AnimatePresence>
        {showSubscribeModal && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="w-full max-w-sm bg-[#0c0c0c] border border-white/10 rounded-none shadow-2xl p-6 relative flex flex-col gap-5"
            >
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <h3 className="font-sans text-xs uppercase tracking-widest font-black text-white">Subscribe</h3>
                <button 
                  onClick={() => setShowSubscribeModal(false)}
                  className="text-white/40 hover:text-white font-semibold text-sm cursor-pointer px-2"
                >
                  ✕
                </button>
              </div>

              {subSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                  <Check className="w-10 h-10 text-[#00ecff] bg-[#00ecff]/10 rounded-full p-2" />
                  <p className="font-sans font-black text-xs uppercase tracking-widest text-white">Subscriber Confirmed!</p>
                  <p className="font-sans text-xs text-white/50">Welcome aboard. Divyesh's weekly digests will reach you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleModalSubscribe} className="flex flex-col gap-4 mt-1">
                  <p className="font-sans text-xs text-white/60 leading-relaxed">
                    Receive long-form software engineering essays and byte-sized insights directly in your email. No tracking or marketing spam.
                  </p>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans font-bold text-[9px] text-white/40 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      placeholder="you@example.com" 
                      className="w-full bg-neutral-900 border border-white/10 rounded-none px-3 py-2.5 text-xs font-sans text-white focus:outline-none focus:border-white h-10"
                    />
                    {subError && <span className="text-red-400 text-[10px] font-sans mt-0.5">{subError}</span>}
                  </div>
                  <button 
                    type="submit" 
                    className="bg-white text-black font-sans font-bold text-[10px] uppercase tracking-widest h-10 rounded-none hover:bg-neutral-200 active:scale-97 transition-all w-full flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
