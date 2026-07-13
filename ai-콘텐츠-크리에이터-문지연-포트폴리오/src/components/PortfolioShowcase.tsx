import { useState } from 'react';
import { PROJECTS, Project } from '../types';
import { Sparkles, TrendingUp, Clock, X, ExternalLink, ChevronRight, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface PortfolioShowcaseProps {
  onOpenContact: () => void;
}

export default function PortfolioShowcase({ onOpenContact }: PortfolioShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'AI 영상 제작 & 마케팅', '브랜딩 & 디자인', '콘텐츠 기획 & 홍보마케팅', '디지털 마케팅 & 커머스'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-slate-50/40 px-6 md:px-12 border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <span className="font-mono text-xs font-bold text-blue-500 tracking-widest uppercase">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
              선별된 주요 프로젝트 성과
            </h2>
            <p className="text-slate-400 text-sm max-w-lg">
              AI 도구의 무한한 지평과 실전 기획력을 융합하여 도출한 실제 성과 위주의 결과물입니다.
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Filter Categories Chips */}
        <ScrollReveal duration={600}>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12" id="project-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200/60 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10" id="projects-grid">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} direction="up" delay={(index % 2) * 150}>
              <div
                onClick={() => setActiveModalProject(project)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-blue-100 card-hover shadow-xs transition-all duration-500 cursor-pointer flex flex-col h-full text-left"
                id={`project-card-${project.id}`}
              >
                {/* Card Image Container with overlay */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  
                  {/* Category Floating Tag */}
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold tracking-tight border border-white/20 shadow-xs">
                    {project.category}
                  </span>

                  {/* Metrics Indicator Floating Tag */}
                  {project.metrics && (
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10 flex items-center space-x-2">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />

                    <span className="text-white text-xs font-bold truncate">
                      {project.metrics}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold font-mono">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{project.period}</span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Skills Tags & Arrow */}
                <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-8">
                    {project.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 font-mono text-[10px] font-semibold border border-slate-100"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 4 && (
                      <span className="px-2 py-1 rounded-lg bg-slate-50 text-slate-400 font-mono text-[10px] font-semibold">
                        +{project.skills.length - 4}
                      </span>
                    )}
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-500 flex items-center justify-center shrink-0 transition-all duration-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Case Study Detail Overlay Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-55 flex items-center justify-center px-4"
          id="project-detail-modal-backdrop"
        >
          {/* Glass background overlay */}
          <div
            onClick={() => setActiveModalProject(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer transition-opacity duration-300"
          />
          
          {/* Card Body - Apple Style sliding sheet */}
          <div
            className="relative bg-white w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-100 text-slate-800 animate-fade-in-up"
            id="project-detail-modal-content"
          >
            {/* Header image with close button */}
            <div className="relative h-64 md:h-80 bg-slate-100">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="px-3 py-1 rounded-xl bg-blue-500/80 backdrop-blur-xs text-[10px] font-bold tracking-tight">
                  {activeModalProject.category}
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight mt-3">
                  {activeModalProject.title}
                </h3>
              </div>
            </div>

            {/* Content body */}
            <div className="p-6 md:p-8 space-y-6 text-left">
              {/* Meta stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">진행 기간</span>
                  <span className="text-xs font-semibold text-slate-700 mt-1 block">{activeModalProject.period}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">사용 핵심 도구</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activeModalProject.skills.map(s => (
                      <span key={s} className="text-[9px] font-semibold bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">핵심 지표 (KPI)</span>
                  <span className="text-xs font-bold text-emerald-600 mt-1 block truncate">
                    {activeModalProject.metrics || '품질 및 만족도 완수'}
                  </span>
                </div>
              </div>

              {/* Detailed narrative block */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Project Overview & Challenge</span>
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {activeModalProject.detailedDescription}
                </p>
              </div>

              {/* Value Add Checklist */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  기여 성과 및 마케팅 가치
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-600 leading-normal">생성형 AI 워크플로우 적용으로 기존 비디오 콘텐츠 대비 기획·제작 리드 타임 80% 단축</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-600 leading-normal">데이터 분석 기반 타겟 맞춤 카피라이팅 설계로 채널 도달률 및 클릭 전환율 최고기록 갱신</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-600 leading-normal">정밀 백터 편집 및 브랜딩 가이드 라인 준수로 최종 디자인 원본의 상용 가치 극대화</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-600 leading-normal">블로그/커머스 실전 운영 경험을 투영해 마케터 관점의 다각화된 유입 구조 구축</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-blue-600 font-bold text-xs tracking-tight transition-all duration-300 flex items-center space-x-2 shadow-xs cursor-pointer"
                >
                  <span>이 프로젝트에 관해 문의하기</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-600 font-bold text-xs transition-colors cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
