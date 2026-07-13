import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

interface StatCardProps {
  key?: React.Key;
  endValue: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

function StatCounterCard({ endValue, suffix, label, description, icon }: StatCardProps) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000; // 2 seconds
          const increment = endValue / (duration / 16); // ~60fps

          const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
              setCount(endValue);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [endValue, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className="group bg-white p-8 rounded-[32px] border border-slate-100 shadow-xs card-hover flex flex-col justify-between h-full relative overflow-hidden transition-all duration-500 hover:border-blue-100"
    >
      {/* Decorative top soft bar highlight */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div>
        {/* Icon container */}
        <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-blue-50 transition-colors flex items-center justify-center mb-6">
          {icon}
        </div>

        {/* Counter Number */}
        <div className="flex items-baseline space-x-1.5">
          <span className="font-sans font-black text-4xl sm:text-5xl text-slate-900 tracking-tight transition-colors group-hover:text-blue-600">
            {count}
          </span>
          <span className="font-sans font-extrabold text-2xl text-blue-500">
            {suffix}
          </span>
        </div>

        {/* Label */}
        <h3 className="font-bold text-slate-800 text-base mt-4 tracking-tight">
          {label}
        </h3>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-xs mt-3 leading-relaxed border-t border-slate-50 pt-4 font-normal">
        {description}
      </p>
    </div>
  );
}

export default function PerformanceStats() {
  const stats = [
    {
      endValue: 6,
      suffix: '년+',
      label: 'Years of Blogging',
      description: '6년 연속 라이프스타일 및 테크 블로그 운영 경험을 통한 꾸준한 오리지널 기획 및 채널 성장',
      icon: <Award className="w-5.5 h-5.5 text-blue-500" />,
    },
    {
      endValue: 20,
      suffix: '개+',
      label: 'AI Projects',
      description: '생성형 비디오 워크플로우부터 지능형 챗봇, 교육용 대화형 게임 앱 등 20회 이상의 다양한 AI 연계 섭렵',
      icon: <Sparkles className="w-5.5 h-5.5 text-emerald-500" />,
    },
    {
      endValue: 100,
      suffix: '개+',
      label: 'Design Works',
      description: '풍부한 실전 쇼핑몰 상세페이지, 브랜드 CI/BI 로고 가이드 라인, 카드뉴스 비주얼 릴리즈 완수',
      icon: <ShieldCheck className="w-5.5 h-5.5 text-indigo-500" />,
    },
    {
      endValue: 6,
      suffix: '년+',
      label: 'Years of Content Creation',
      description: '네이버 스마트스토어 상세페이지 스토리 기획, 소셜미디어 숏폼 영상 및 홍보 광고 다각화 기여',
      icon: <HeartHandshake className="w-5.5 h-5.5 text-orange-500" />,
    },
  ];

  return (
    <section className="py-20 bg-slate-50/50 border-y border-slate-100 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[50%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-blue-100/20 blur-[100px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-emerald-100/20 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section title */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="font-mono text-xs font-bold text-blue-500 tracking-widest uppercase">
            PERFORMANCE METRICS
          </span>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            수치로 증명하는 콘텐츠의 파급력
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
        </div>

        {/* Counter cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="performance-stats-grid">
          {stats.map((stat, index) => (
            <StatCounterCard
              key={index}
              endValue={stat.endValue}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
