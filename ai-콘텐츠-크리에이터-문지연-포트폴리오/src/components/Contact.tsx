import React, { useState } from 'react';
import { CONTACTS } from '../types';
import { Mail, Github, FileText, BookOpen, Youtube, Copy, Check, Send, Sparkles, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail':
        return <Mail className="w-5 h-5" />;
      case 'Github':
        return <Github className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Youtube':
        return <Youtube className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  const handleCopy = (value: string, label: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering parent anchor
    navigator.clipboard.writeText(value);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('sending');
    // Simulate high-end server processing
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', company: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-white px-6 md:px-12 relative overflow-hidden">
      {/* Decorative radial gradients for high-end backdrop */}
      <div className="absolute top-[-20%] left-[-20%] w-[50vw] h-[50vw] rounded-full bg-emerald-50/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] rounded-full bg-blue-50/50 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <span className="font-mono text-xs font-bold text-blue-500 tracking-widest uppercase">
              CONTACT ME
            </span>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
              새로운 가치를 함께 만들 준비가 되셨나요?
            </h2>
            <p className="text-slate-400 text-sm max-w-md">
              이메일 복사 또는 제안 폼을 통해 문지연 크리에이터에게 신속하게 제안을 전달하세요.
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Beautiful Contact Board/Form */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left" delay={100}>
              <div className="bg-slate-50/50 p-6 md:p-8 rounded-[32px] border border-slate-100/80 text-left w-full">
                <div className="flex items-center space-x-2.5 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                    인사담당자 전용 빠른 메시지
                  </h3>
                </div>

                {formStatus === 'success' ? (
                  <div className="py-12 px-4 text-center space-y-4 bg-white rounded-2xl border border-emerald-100 shadow-sm animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-800">제안서가 성공적으로 임시 접수되었습니다!</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                      작성해주신 내용이 성공적으로 전달되었습니다. 남겨주신 연락처를 통해 문지연 크리에이터가 신속하게 연락드리겠습니다. 감사합니다!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4" id="contact-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="form-name" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          성함 / 담당자명 *
                        </label>
                        <input
                          type="text"
                          id="form-name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="홍길동 님"
                          className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 outline-hidden transition-all placeholder-slate-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="form-company" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          회사명 / 소속
                        </label>
                        <input
                          type="text"
                          id="form-company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="구글 코리아"
                          className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 outline-hidden transition-all placeholder-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="form-email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        회신받을 이메일 주소 *
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="recruiter@company.com"
                        className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 outline-hidden transition-all placeholder-slate-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="form-message" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        제안 및 문의 내용 *
                      </label>
                      <textarea
                        id="form-message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="AI 콘텐츠 크리에이티브 협업 제안 또는 면접 일정 등 제안 내용을 작성해주세요."
                        className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-800 outline-hidden transition-all placeholder-slate-300 resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm tracking-tight transition-all duration-300 flex items-center justify-center space-x-2 shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50"
                      id="contact-submit-btn"
                    >
                      <Send className="w-4 h-4" />
                      <span>{formStatus === 'sending' ? '제안 전송 중...' : '협업 제안 전송하기'}</span>
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Premium Links cards */}
          <div className="lg:col-span-6 space-y-4">
            <ScrollReveal direction="right" delay={150}>
              <div className="w-full space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left pl-1">
                  Direct Channels & Networks
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="contact-channels">
                  {/* Copyable Email Card - High Priority */}
                  <div
                    onClick={(e) => handleCopy('friendshiplpl@gmail.com', '이메일', e)}
                    className="group bg-slate-50/50 hover:bg-white p-5 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer text-left flex flex-col justify-between h-36 transition-all duration-300 col-span-1 sm:col-span-2 relative overflow-hidden"
                  >
                    {/* Accent Background line */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-radial-gradient from-blue-50 to-transparent rounded-full pointer-events-none" />

                    <div className="flex justify-between items-start">
                      <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                        <Mail className="w-4.5 h-4.5" />
                      </div>
                      <button
                        onClick={(e) => handleCopy('friendshiplpl@gmail.com', '이메일', e)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                        aria-label="Copy Email"
                      >
                        {copiedLabel === '이메일' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest">이메일 (클릭하여 복사)</span>
                        {copiedLabel === '이메일' && (
                          <span className="text-[9px] font-bold text-emerald-500 animate-fade-in">복사 완료!</span>
                        )}
                      </div>
                      <p className="text-sm font-extrabold text-slate-800 tracking-tight mt-1 truncate">
                        friendshiplpl@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Other channels */}
                  {CONTACTS.filter(c => c.label !== '이메일').map((channel) => (
                    <a
                      key={channel.label}
                      href={channel.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group bg-slate-50/50 hover:bg-white p-5 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 text-left flex flex-col justify-between h-36 transition-all duration-300"
                      id={`contact-card-${channel.label.toLowerCase().replace(/ /g, '-')}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          {getIcon(channel.icon)}
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">
                          {channel.label}
                        </span>
                        <p className="text-xs font-bold text-slate-700 tracking-tight mt-1 truncate">
                          {channel.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
