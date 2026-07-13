import { useState } from 'react';
import { STRENGTHS } from '../types';
import { Sparkles, BrainCircuit, Zap, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function MyStrength() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'ai-capability':
        return <BrainCircuit className="w-5 h-5 text-blue-500" />;
      case 'planning':
        return <Sparkles className="w-5 h-5 text-emerald-500" />;
      case 'execution':
        return <Zap className="w-5 h-5 text-orange-500" />;
      case 'consistency':
        return <Clock className="w-5 h-5 text-indigo-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <section id="strength" className="py-24 bg-white px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <span className="font-mono text-xs font-bold text-emerald-500 tracking-widest uppercase">
              MY STRENGTH
            </span>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
              성공적인 비즈니스를 만드는 4가지 강점
            </h2>
            <p className="text-slate-400 text-sm max-w-md">
              각 강점을 클릭하시면 구체적인 실행 경험과 역량 증명 방식을 보실 수 있습니다.
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Strength Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="strengths-grid">
          {STRENGTHS.map((strength, index) => {
            const isExpanded = expandedId === strength.id;
            return (
              <ScrollReveal key={strength.id} direction="up" delay={index * 100}>
                <div
                  onClick={() => toggleExpand(strength.id)}
                  className={`group text-left p-8 rounded-[28px] border card-hover transition-all duration-500 cursor-pointer ${
                    isExpanded
                      ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 shadow-xl shadow-slate-950/10 text-white transform scale-[1.01]'
                      : 'bg-white border-slate-100 hover:border-blue-100 shadow-xs text-slate-800'
                  }`}
                  id={`strength-card-${strength.id}`}
                >
                  <div className="flex justify-between items-start">
                    {/* Left: Icon & Sequence */}
                    <div className="flex items-center space-x-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isExpanded ? 'bg-white/10 text-white' : 'bg-white shadow-2xs border border-slate-100 text-slate-800'
                      }`}>
                        {getIcon(strength.id)}
                      </div>
                      <span className={`font-mono text-xs font-bold tracking-widest ${
                        isExpanded ? 'text-emerald-400' : 'text-blue-500'
                      }`}>
                        STRENGTH {strength.number}
                      </span>
                    </div>

                    {/* Right: Sequence indicator */}
                    <span className={`font-sans font-black text-4xl leading-none opacity-25 tracking-tight ${
                      isExpanded ? 'text-white' : 'text-slate-300 group-hover:text-blue-500 group-hover:opacity-60 transition-colors'
                    }`}>
                      {strength.number}
                    </span>
                  </div>

                  {/* Card Title & Brief Description */}
                  <h3 className={`text-xl font-extrabold tracking-tight mt-6 ${
                    isExpanded ? 'text-white' : 'text-slate-800'
                  }`}>
                    {strength.title}
                  </h3>
                  
                  <p className={`text-sm mt-3.5 leading-relaxed ${
                    isExpanded ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {strength.description}
                  </p>

                  {/* Expandable detail tray */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-80 opacity-100 mt-6 pt-6 border-t border-slate-800/80' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
                      How I Prove This:
                    </p>
                    <ul className="space-y-2.5">
                      {strength.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300 leading-relaxed">
                          <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Toggle button */}
                  <div className="flex justify-end mt-4">
                    <div className={`flex items-center space-x-1.5 text-xs font-semibold ${
                      isExpanded ? 'text-emerald-400' : 'text-slate-400 group-hover:text-blue-500 transition-colors'
                    }`}>
                      <span>{isExpanded ? '간략히 보기' : '역량 상세 보기'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 animate-bounce" />}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
