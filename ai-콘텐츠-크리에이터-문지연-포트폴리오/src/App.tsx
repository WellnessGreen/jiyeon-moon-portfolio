/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PerformanceStats from './components/PerformanceStats';
import AboutMe from './components/AboutMe';
import MyStrength from './components/MyStrength';
import PortfolioShowcase from './components/PortfolioShowcase';
import MyJourney from './components/MyJourney';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { ArrowUp, Sparkles } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Monitor scroll positioning to update active navigation links and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // 1. Manage Back to Top visibility
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // 2. Identify active section based on proximity to viewport top
      const sections = ['hero', 'about', 'strength', 'projects', 'journey', 'skills', 'contact'];
      let currentActive = 'hero';

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section is currently active within the viewport focus zone
          if (rect.top <= 160 && rect.bottom >= 150) {
            currentActive = id;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // invoke once initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-blue-500 selection:text-white relative">
      {/* Sleek Fixed Glass Header */}
      <Header activeSection={activeSection} />

      {/* Main Structural Layout */}
      <main className="relative z-10">
        {/* HERO SECTION */}
        <Hero
          onPortfolioClick={() => scrollToSection('projects')}
          onProjectsClick={() => scrollToSection('strength')}
        />

        {/* PERFORMANCE STATS SECTION */}
        <PerformanceStats />

        {/* ABOUT ME SECTION */}
        <AboutMe />

        {/* MY STRENGTHS SECTION */}
        <MyStrength />

        {/* PORTFOLIO SHOWCASE SECTION */}
        <PortfolioShowcase onOpenContact={() => scrollToSection('contact')} />

        {/* MY JOURNEY (TIMELINE) SECTION */}
        <MyJourney />

        {/* SKILLS SECTION */}
        <Skills />

        {/* CONTACT SECTION */}
        <Contact />
      </main>

      {/* Sleek, Minimal Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-12 px-6 md:px-12 text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight">문지연 포트폴리오</span>
              <span className="text-[10px] text-slate-400 font-mono">AI Content Creator & Digital Marketer</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 cursor-pointer transition-colors">소개</button>
            <button onClick={() => scrollToSection('strength')} className="hover:text-blue-400 cursor-pointer transition-colors">강점</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400 cursor-pointer transition-colors">포트폴리오</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 cursor-pointer transition-colors">연락처</button>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            © {new Date().getFullYear()} Moon Ji-yeon. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Back to Top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-slate-900/90 text-white border border-slate-800 shadow-xl backdrop-blur-xs transition-all duration-300 z-50 cursor-pointer hover:bg-blue-600 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
        id="back-to-top-btn"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}

