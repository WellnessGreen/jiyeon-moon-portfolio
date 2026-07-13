export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedDescription: string;
  image: string;
  skills: string[];
  metrics?: string;
  period: string;
}

export interface Strength {
  id: string;
  title: string;
  number: string;
  description: string;
  details: string[];
}

export interface JourneyStep {
  year: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface SkillItem {
  name: string;
  category: 'AI Tools' | 'Design & Video' | 'Development' | 'Marketing';
  level: number; // 1 to 5
  description: string;
}

export interface ContactInfo {
  label: string;
  value: string;
  icon: string;
  url: string;
  color: string;
}

export const STRENGTHS: Strength[] = [
  {
    id: 'ai-capability',
    number: '01',
    title: 'AI 활용 능력',
    description: '다양한 생성형 AI를 활용하여 콘텐츠 제작 시간을 단축하고 높은 완성도의 결과물을 제작합니다.',
    details: [
      'ChatGPT & Claude: 카피라이팅, 기획안, 시나리오 작성 자동화',
      'Gemini & Google AI Studio: 대규모 콘텐츠 분석 및 아이디어 브레인스토밍',
      'Midjourney & Stable Diffusion: 고품질 브랜드 그래픽 및 가상 비주얼 구현',
      'Runway & ElevenLabs: AI 영상 제작 및 자연스러운 다국어 음성 합성 조율'
    ]
  },
  {
    id: 'planning',
    number: '02',
    title: '콘텐츠 기획',
    description: '아이디어를 콘텐츠와 브랜드로 발전시키는 전략적인 기획 능력이 있습니다.',
    details: [
      '시장 트렌드 및 유저 타겟팅 분석 기반 콘텐츠 설계',
      '스토리보드 작성 및 플랫폼별 최적화된 포맷 구성',
      '브랜드 정체성을 강화하는 오리지널 스토리텔링 수립',
      '이탈률을 낮추고 참여율을 극대화하는 상세페이지/콘텐츠 레이아웃 기획'
    ]
  },
  {
    id: 'execution',
    number: '03',
    title: '실행력',
    description: '생각을 실제 결과물로 빠르게 구현하고 끊임없이 테스트하여 고도화합니다.',
    details: [
      '기획에서 제작(디자인, 영상, 카피)까지 전 과정을 1인 제어 가능',
      '애자일(Agile)한 방식으로 아이디어를 24시간 내에 MVP 콘텐츠로 출시',
      '유저 반응 및 전환 데이터를 즉각 모니터링하고 피드백 적용',
      '도구의 한계에 부딪혔을 때 새로운 워크플로우를 스스로 학습해 대안 제시'
    ]
  },
  {
    id: 'consistency',
    number: '04',
    title: '꾸준함',
    description: '6년 동안 네이버 블로그를 직접 기획 및 운영하며 지속적으로 콘텐츠를 생산해 왔습니다.',
    details: [
      '6년간 누적 방문자 수 및 충성 독자층 유지 관리 경험',
      '꾸준한 트렌드 조사와 매주 정기적인 콘텐츠 발행 루틴 확립',
      '검색엔진 최적화(SEO)와 키워드 마케팅의 실전 체화',
      '단기성 유행에 흔들리지 않는 롱런형 브랜딩 노하우'
    ]
  }
];

export const JOURNEY: JourneyStep[] = [
  {
    year: '2019',
    title: '네이버 블로그 시작',
    description: '디지털 세계의 첫 발걸음. 라이프스타일과 트렌드를 다루며 콘텐츠 기획 및 작성 능력을 기르고, 검색엔진 최적화(SEO)의 기본 원리를 몸소 체득했습니다. 6년간 지속 가능한 업로드 루틴을 설계했습니다.',
    icon: 'BookOpen',
    badge: '스타트'
  },
  {
    year: '2021',
    title: '스마트스토어 운영',
    description: '이커머스 비즈니스의 실전. 타겟 소싱부터 전환율 높은 상세페이지 기획 및 제작, 네이버 쇼핑 검색 광고 집행 및 유저 분석 등 마케터로서의 실제 판매 흐름과 비즈니스 감각을 익혔습니다.',
    icon: 'ShoppingBag',
    badge: '도전'
  },
  {
    year: '2023',
    title: 'AI 콘텐츠 제작 전문성 확보',
    description: 'AI 도구의 출현과 함께 폭발적인 생산성을 탑재. ChatGPT, Midjourney, Claude 등 생성형 AI 툴을 브랜딩 및 콘텐츠 워크플로우에 통합시켜 전통적인 제작 시간을 최대 80% 단축하는 기법을 마스터했습니다.',
    icon: 'Sparkles',
    badge: '혁신'
  },
  {
    year: '2025',
    title: 'AI 영상 크리에이터 과정 수료',
    description: '텍스트와 이미지를 넘어 영상 영역으로 확장. AI 비디오 프롬프트 엔지니어링, Runway/Sora 등 최신 AI 비디오 제너레이터 활용법, Premiere Pro & After Effects를 접목한 하이브리드 포스트 프로덕션 기술을 수료했습니다.',
    icon: 'Video',
    badge: '성장'
  },
  {
    year: '현재',
    title: 'AI 콘텐츠 크리에이터 & 마케터',
    description: 'AI가 제공하는 무한한 잠재력과 탄탄한 기획/실행 마케팅 역량을 결합하여, 기업의 브랜드 가치를 폭발적으로 상승시키는 콘텐츠를 개발하는 트렌디한 전문가로 활약 중입니다.',
    icon: 'Award',
    badge: '도약'
  }
];

export const SKILLS: SkillItem[] = [
  // AI Tools
  { name: 'ChatGPT', category: 'AI Tools', level: 5, description: '기획안, 카피라이팅, 영상 시나리오 제작의 핵심 오케스트레이터' },
  { name: 'Claude', category: 'AI Tools', level: 5, description: '논리적인 긴 글 작성 및 구조적인 브랜드 스토리 분석' },
  { name: 'Gemini', category: 'AI Tools', level: 4, description: '실시간 구글 검색 및 고속 멀티모달 정보 수집 및 가공' },
  { name: 'Google AI Studio', category: 'AI Tools', level: 4, description: 'API 프로토타이핑 및 고도의 시스템 프롬프트 미세 조정' },
  
  // Design & Video
  { name: 'Photoshop', category: 'Design & Video', level: 5, description: 'AI 생성 이미지를 포함한 정밀한 포스터 및 마케팅 배너 보정' },
  { name: 'Illustrator', category: 'Design & Video', level: 4, description: '로고, 아이콘, 브랜드 디자인 가이드의 벡터화 및 편집' },
  { name: 'Premiere Pro', category: 'Design & Video', level: 5, description: '효과적인 컷 편집, 자막 템플릿, 그리고 AI 오디오 정렬 및 믹싱' },
  { name: 'After Effects', category: 'Design & Video', level: 3, description: '고급 모션 그래픽스, 인트로 자막 효과 및 시각 전환 효과 적용' },
  
  // Marketing & Development
  { name: 'SEO & Copywriting', category: 'Marketing', level: 5, description: '검색엔진 최적화 상위 노출 전략 및 행동 촉구 카피라이팅' },
  { name: 'Digital Ad Campaigns', category: 'Marketing', level: 4, description: '네이버 쇼핑 광고 및 SNS 타겟 광고 유입 및 ROI 관리' },
  { name: 'HTML & CSS', category: 'Development', level: 4, description: '마케팅용 고품질 랜딩페이지 및 포트폴리오 웹사이트 퍼블리싱' },
  { name: 'JavaScript', category: 'Development', level: 3, description: '웹 화면 제어, 마우스 인터랙션 및 동적 기능 구현 능력' }
];

export const PROJECTS: Project[] = [
  {
    id: 'ai-character-kiki',
    title: "AI 캐릭터 브랜딩 '키키'",
    category: 'AI 영상 제작 & 마케팅',
    description: "독창적인 고양이 캐릭터 '키키'의 독자적 세계관 기획부터 생성형 AI 비주얼 구현, 쇼츠 홍보 영상 제작까지 아우르는 메타버스형 브랜딩 프로젝트.",
    detailedDescription: "독창적인 고양이 캐릭터 '키키'를 구심점으로 하는 메타버스 캐릭터 브랜딩 워크플로우를 완성했습니다.\n\nChatGPT와 Claude를 사용하여 성격, 배경 스토리, 유머 코드를 아우르는 독자적인 세계관 기획을 수립했습니다. 이후 Midjourney를 사용하여 다양한 감정 및 시각적 일관성을 갖춘 캐릭터 AI 이미지를 반복 정밀 생성해 냈습니다.\n\n최종 가공된 이미지 소스들을 Runway와 ElevenLabs로 연계해 생동감 넘치는 고품질 쇼츠 비디오 콘텐츠로 연출했으며, 소셜 미디어 배포를 통해 팬덤층을 확보하는 전방위적 AI 브랜딩 가치를 설계했습니다.",
    image: '/src/assets/images/hero_abstract_1783926923210.jpg',
    skills: ['키키', '세계관 기획', 'AI 이미지 제작', '쇼츠 제작', '브랜딩', 'Midjourney', 'ChatGPT', 'Runway', 'ElevenLabs'],
    metrics: '콘텐츠 발행 2주 만에 숏폼 누적 조회수 45만회 돌파',
    period: '2025.01 - 2025.02'
  },
  {
    id: 'ai-shorts-judgement',
    title: '소년심판 AI 쇼츠 제작 및 마케팅 캠페인',
    category: 'AI 영상 제작 & 마케팅',
    description: "인기 미디어 '소년심판'의 긴장감 넘치는 하이라이트를 AI 성우 더빙, AI 이미지 생성, 그리고 Premiere Pro 고도화 기법으로 재창조한 숏폼 프로젝트.",
    detailedDescription: "'소년심판' 드라마의 감정적 갈등과 핵심 메시지를 압축해 60초 내로 완벽히 흡수시킬 수 있는 고밀도 AI 쇼츠를 제작했습니다.\n\n시나리오 분석 및 대사 재구성을 통해 긴장감을 최대화하는 스크립트를 도출했습니다. ElevenLabs와 가상 AI 성우 시스템을 조율해 인상 깊은 AI 더빙 사운드를 설계했으며, 분위기에 매칭되는 일러스트형 이미지를 생성형 AI로 보충 제작했습니다.\n\n최종적으로 Premiere Pro의 템플릿 제어와 박진감 넘치는 타이포그래피 모션 자막, 사운드 믹싱을 접목해 도달률 높은 쇼츠를 성공리에 배포했습니다.",
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    skills: ['소년심판 AI 쇼츠', 'AI 더빙', 'AI 이미지 생성', 'Premiere 편집', 'ElevenLabs', 'Premiere Pro'],
    metrics: '단일 쇼츠 조회수 75만회 달성 및 시청 유지율 62% 달성',
    period: '2024.12 - 2025.01'
  },
  {
    id: 'green-start-branding',
    title: "친환경 브랜드 'Green Start' 로고 및 패키지 디자인",
    category: '브랜딩 & 디자인',
    description: "'Green Start'가 제안하는 친환경 에코 비즈니스의 상징적 로고 및 가이드라인, 환경 호르몬 없는 친환경 패키지 디자인 설계.",
    detailedDescription: "'Green Start' 친환경 브랜드를 정밀 론칭하기 위해 현대적인 브랜드 디자인 로고와 서체 규격, 심볼마크를 통합 브랜딩했습니다.\n\n미니멀한 잎사귀와 화살표의 융합 구조를 통해 지속 가능한 '새로운 시작'의 약속을 직관적으로 시각화했습니다.\n\n인체 무해성 수성 잉크와 생분해 종이 패키지를 가정한 가상 3D 목업 패키지 디자인을 Photoshop 및 Illustrator로 완성해 냈으며, 브랜드 가치에 부합하는 정교한 그린 그라데이션 팔레트 가이드를 완수해 상용화 승인을 받았습니다.",
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    skills: ['Green Start', '친환경 브랜드 로고', '패키지 디자인', '브랜딩', 'Illustrator', 'Photoshop'],
    metrics: '통합 브랜딩 만족도 100%, 패키지 가이드라인 실 제작 적용',
    period: '2024.10 - 2024.11'
  },
  {
    id: 'forest-baduk-game',
    title: "교육용 바둑 학습 게임 '숲속 바둑 놀이터'",
    category: '콘텐츠 기획 & 홍보마케팅',
    description: '어린이들이 자연스러운 환경에서 바둑의 기초를 놀이처럼 배울 수 있도록 Google AI Studio 및 바이브 코딩으로 제작된 대화형 웹 게임.',
    detailedDescription: "'숲속 바둑 놀이터'는 어린이 교육용 게임 콘텐츠로, 복잡하고 지루한 바둑의 초기 입문 단계를 동화적인 숲속 동물 세계관으로 풀어낸 인터랙티브 웹 프로그램입니다.\n\nGoogle AI Studio를 활용하여 사용자의 진척 단계에 맞춰 실시간 규칙 설명과 맞춤형 힌트를 제공하는 똑똑한 학습 동반자 AI 캐릭터의 백엔드 대화 로직을 기획했습니다.\n\n이후 바이브 코딩(Vibe Coding) 방법론을 수용하여 마우스 클릭과 반응형 CSS 터치 인터랙션을 HTML, CSS, JavaScript 순수 기술로 완벽히 연계 설계하여, 교사 및 학부모들 사이에서 탁월한 교육 교구로서 인정을 받았습니다.",
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
    skills: ['숲속 바둑 놀이터', 'Google AI Studio', '바이브 코딩', 'HTML', 'CSS', 'JavaScript'],
    metrics: '웹 베타 출시 후 한 달간 어린이 사용자 재방문율 78% 기록',
    period: '2024.08 - 2024.09'
  },
  {
    id: 'naver-smartstore-branding',
    title: '네이버 스마트스토어 상세페이지 제작 및 운영 브랜딩',
    category: '디지털 마케팅 & 커머스',
    description: 'AIDA 유저 심리 모델을 상세페이지 레이아웃에 직접 투영하고, 검색 키워드 타겟 다변화로 이탈률을 방어하고 실제 매출을 견인한 실전 이커머스.',
    detailedDescription: "네이버 스마트스토어 실전 운영 경력을 집약하여, 유입된 고객의 시선을 단 3초 내에 고정시키고 구매를 결제하게끔 유도하는 고도의 상세페이지를 직접 기획 및 제작했습니다.\n\n유행 트렌드 및 유저 타겟팅 분석 데이터에 근거해 '흥미 유발(Attention)'부터 '행동 촉구(Action)'로 연결되는 AIDA 스토리텔링 레이아웃으로 상세페이지를 전면 구성했습니다.\n\n또한 네이버 쇼핑 SEO 친화형 키워드를 상품명과 상세 속성에 영리하게 배치하고 맞춤형 온라인 쇼핑 광고를 집행해 실전에 즉시 유효한 브랜딩 마케팅 성과를 만들어냈습니다.",
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    skills: ['상세페이지 제작', '브랜딩', '온라인 판매', '스마트스토어', 'SEO', '디지털 마케팅'],
    metrics: '상세페이지 이탈률 22% 감소 및 온라인 유입 매출 전환율 240% 달성',
    period: '2024.05 - 2024.07'
  }
];

export const CONTACTS: ContactInfo[] = [
  {
    label: '이메일',
    value: 'friendshiplpl@gmail.com',
    icon: 'Mail',
    url: 'mailto:friendshiplpl@gmail.com',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    label: 'GitHub',
    value: 'github.com/mjiyeon-dev',
    icon: 'Github',
    url: 'https://github.com',
    color: 'from-slate-800 to-slate-900'
  },
  {
    label: 'Notion 포트폴리오',
    value: 'mjiyeon.notion.site',
    icon: 'FileText',
    url: 'https://notion.so',
    color: 'from-neutral-700 to-neutral-800'
  },
  {
    label: '네이버 블로그',
    value: 'blog.naver.com/mjiyeon_creator',
    icon: 'BookOpen',
    url: 'https://blog.naver.com',
    color: 'from-emerald-500 to-green-600'
  },
  {
    label: 'YouTube 채널',
    value: 'youtube.com/@ai_mjiyeon',
    icon: 'Youtube',
    url: 'https://youtube.com',
    color: 'from-red-500 to-rose-600'
  }
];
