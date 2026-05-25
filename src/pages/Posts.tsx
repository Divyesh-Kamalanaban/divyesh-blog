import { motion, AnimatePresence } from 'motion/react';
import { Post } from '../types';
import { ChevronRight, ChevronLeft, Search, Calendar, Clock, Tag } from 'lucide-react';
import { useState, useMemo } from 'react';

interface PostsViewProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
  searchQuery: string;
}

export default function Posts({ posts, onSelectPost, searchQuery }: PostsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [localSearch, setLocalSearch] = useState<string>('');
  const postsPerPage = 4;

  const categories = ['All', 'Devlogs', 'Tutorials', 'Opinions'];

  // Map category tab string to exact post item categories
  const mappedPosts = useMemo(() => {
    let list = posts;

    // Filter by Tab category
    if (selectedCategory !== 'All') {
      const filterTerm = selectedCategory.toLowerCase().slice(0, -1); // devlog, tutorial, opinion
      list = list.filter(p => p.category.toLowerCase().startsWith(filterTerm));
    }

    // Filter by Header search or local list search
    const activeQuery = (searchQuery || localSearch).toLowerCase().trim();
    if (activeQuery) {
      list = list.filter(
        p => 
          p.title.toLowerCase().includes(activeQuery) || 
          p.excerpt.toLowerCase().includes(activeQuery) ||
          p.tags.some(t => t.toLowerCase().includes(activeQuery))
      );
    }

    return list;
  }, [posts, selectedCategory, searchQuery, localSearch]);

  // Handle pagination calculation
  const totalPages = Math.ceil(mappedPosts.length / postsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return mappedPosts.slice(start, start + postsPerPage);
  }, [mappedPosts, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset page indices
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-10">
      {/* Page Header */}
      <header className="mb-4">
        <h1 className="font-sans font-black text-4xl md:text-6xl text-white mb-3 tracking-tighter uppercase leading-none">
          Posts & Devlogs
        </h1>
        <p className="font-sans text-[11px] text-white/50 leading-relaxed uppercase tracking-widest">
          Thoughts, tutorials, and engineering notes.
        </p>
      </header>

      {/* Search & Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        {/* Navigation Categories */}
        <nav aria-label="Filters" className="flex md:flex-shrink-0 gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => selectCategory(category)}
                className={`px-4 py-2 font-sans font-black text-[10px] uppercase tracking-widest rounded-none transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-white/40 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>

        {/* Inline Search Subsystem */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search posts..."
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-neutral-900 border border-white/10 rounded-none pl-9 pr-6 py-2 h-9 text-xs font-sans text-white focus:outline-none focus:border-white transition-all"
          />
        </div>
      </div>

      {/* Main Post List */}
      <div className="flex flex-col min-h-[350px]">
        <AnimatePresence mode="popLayout">
          {paginatedPosts.length > 0 ? (
            <div className="flex flex-col">
              {paginatedPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onClick={() => onSelectPost(post)}
                  className="py-10 border-b border-white/10 group cursor-pointer hover:border-white/30 transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-white/40 mb-3 tracking-wider uppercase">
                     <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime}
                    </span>
                    <span>•</span>
                    <span className="bg-neutral-900 border border-white/10 px-2.5 py-0.5 text-white/70 text-[9px] font-sans font-bold uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>

                  <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-white mb-3 group-hover:text-[#00ecff] transition-colors leading-snug tracking-tight">
                    {post.title}
                  </h2>

                  <p className="font-sans text-xs md:text-sm text-white/70 mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2.5 items-center">
                    <Tag className="w-3.5 h-3.5 text-white/30" />
                    {post.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] tracking-wider uppercase text-white/40 hover:text-white transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center gap-2"
            >
              <Search className="w-10 h-10 text-white/20 mb-2" />
              <p className="font-sans font-bold text-sm uppercase tracking-widest text-white">No articles found</p>
              <p className="font-sans text-xs text-white/40">
                Try expanding your filters or search keywords context
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination component */}
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="flex justify-between items-center border-t border-white/10 pt-8 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 text-white/50 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors font-sans font-black text-[10px] uppercase tracking-widest cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex gap-2 font-mono text-xs text-white/40 select-none">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageIdx = i + 1;
              const isActive = currentPage === pageIdx;
              return (
                <button
                  key={pageIdx}
                  onClick={() => handlePageChange(pageIdx)}
                  className={`w-8 h-8 flex items-center justify-center rounded-none font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black'
                      : 'border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {pageIdx}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 text-white/50 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors font-sans font-black text-[10px] uppercase tracking-widest cursor-pointer group"
          >
            Next <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </nav>
      )}
    </div>
  );
}
