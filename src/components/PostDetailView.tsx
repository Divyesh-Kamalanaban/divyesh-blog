import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { Post } from '../types';

interface PostDetailViewProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailViewProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-16 select-text"
    >
      <div>
        <a
          href="/posts"
          className="inline-flex items-center gap-2 font-sans font-black text-[10px] uppercase tracking-widest text-[#00ecff] hover:text-white transition-all cursor-pointer group no-underline"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to posts
        </a>
      </div>

      <header className="flex flex-col gap-4 border-b border-white/10 pb-6">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-white/40 uppercase tracking-widest">
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
          <span className="bg-neutral-900 border border-white/10 px-2.5 py-0.5 text-white/70 text-[9px] font-sans font-bold tracking-widest">
            {post.category}
          </span>
        </div>

        <h1 className="font-sans font-black text-3xl md:text-5xl text-white tracking-tighter uppercase leading-none mt-1">
          {post.title}
        </h1>

        <p className="font-sans text-xs md:text-sm text-white/50 uppercase tracking-widest leading-relaxed mt-2">
          {post.excerpt}
        </p>
      </header>

      <div className="font-sans text-xs md:text-sm text-white/80 leading-relaxed space-y-6 flex flex-col">
        {post.content ? (
          post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="font-sans font-black text-xs uppercase tracking-[0.2em] text-[#00ecff] mt-6 mb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('#### ')) {
              return (
                <h4 key={index} className="font-sans font-black text-[10px] uppercase tracking-[0.18em] text-white mt-4 mb-2">
                  {paragraph.replace('#### ', '')}
                </h4>
              );
            }
            if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
              return (
                <ul key={index} className="list-disc list-inside space-y-2 text-xs md:text-sm text-white/70 pl-4">
                  {paragraph.split('\n').map((li, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {li.replace(/^(- |\d+\. )/, '')}
                    </li>
                  ))}
                </ul>
              );
            }

            if (paragraph.startsWith('```')) {
              const codeLines = paragraph.split('\n').filter((line) => !line.startsWith('```'));
              return (
                <div key={index} className="bg-black border border-white/10 text-white font-mono text-xs rounded-none p-5 overflow-x-auto leading-relaxed my-4">
                  <pre className="no-scrollbar">{codeLines.join('\n')}</pre>
                </div>
              );
            }

            return (
              <p key={index} className="leading-relaxed select-text text-white/80">
                {paragraph}
              </p>
            );
          })
        ) : (
          <p className="italic text-white/45">Article content is currently being written...</p>
        )}
      </div>

      <footer className="border-t border-white/10 pt-6 flex flex-wrap gap-2.5 items-center mt-6">
        <Tag className="w-3.5 h-3.5 text-white/30 mr-0.5" />
        {(post.tags ?? []).map((tag) => (
          <span key={tag} className="font-mono text-[10px] text-white/40 hover:text-white uppercase tracking-wider transition-colors cursor-default">
            #{tag}
          </span>
        ))}
      </footer>
    </motion.article>
  );
}
