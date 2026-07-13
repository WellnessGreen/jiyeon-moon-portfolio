/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronLeft, ChevronRight, X, HelpCircle, Check, AlertCircle } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HowToPlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToPlay({ isOpen, onClose }: HowToPlayProps) {
  const [slide, setSlide] = useState(0);

  const totalSlides = 4;

  const handleNext = () => {
    playClickSound();
    setSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const handlePrev = () => {
    playClickSound();
    setSlide((prev) => Math.max(prev - 1, 0));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="relative w-full max-w-lg bg-[#FDFCF0] rounded-[40px] border-[5px] border-[#1E293B] shadow-[0_16px_0px_rgba(30,41,59,1)] overflow-hidden z-10 flex flex-col"
      >
        {/* Top Header */}
        <div className="bg-[#5D9CEC] p-4 text-white flex items-center justify-between border-b-[4px] border-[#1E293B]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-white" />
            <h2 className="text-2xl font-bold font-sans tracking-wide">📖 바둑 배움터</h2>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-[#FFB6C1] border-[3px] border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-center text-[#1E293B] hover:bg-pink-200 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Slide contents */}
        <div className="p-6 flex-1 flex flex-col justify-between min-h-[420px] max-h-[80vh] overflow-y-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 flex-1 flex flex-col"
            >
              {slide === 0 && (
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="bg-emerald-50 rounded-2xl p-3 text-center">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-1">
                      1단계: 바둑이 뭐예요?
                    </span>
                    <h3 className="text-lg font-bold text-slate-800">바둑은 영토(집) 넓히기 놀이예요!</h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed text-center">
                    검은색 돌을 가진 사람과 흰색 돌을 가진 사람이 번갈아가며 돌을 놓아서, <br />
                    <strong>바둑판 위의 빈자리(집)를 더 많이 차지하는 사람</strong>이 이기는 지혜로운 놀이랍니다.
                  </p>

                  {/* SVG Illustration 1 */}
                  <div className="flex-1 min-h-[160px] bg-sky-50 rounded-2xl border border-sky-100 p-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-3xl">🐿️</div>
                    <div className="absolute bottom-2 right-2 text-3xl">🐰</div>
                    <svg className="w-full max-w-[200px] h-32" viewBox="0 0 120 120">
                      {/* Grid background */}
                      <rect x="10" y="10" width="100" height="100" fill="#fdf6e2" stroke="#d97706" strokeWidth="2" rx="4" />
                      <line x1="10" y1="35" x2="110" y2="35" stroke="#d97706" strokeWidth="1" />
                      <line x1="10" y1="60" x2="110" y2="60" stroke="#d97706" strokeWidth="1" />
                      <line x1="10" y1="85" x2="110" y2="85" stroke="#d97706" strokeWidth="1" />
                      <line x1="35" y1="10" x2="35" y2="110" stroke="#d97706" strokeWidth="1" />
                      <line x1="60" y1="10" x2="60" y2="110" stroke="#d97706" strokeWidth="1" />
                      <line x1="85" y1="10" x2="85" y2="110" stroke="#d97706" strokeWidth="1" />

                      {/* Stones surrounding a territory */}
                      <circle cx="35" cy="35" r="8" fill="#1e293b" />
                      <circle cx="60" cy="35" r="8" fill="#1e293b" />
                      <circle cx="35" cy="60" r="8" fill="#1e293b" />
                      
                      <circle cx="85" cy="85" r="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                      <circle cx="60" cy="85" r="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                      <circle cx="85" cy="60" r="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                      
                      {/* Territory markers */}
                      <circle cx="35" cy="85" r="2" fill="#22c55e" />
                      <text x="56" y="64" fill="#047857" fontSize="10" fontWeight="bold">집!</text>
                    </svg>
                  </div>
                </div>
              )}

              {slide === 1 && (
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="bg-emerald-50 rounded-2xl p-3 text-center">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-1">
                      2단계: 어디에 놓아야 하나요?
                    </span>
                    <h3 className="text-lg font-bold text-slate-800">돌은 선들의 교차점에 놓아요!</h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed text-center">
                    바둑돌은 칸의 안쪽이 아니라, <strong>가로선과 세로선이 만나는 딱 그 점</strong> 위에 살포시 올려놓아야 한답니다.
                  </p>

                  {/* SVG Illustration 2 */}
                  <div className="flex-1 min-h-[160px] bg-teal-50 rounded-2xl border border-teal-100 p-4 flex gap-4 items-center justify-around">
                    
                    {/* Correct */}
                    <div className="text-center">
                      <div className="w-24 h-24 bg-[#fdf6e2] border-2 border-amber-600 rounded-lg relative flex items-center justify-center">
                        {/* Grid lines intersection */}
                        <line x1="0" y1="48" x2="96" y2="48" stroke="#d97706" strokeWidth="1.5" />
                        <line x1="48" y1="0" x2="48" y2="96" stroke="#d97706" strokeWidth="1.5" />
                        {/* Correct Stone */}
                        <circle cx="48" cy="48" r="10" fill="#1e293b" />
                        <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 block mt-1.5">선 위에 딱! (맞아요)</span>
                    </div>

                    {/* Incorrect */}
                    <div className="text-center">
                      <div className="w-24 h-24 bg-[#fdf6e2] border-2 border-amber-600 rounded-lg relative flex items-center justify-center">
                        <line x1="0" y1="48" x2="96" y2="48" stroke="#d97706" strokeWidth="1.5" />
                        <line x1="48" y1="0" x2="48" y2="96" stroke="#d97706" strokeWidth="1.5" />
                        {/* Incorrect Stone */}
                        <circle cx="70" cy="24" r="10" fill="#1e293b" />
                        <div className="absolute top-1 right-1 bg-rose-500 text-white rounded-full p-0.5">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-rose-500 block mt-1.5">칸 안에 쏙 (틀려요!)</span>
                    </div>

                  </div>
                </div>
              )}

              {slide === 2 && (
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="bg-emerald-50 rounded-2xl p-3 text-center">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-1">
                      3단계: 돌이 숨쉬는 구멍
                    </span>
                    <h3 className="text-lg font-bold text-slate-800">돌이 숨쉬는 길, 활로(숨구멍)!</h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed text-center">
                    돌에서 상, 하, 좌, 우 선을 따라 바로 연결된 빈자리를 <strong>숨구멍(활로)</strong>이라고 불러요. 숨구멍이 모두 막히면 돌이 죽게 됩니다!
                  </p>

                  {/* SVG Illustration 3 */}
                  <div className="flex-1 min-h-[160px] bg-amber-50 rounded-2xl border border-amber-100 p-4 flex items-center justify-center">
                    <svg className="w-40 h-40" viewBox="0 0 100 100">
                      {/* Wood board */}
                      <rect x="5" y="5" width="90" height="90" fill="#fdf6e2" stroke="#d97706" strokeWidth="2" rx="4" />
                      <line x1="5" y1="50" x2="95" y2="50" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="50" y1="5" x2="50" y2="95" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="20" y1="5" x2="20" y2="95" stroke="#d97706" strokeWidth="1" strokeDasharray="2" />
                      <line x1="80" y1="5" x2="80" y2="95" stroke="#d97706" strokeWidth="1" strokeDasharray="2" />
                      <line x1="5" y1="20" x2="95" y2="20" stroke="#d97706" strokeWidth="1" strokeDasharray="2" />
                      <line x1="5" y1="80" x2="95" y2="80" stroke="#d97706" strokeWidth="1" strokeDasharray="2" />

                      {/* Main Stone */}
                      <circle cx="50" cy="50" r="10" fill="#1e293b" />

                      {/* Glowing breathing spots (liberties) */}
                      {/* Top */}
                      <circle cx="50" cy="20" r="5" fill="#10b981" className="animate-ping" />
                      <circle cx="50" cy="20" r="4" fill="#10b981" />
                      {/* Bottom */}
                      <circle cx="50" cy="80" r="5" fill="#10b981" className="animate-ping" />
                      <circle cx="50" cy="80" r="4" fill="#10b981" />
                      {/* Left */}
                      <circle cx="20" cy="50" r="5" fill="#10b981" className="animate-ping" />
                      <circle cx="20" cy="50" r="4" fill="#10b981" />
                      {/* Right */}
                      <circle cx="80" cy="50" r="5" fill="#10b981" className="animate-ping" />
                      <circle cx="80" cy="50" r="4" fill="#10b981" />

                      <text x="47" y="53" fill="white" fontSize="9" fontWeight="bold">돌</text>
                    </svg>
                  </div>
                </div>
              )}

              {slide === 3 && (
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="bg-emerald-50 rounded-2xl p-3 text-center">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-1">
                      4단계: 돌 따내기
                    </span>
                    <h3 className="text-lg font-bold text-slate-800">숨구멍을 다 막으면 따낼 수 있어요!</h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed text-center">
                    상대방 돌의 숨구멍을 완벽하게 포위해서 전부 막아버리면, <br />
                    그 돌을 따내서 <strong>나의 전리품(점수)</strong>으로 얻게 된답니다!
                  </p>

                  {/* SVG Illustration 4 */}
                  <div className="flex-1 min-h-[160px] bg-[#fff1f2] rounded-2xl border border-rose-100 p-4 flex items-center justify-center">
                    <svg className="w-40 h-40" viewBox="0 0 100 100">
                      {/* Wood board */}
                      <rect x="5" y="5" width="90" height="90" fill="#fdf6e2" stroke="#d97706" strokeWidth="2" rx="4" />
                      <line x1="5" y1="50" x2="95" y2="50" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="50" y1="5" x2="50" y2="95" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="20" y1="5" x2="20" y2="95" stroke="#d97706" strokeWidth="1" strokeDasharray="1" />
                      <line x1="80" y1="5" x2="80" y2="95" stroke="#d97706" strokeWidth="1" strokeDasharray="1" />
                      <line x1="5" y1="20" x2="95" y2="20" stroke="#d97706" strokeWidth="1" strokeDasharray="1" />
                      <line x1="5" y1="80" x2="95" y2="80" stroke="#d97706" strokeWidth="1" strokeDasharray="1" />

                      {/* Captured White Stone (glowing red background/bubble) */}
                      <circle cx="50" cy="50" r="10" fill="#f8fafc" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="2" className="animate-pulse" />
                      <text x="47" y="53" fill="#f43f5e" fontSize="10" fontWeight="bold">앗!</text>

                      {/* Surrounding Black Stones */}
                      {/* Top */}
                      <circle cx="50" cy="20" r="9" fill="#1e293b" />
                      {/* Bottom */}
                      <circle cx="50" cy="80" r="9" fill="#1e293b" />
                      {/* Left */}
                      <circle cx="20" cy="50" r="9" fill="#1e293b" />
                      {/* Right */}
                      <circle cx="80" cy="50" r="9" fill="#1e293b" />
                    </svg>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mt-6 border-t border-[#1E293B]/20 pt-4">
            <button
              onClick={handlePrev}
              disabled={slide === 0}
              className={`flex items-center gap-1 px-4 py-2 rounded-2xl font-extrabold border-[3px] transition-all cursor-pointer ${
                slide === 0
                  ? 'text-slate-300 bg-slate-50 border-slate-200 cursor-not-allowed'
                  : 'text-[#1E293B] bg-white border-[#1E293B] shadow-[2px_2px_0px_#1E293B] active:translate-y-0.5'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              이전
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {[...Array(totalSlides)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 border border-[#1E293B] ${
                    slide === i ? 'bg-[#FF7F50] w-6' : 'bg-white'
                  }`}
                />
              ))}
            </div>

            {slide === totalSlides - 1 ? (
              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="flex items-center gap-1 px-6 py-2 rounded-2xl font-extrabold text-white bg-[#7BC043] border-[3px] border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:bg-emerald-500 active:translate-y-0.5 transition-all cursor-pointer"
              >
                배움 끝! 🎓
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-2 rounded-2xl font-extrabold text-[#1E293B] bg-white border-[3px] border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:bg-slate-50 active:translate-y-0.5 transition-all cursor-pointer"
              >
                다음
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
