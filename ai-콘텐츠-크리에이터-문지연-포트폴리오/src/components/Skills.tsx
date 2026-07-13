import { useState } from 'react';
import { SKILLS, SkillItem } from '../types';
import { Sparkles, Library, FileCode2, Megaphone, Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI Tools', 'Design & Video', 'Marketing & Development'];

  const getFilteredSkills = () => {
    if (selectedCategory === 'All') return SKILLS;
    if (selectedCategory === 'Marketing & Development') {
      return SKILLS.filter(s => s.category === 'Marketing' || s.category === 'Development');
    }
    return SKILLS.filter(s => s.category === selectedCategory);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI Tools':
        return <Sparkles className="w-4 h-4 text-blue-500" />;
      case 'Design & Video':
        return <Library className="w-4 h-4 text-emerald-500" />;
      case 'Marketing':
      case 'Marketing & Development':
        return <Megaphone className="w-4 h-4 text-purple-500" />;
      case 'Development':
        return <FileCode2 className="w-4 h-4 text-indigo-500" />;
      default:
        return <Check className="w-4 h-4 text-slate-400" />;
    }
  };

  const renderRatingDots = (level: number) => {
    return (
      <div className="flex items-center space-x-1" aria-label={`Proficiency level ${level} out of 5`}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              dot <= level
                ? 'bg-gradient-to-r from-blue-500 to-emerald-400 scale-110'
                : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="skills" className="py-24 bg-slate-50/50 border-y border-slate-100 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-100/20 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <span className="font-mono text-xs font-bold text-emerald-500 tracking-widest uppercase">
              SKILLS
            </span>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
              보유 전문 도구 및 마케팅 역량
            </h2>
            <p className="text-slate-400 text-sm max-w-md">
              생성형 AI 융합 콘텐츠 제작과 실전 브랜드 확장을 위한 기술 셋업입니다.
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Categories Tab Selector */}
        <ScrollReveal duration={600}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12" id="skill-categories">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-bold tracking-tight transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200/60 hover:border-slate-300'
                }`}
              >
                {selectedCategory === cat && getCategoryIcon(cat === 'All' ? 'AI Tools' : cat)}
                <span>{cat === 'Marketing & Development' ? 'Marketing & Dev' : cat}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="skills-grid">
          {getFilteredSkills().map((skill, index) => (
            <ScrollReveal key={skill.name} direction="up" delay={(index % 4) * 100}>
              <div
                className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200/60 shadow-xs hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-500 flex flex-col justify-between text-left h-full"
                id={`skill-card-${skill.name.toLowerCase().replace(/ /g, '-')}`}
              >
                <div className="space-y-4">
                  {/* Card Header: Icon & Rating Dots */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors flex items-center justify-center">
                      {getCategoryIcon(skill.category)}
                    </div>
                    {renderRatingDots(skill.level)}
                  </div>

                  {/* Skill Name & Type */}
                  <div>
                    <h3 className="font-bold text-slate-800 tracking-tight text-base group-hover:text-blue-600 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* Real World Application Text */}
                <p className="text-slate-500 text-xs leading-relaxed mt-4 pt-4 border-t border-slate-50 font-normal">
                  {skill.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
