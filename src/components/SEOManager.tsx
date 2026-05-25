import { useEffect } from 'react';
import { ActiveTab, Post } from '../types';

interface SEOManagerProps {
  activeTab: ActiveTab;
  selectedPost: Post | null;
}

export default function SEOManager({ activeTab, selectedPost }: SEOManagerProps) {
  useEffect(() => {
    let title = '';
    let description = '';
    let type = 'website';
    let ogImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuArXeKtJKHq-NetbXbdHnnnFKqU0hjuJzHpNs6muLxV4t95S-vvhcsPq7p_MeaZZUW8ajfLP8ymQCEK1hKrnrHNPLrLPGeCit7HPkA1uK0P6P8FxtjSpReR03K0fy0wI2ykT8HURPibaZ_sW5TDtIUOyPdw1MqB8rrPRX223Qki9Nm0R8HokEfQNCHu89j56TT6HrEwUMIbiR8-YjQrLkying7xp3HSlSU-Nwpd0yDFWEyCiyK7WxYC02oeCvFZYafsedm9e0Mo-Xc';
    const currentUrl = window.location.href;

    if (selectedPost) {
      title = `${selectedPost.title} | Divyesh's Blog`;
      description = selectedPost.excerpt;
      type = 'article';
    } else {
      switch (activeTab) {
        case 'home':
          title = "Divyesh's Technical Blog - Code, Craft, and Systems Engineering";
          description = 'An editorial portfolio and technical journal exploring software engineering, distributed systems, state consistency, and fine-grained reactivity.';
          break;
        case 'posts':
          title = 'Posts & Devlogs | Divyesh.dev';
          description = 'In-depth thoughts, technical tutorials, opinions, and development logs written by Divyesh, focusing on engineering patterns and systems.';
          break;
        case 'bytes':
          title = 'Technical Bytes & Snippets | Divyesh.dev';
          description = 'Micro-updates, useful code snippets, discoverable tools, and transient engineering thoughts. A virtual scratchpad.';
          break;
        case 'about':
          title = 'About Divyesh - Systems Engineer & Writer';
          description = 'Learn more about Divyesh’s experience, biography, technical stack, current setup, and gear. Get in touch directly.';
          break;
        default:
          title = 'Divyesh.dev - Software Engineer';
          description = 'A technical journal and personal portfolio of Divyesh.';
      }
    }

    // Update document title
    document.title = title;

    // Helper to upate or create meta tag
    const updateMetaTag = (nameAttr: string, valueAttr: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${valueAttr}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, valueAttr);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update General SEO Meta Tags
    updateMetaTag('name', 'description', description);

    // Update Open Graph (Social Sharing) Tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:url', currentUrl);

    // Update Twitter Cards
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);
  }, [activeTab, selectedPost]);

  return null; // Side-effect only component
}
