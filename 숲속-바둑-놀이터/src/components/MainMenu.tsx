/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Settings, Trophy, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenHowTo: () => void;
  onOpenSettings: () => void;
  onOpenRanking: () => void;
}

export default function MainMenu({
  onStartGame,
  onOpenHowTo,
  onOpenSettings,
  onOpenRanking,
}: MainMenuProps) {

  // Play a bubble sound on button hover to make it extra interactive and cute!
  const handleButtonHover = () => {
    try {
      // Light delicate synthesize pop for hover
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);
    } catch (e) {
      // Ignore
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full max-w-2xl mx-auto px-4 z-10 select-none">
      
      {/* Whimsical Fairytale Game Logo (화면 상단 가운데 배치) */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 120 }}
        className="text-center mb-10 mt-6 relative"
      >
        {/* Floating clouds/sparkles behind the logo */}
        <div className="absolute top-[-25px] left-[-30px] text-3xl animate-bounce duration-[3000ms]">🐱</div>
        <div className="absolute top-[-15px] right-[-30px] text-3xl animate-bounce duration-[4000ms]">🐰</div>

        {/* Outer Geometric Frame (Geometric Balance Theme) */}
        <div className="relative bg-[#FDFCF0] p-6 rounded-[40px] border-[5px] border-[#1E293B] shadow-[0_12px_0_#D35400] flex flex-col items-center max-w-sm md:max-w-md mx-auto">
          {/* Inner dashed geometric ring */}
          <div className="absolute inset-2 border-[2px] border-dashed border-[#1E293B]/20 rounded-[32px] pointer-events-none" />
          
          {/* Subtitle banner */}
          <span className="px-5 py-1.5 bg-[#5D9CEC] text-white font-extrabold text-xs md:text-sm rounded-full border-[3px] border-[#1E293B] shadow-[2px_2px_0px_#1E293B] mb-4 tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-200 fill-yellow-200 animate-pulse" />
            초등학생을 위한 지혜 놀이터
            <Sparkles className="w-3 h-3 text-yellow-200 fill-yellow-200 animate-pulse" />
          </span>

          {/* Main Title text with flat 3D contrast styling */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 tracking-tight leading-none flex flex-col gap-2.5 items-center font-sans">
            <span className="text-[#7BC043] text-3xl md:text-4xl drop-shadow-[1.5px_1.5px_0px_#1E293B] font-extrabold">숲속</span>
            <span className="text-[#FF7F50] drop-shadow-[2.5px_2.5px_0px_#1E293B] font-extrabold text-4xl md:text-5xl">
              바둑 놀이터
            </span>
          </h1>

          {/* Cute pebbles pile indicator at bottom of logo */}
          <div className="flex gap-2.5 mt-4 items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-[#1E293B] border-[3px] border-[#1E293B] shadow-[2px_2px_0_#FF7F50] flex items-center justify-center text-[10px]">🐱</div>
            <div className="w-7 h-7 rounded-full bg-[#FDFCF0] border-[3px] border-[#1E293B] shadow-[2px_2px_0_#FF7F50] flex items-center justify-center text-[10px]">🐰</div>
            <div className="w-5 h-5 rounded-full bg-[#FFB6C1] border-[3px] border-[#1E293B] shadow-[1.5px_1.5px_0_#1E293B]" />
          </div>
        </div>

        {/* Cute hanging signs decoration */}
        <div className="flex justify-around px-12 -mt-2">
          <div className="w-3 h-6 bg-[#FF7F50] border-x-[3px] border-b-[3px] border-[#1E293B] rounded-b-md" />
          <div className="w-3 h-6 bg-[#FF7F50] border-x-[3px] border-b-[3px] border-[#1E293B] rounded-b-md" />
        </div>
      </motion.div>

      {/* Main Action Menu Buttons (큰 둥근 버튼 사용) */}
      <div className="w-full max-w-sm space-y-4">
        
        {/* 1. 게임 시작 */}
        <motion.button
          onClick={() => {
            playClickSound();
            onStartGame();
          }}
          onMouseEnter={handleButtonHover}
          whileHover={{ scale: 1.02, y: 2 }}
          whileTap={{ scale: 0.98, y: 6 }}
          className="w-full py-4 px-6 rounded-[30px] bg-[#7BC043] text-white font-extrabold text-xl flex items-center justify-center gap-3 border-[4px] border-[#1E293B] shadow-[0_8px_0px_#1E293B] transition-all cursor-pointer"
        >
          <span className="text-2xl animate-pulse">🎮</span>
          <span>게임 시작</span>
        </motion.button>

        {/* 2. 게임 방법 */}
        <motion.button
          onClick={() => {
            playClickSound();
            onOpenHowTo();
          }}
          onMouseEnter={handleButtonHover}
          whileHover={{ scale: 1.02, y: 2 }}
          whileTap={{ scale: 0.98, y: 6 }}
          className="w-full py-4 px-6 rounded-[30px] bg-[#5D9CEC] text-white font-extrabold text-xl flex items-center justify-center gap-3 border-[4px] border-[#1E293B] shadow-[0_8px_0px_#1E293B] transition-all cursor-pointer"
        >
          <span className="text-xl">📖</span>
          <span>게임 방법</span>
        </motion.button>

        {/* Grid layout for settings and rankings to make it dynamic and visual */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* 3. 설정 */}
          <motion.button
            onClick={() => {
              playClickSound();
              onOpenSettings();
            }}
            onMouseEnter={handleButtonHover}
            whileHover={{ scale: 1.02, y: 2 }}
            whileTap={{ scale: 0.98, y: 4 }}
            className="py-3.5 px-5 rounded-[30px] bg-[#FFB6C1] text-[#1E293B] font-extrabold text-lg flex items-center justify-center gap-2 border-[4px] border-[#1E293B] shadow-[0_6px_0px_#1E293B] transition-all cursor-pointer"
          >
            <Settings className="w-5 h-5 text-[#1E293B] animate-spin" style={{ animationDuration: '6s' }} />
            <span>설정</span>
          </motion.button>

          {/* 4. 랭킹 */}
          <motion.button
            onClick={() => {
              playClickSound();
              onOpenRanking();
            }}
            onMouseEnter={handleButtonHover}
            whileHover={{ scale: 1.02, y: 2 }}
            whileTap={{ scale: 0.98, y: 4 }}
            className="py-3.5 px-5 rounded-[30px] bg-[#FF7F50] text-white font-extrabold text-lg flex items-center justify-center gap-2 border-[4px] border-[#1E293B] shadow-[0_6px_0px_#1E293B] transition-all cursor-pointer"
          >
            <Trophy className="w-5 h-5 text-white fill-white" />
            <span>랭킹</span>
          </motion.button>
        </div>

      </div>

      {/* Sweet and simple copyright footer */}
      <div className="mt-12 text-center text-xs font-bold text-[#1E293B]/80 bg-white/80 py-2.5 px-6 rounded-full border-[3px] border-[#1E293B] shadow-[4px_4px_0px_#1E293B]">
        🌲 숲속 동물 친구들과 함께 즐기는 즐거운 바둑 배움터 🌲
      </div>
    </div>
  );
}
