import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, Post } from './types';
import { blogPosts, bytesList } from './content.config';
import { technicalStack, currentGear } from './consts';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Bytes from './pages/Bytes';
import About from './pages/About';
import PostDetail from './pages/PostDetail';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchActive, setSearchActive] = useState<boolean>(false);

  // Safe navigation handler
  const navigateTo = (tab: ActiveTab) => {
    setActiveTab(tab);
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout
      activeTab={activeTab}
      selectedPost={selectedPost}
      navigateTo={navigateTo}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      searchActive={searchActive}
      setSearchActive={setSearchActive}
    >
      {/* Dynamic Reader Pane or Master Views */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPost ? `read-${selectedPost.id}` : activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full"
        >
          {selectedPost ? (
            <PostDetail 
              post={selectedPost} 
              onBack={() => setSelectedPost(null)} 
            />
          ) : (
            <>
              {activeTab === 'home' && (
                <Home 
                  onNavigate={navigateTo} 
                  posts={blogPosts}
                  bytes={bytesList}
                  onSelectPost={handleSelectPost}
                />
              )}
              {activeTab === 'posts' && (
                <Posts 
                  posts={blogPosts}
                  onSelectPost={handleSelectPost}
                  searchQuery={searchQuery}
                />
              )}
              {activeTab === 'bytes' && (
                <Bytes 
                  bytes={bytesList}
                />
              )}
              {activeTab === 'about' && (
                <About 
                  technicalStack={technicalStack}
                  currentGear={currentGear}
                />
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}
