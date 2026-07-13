import { JOURNEY } from '../types';
import { BookOpen, ShoppingBag, Sparkles, Video, Award } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function MyJourney() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 animate-pulse" />;
      case 'Video':
        return <Video className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="journey" className="py-24 bg-white px-6 md:px-12 relative overflow-hidden">
      {/* Subtle abstract lines in background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-[20%] left-[50%] w-[1px] h-[60%] bg-gradient-to-b from-blue-200 via-emerald-200 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center space-y-4 mb-20">
            <span className="font-mono text-xs font-bold text-blue-500 tracking-widest uppercase">
              MY JOURNEY
            </span>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
              성장의 궤적: 아이디어에서 실전 마케팅까지
            </h2>
            <p className="text-slate-400 text-sm max-w-md">
              블로그 채널 구축부터 스마트스토어 실전 유통, 생성형 AI 신기술 섭렵까지의 타임라인입니다.
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Timeline Path Container */}
        <div className="relative max-w-4xl mx-auto" id="journey-timeline">
          {/* Central connecting vertical line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-slate-100" />

          {/* Timeline Steps */}
          <div className="space-y-12 md:space-y-20">
            {JOURNEY.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <ScrollReveal
                  key={step.year}
                  direction={isEven ? 'left' : 'right'}
                  delay={100}
                >
                  <div
                    className={`flex flex-col md:flex-row items-stretch ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                    id={`journey-step-${step.year}`}
                  >
                    {/* Left/Right Card Spacer */}
                    <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start px-0 md:px-8">
                      <div
                        className={`w-full bg-slate-50/50 hover:bg-white p-6 md:p-8 rounded-3xl border border-slate-100 hover:border-blue-100 shadow-2xs hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-500 text-left relative ${
                          isEven ? 'md:text-left' : 'md:text-left'
                        }`}
                      >
                        {/* Year Indicator & Badge */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="text-2xl font-black text-slate-900 font-mono tracking-tight flex items-center space-x-1">
                            <span className="text-blue-500">.</span>
                            <span>{step.year}</span>
                          </span>
                          {step.badge && (
                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-tight ${
                              step.year === '현재' 
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                : 'bg-blue-50 text-blue-600 border border-blue-100'
                            }`}>
                              {step.badge}
                            </span>
                          )}
                        </div>

                        {/* Content details */}
                        <h3 className="text-lg font-extrabold text-slate-800 tracking-tight mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Central Node Dot (desktop only) */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 z-20">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 shadow-sm transition-all duration-300 ${
                        step.year === '현재'
                          ? 'bg-slate-900 border-emerald-400 text-emerald-400 scale-110'
                          : 'bg-white border-slate-100 text-slate-400 hover:border-blue-300 hover:text-blue-500'
                      }`}>
                        {getIcon(step.icon)}
                      </div>
                    </div>

                    {/* Empty space filler for timeline layout (desktop only) */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
