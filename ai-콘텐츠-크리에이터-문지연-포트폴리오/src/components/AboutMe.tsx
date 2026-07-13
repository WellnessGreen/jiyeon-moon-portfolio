import { Sparkles, Calendar, MapPin, Search, GraduationCap, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function AboutMe() {
  const roles = [
    { title: 'AI 콘텐츠 크리에이터', desc: '생성형 AI로 영상 및 비주얼 생산' },
    { title: '디지털 마케터', desc: '스마트스토어 및 브랜드 마케팅 기획' },
    { title: 'AI 영상 제작', desc: '숏폼 영상 및 브랜드 필름 하이브리드 포스트 프로덕션' },
    { title: '홍보마케팅', desc: '소셜 미디어 채널 확장 및 카피라이팅' }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50/50 border-y border-slate-100 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-radial-gradient from-blue-100/30 to-transparent rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <span className="font-mono text-xs font-bold text-blue-500 tracking-widest uppercase">
              ABOUT ME
            </span>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
              기술과 감성을 연결하는 가치 크리에이터
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Avatar & Core Information */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <ScrollReveal direction="left" delay={100}>
              <div className="relative group">
                {/* Animated glowing back ring */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 opacity-70 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:scale-102" />
                
                {/* Inner white spacer */}
                <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full p-2 bg-white">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                    <img
                      src="/src/assets/images/profile_avatar_1783926936823.jpg"
                      alt="문지연 프로필 사진"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Float decorative tag */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-slate-900 text-white shadow-lg border border-slate-800 text-xs font-bold tracking-tight whitespace-nowrap flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>문 지 연 | Ji-yeon Moon</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Micro Details Grid */}
            <ScrollReveal direction="up" delay={200}>
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-12 text-slate-500 text-xs">
                <div className="flex items-center space-x-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                  <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Birth Date</p>
                    <p className="font-semibold text-slate-700 mt-1">1996.08.15</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Location</p>
                    <p className="font-semibold text-slate-700 mt-1">Seoul, Korea</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs col-span-2">
                  <GraduationCap className="w-4 h-4 text-purple-500 shrink-0" />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Education</p>
                    <p className="font-semibold text-slate-700 mt-1">미디어커뮤니케이션 & 홍보 마케팅 전공</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Side: Introduction & Badges */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
            <ScrollReveal direction="right" delay={150}>
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-emerald-500 tracking-widest uppercase">
                  HELLO, I AM CREATOR
                </span>
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                  "새로운 도구를 수용하고, 그것으로 완벽한 가치를 만듭니다."
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                  새로운 AI 기술을 빠르게 배우고 실제 프로젝트에 적용하는 것을 좋아합니다.<br />
                  기존의 작업 방식에만 갇혀 있기보다 대규모 생성형 모델과 정밀 수작업을 결합한 스마트한 크리에이티브 워크플로우를 독자적으로 수립하는 능력을 쌓아왔습니다.
                </p>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                  아이디어를 단순 브레인스토밍 단계에 머무르게 하지 않고, <strong>기획부터 시작해 고품질 그래픽 디자인, 감각적 비디오 영상, 감성을 터치하는 스토리 브랜딩까지</strong> 정밀한 완성도의 단일 결과물로 빠르게 완성해 내는 것이 저의 독보적인 강점입니다.
                </p>
              </div>
            </ScrollReveal>

            {/* Specific Job Roles - Visual Grid */}
            <div className="w-full space-y-4">
              <ScrollReveal direction="up" delay={250}>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Core Professional Roles</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {roles.map((role, idx) => (
                    <div
                      key={idx}
                      className="group bg-white p-4.5 rounded-2xl border border-slate-100 shadow-xs card-hover transition-all duration-300 flex items-start space-x-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 group-hover:from-blue-500 group-hover:to-emerald-400 flex items-center justify-center shrink-0 transition-all duration-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-slate-800 text-sm tracking-tight group-hover:text-blue-600 transition-colors">
                          {role.title}
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                          {role.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
