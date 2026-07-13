import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'strength', label: 'Strengths' },
    { id: 'projects', label: 'Projects' },
    { id: 'journey', label: 'Journey' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md shadow-xs border-slate-100 py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center space-x-2.5 group cursor-pointer text-left"
          id="nav-logo-btn"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-sm shadow-blue-100 transition-all duration-500 group-hover:rotate-12">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-500 transition-colors duration-300 group-hover:text-emerald-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-slate-800 tracking-tight text-sm md:text-base">
              문지연 <span className="text-blue-500 font-medium">Ji-yeon Moon</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400 leading-none">
              AI Content Creator
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1.5" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 cursor-pointer ${
                activeSection === item.id
                  ? 'bg-blue-50/70 text-blue-600 border border-blue-100/50 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
              id={`nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="ml-4 px-4.5 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs tracking-tight transition-all duration-300 shadow-sm cursor-pointer shadow-slate-900/10 hover:shadow-blue-500/15"
            id="nav-hire-me-btn"
          >
            Hire Me
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors duration-300 text-slate-600 cursor-pointer"
          id="mobile-menu-toggle"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl animate-fade-in-down"
        >
          <div className="px-6 py-6 space-y-2 flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                id={`mobile-nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-4 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-sm tracking-tight transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer text-center"
              id="mobile-nav-hire-btn"
            >
              인사담당자 연락하기
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
