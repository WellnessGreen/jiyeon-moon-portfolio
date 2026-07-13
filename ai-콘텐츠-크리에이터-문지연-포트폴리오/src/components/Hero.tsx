import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Video, FileText, ChevronRight } from 'lucide-react';

interface HeroProps {
  onPortfolioClick: () => void;
  onProjectsClick: () => void;
}

export default function Hero({ onPortfolioClick, onProjectsClick }: HeroProps) {
  const words = ['AI 캐릭터 브랜딩', 'AI 쇼츠 비디오 제작', '친환경 브랜드 로고 디자인', '교육용 인터랙티브 웹 게임', '상세페이지 기획 및 판매 SEO'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && displayedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white gradient-bg pt-20 px-6 md:px-12"
    >
      {/* Decorative Blur Orbs - Apple Style Soft Motion (Artistic Flair Theme) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft mint glow in top left */}
        <div className="absolute floating-obj blue-orb top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[60px] opacity-40 animate-pulse" style={{ animationDuration: '8s' }} />
        {/* Soft blue glow in bottom right */}
        <div className="absolute floating-obj mint-orb bottom-[-50px] right-[-50px] w-[350px] h-[350px] bg-teal-500 rounded-full blur-[60px] opacity-40 animate-pulse" style={{ animationDuration: '12s' }} />
        {/* Medium floating blue orb */}
        <div className="absolute top-[30%] right-[15%] w-80 h-80 rounded-full bg-blue-100/40 blur-[80px] animate-bounce" style={{ animationDuration: '10s' }} />
        {/* Small floating mint orb */}
        <div className="absolute bottom-[20%] left-[10%] w-64 h-64 rounded-full bg-teal-50/40 blur-[60px] animate-bounce" style={{ animationDuration: '14s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12">
        
        {/* Left: Text & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8 text-left">
          {/* Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50/60 border border-blue-100/50 shadow-xs backdrop-blur-xs animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '5s' }} />
            <span className="font-mono text-xs font-bold text-blue-600 tracking-wider uppercase">
              AI Content Creator & Digital Marketer
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-2xl animate-fade-in-up">
            <h1 className="font-sans font-extrabold text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] text-slate-900 leading-[1.15] tracking-tight">
              AI로 아이디어를 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">콘텐츠</span>로,<br />
              콘텐츠를 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">가치</span>로 연결합니다.
            </h1>
            {/* Elegant Typing Indicator */}
            <div className="h-8 flex items-center mt-3 bg-slate-50/50 border border-slate-100 px-4 py-1.5 rounded-xl backdrop-blur-md">
              <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2.5">Focus:</span>
              <span className="text-sm font-bold text-slate-700 font-sans border-r-2 border-blue-500 pr-1 select-none">
                {displayedText}
              </span>
            </div>
          </div>

          {/* Sub-text */}
          <p className="font-sans text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-xl animate-fade-in-up delay-100">
            안녕하세요.<br />
            AI와 디자인 기술을 활용하여 영상, 브랜딩, 디자인, 마케팅 콘텐츠를 제작하는 AI 콘텐츠 크리에이터 <strong className="text-slate-800 font-semibold">문지연</strong>입니다.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto animate-fade-in-up delay-200">
            <button
              onClick={onPortfolioClick}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-sm tracking-tight hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
              id="hero-portfolio-btn"
            >
              <span>포트폴리오 보기</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={onProjectsClick}
              className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm tracking-tight hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              id="hero-projects-btn"
            >
              <span>프로젝트 보기</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Micro stats banner for credibility */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 w-full max-w-md text-left">
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-800">6년+</div>
              <div className="text-xs text-slate-400 font-medium">블로그 제작 경력</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-800">90%</div>
              <div className="text-xs text-slate-400 font-medium">AI 제작 시간 단축</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-800">120만+</div>
              <div className="text-xs text-slate-400 font-medium">숏폼 마케팅 조회수</div>
            </div>
          </div>
        </div>

        {/* Right: Premium Glassmorphism Visual Showcase */}
        <div className="lg:col-span-5 relative w-full flex justify-center items-center lg:pl-4">
          <div className="relative w-full max-w-sm sm:max-w-md aspect-square bg-gradient-to-tr from-blue-50 to-emerald-50 rounded-[40px] p-6 flex items-center justify-center shadow-xl shadow-slate-100/50 border border-white">
            
            {/* Outer dotted grid pattern */}
            <div className="absolute inset-4 border border-dashed border-slate-200/60 rounded-[32px] pointer-events-none" />

            {/* Main Visual Image - Floating Card */}
            <div className="relative w-[85%] aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white group transition-all duration-500 hover:scale-[1.02]">
              <img
                src="/src/assets/images/hero_abstract_1783926923210.jpg"
                alt="AI Content Creator Abstract Artwork"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              
              {/* Glass Tag inside image */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-md flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Video Output</div>
                    <div className="text-xs font-bold text-slate-800">Interactive Art Vol. 12</div>
                  </div>
                </div>
                <div className="text-[10px] font-mono bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold">
                  RENDERED
                </div>
              </div>
            </div>

            {/* Floating Badge 1 - AI prompt */}
            <div className="absolute top-[8%] left-[2%] bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 flex items-center space-x-2 animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <span className="font-mono text-[10px] font-semibold text-slate-700">Prompt: "Apple-style fluid..."</span>
            </div>

            {/* Floating Badge 2 - Marketing KPI */}
            <div className="absolute bottom-[8%] right-[2%] bg-slate-900 px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2.5 animate-bounce" style={{ animationDuration: '5s' }}>
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-semibold text-slate-400 leading-none">Campaign CTR</span>
                <span className="text-xs font-bold text-white leading-none mt-1">4.8% (+250%)</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
