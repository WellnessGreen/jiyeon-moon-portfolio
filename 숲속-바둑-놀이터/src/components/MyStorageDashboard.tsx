/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Lock, Unlock, Sparkles, Trophy, Heart, Star, Share2, Info, X } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../utils/audio';

interface MyStorageDashboardProps {
  userScore: number;
  stoneType: string;
}

interface Badge {
  id: string;
  emoji: string;
  name: string;
  description: string;
  unlockText: string;
  condition: (score: number, stone: string) => boolean;
  color: string; // Tailwind bg color class
  accent: string; // Accent color hex or text class
}

export default function MyStorageDashboard({ userScore, stoneType }: MyStorageDashboardProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [copiedAlert, setCopiedAlert] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Define levels/titles
  const getLevelInfo = (score: number) => {
    if (score < 100) {
      return {
        title: '아기 토끼 🐰',
        nextTitle: '꼬마 다람쥐 🐿️',
        min: 0,
        max: 100,
        desc: '포근한 숲속 놀이터에 갓 도착하여 바둑판을 탐색하는 귀여운 아기 토끼입니다.',
        avatar: '🐰',
        color: 'bg-pink-100 border-[#FFB6C1]',
      };
    } else if (score < 300) {
      return {
        title: '꼬마 다람쥐 🐿️',
        nextTitle: '박사 부엉이 🦉',
        min: 100,
        max: 300,
        desc: '바둑의 첫 재미를 느끼고 퀴즈 도토리를 부지런히 모으기 시작한 다람쥐입니다.',
        avatar: '🐿️',
        color: 'bg-amber-100 border-[#FF7F50]',
      };
    } else if (score < 600) {
      return {
        title: '박사 부엉이 🦉',
        nextTitle: '신령 거북이 🐢',
        min: 300,
        max: 600,
        desc: '바둑의 기본적인 숨구멍과 규칙을 훤히 꿰뚫어 보는 지혜로운 부엉이 교수님입니다.',
        avatar: '🦉',
        color: 'bg-blue-100 border-[#5D9CEC]',
      };
    } else if (score < 1000) {
      return {
        title: '신령 거북이 🐢',
        nextTitle: '전설의 백호 🐯',
        min: 600,
        max: 1000,
        desc: '오랜 세월 동안 바둑판 위를 거닐며 탄탄한 내공을 쌓아올린 숲속의 든든한 수호자입니다.',
        avatar: '🐢',
        color: 'bg-emerald-100 border-[#7BC043]',
      };
    } else {
      return {
        title: '전설의 백호 🐯',
        nextTitle: '최종 단계 도달! 🎉',
        min: 1000,
        max: 1000,
        desc: '바둑판의 모든 삼라만상을 조율하는 신선이자, 놀이터에서 가장 강력하고 기품 있는 수호신입니다.',
        avatar: '🐯',
        color: 'bg-yellow-100 border-yellow-500',
      };
    }
  };

  const level = getLevelInfo(userScore);

  // Level progress bar percentage
  const progressPercent =
    level.min === level.max
      ? 100
      : Math.min(100, Math.max(0, ((userScore - level.min) / (level.max - level.min)) * 100));

  // Define badges
  const badges: Badge[] = [
    {
      id: 'welcome',
      emoji: '🎈',
      name: '숲속의 첫걸음',
      description: '포근하고 아기자기한 숲속 놀이터에 첫 발을 내딛은 행복한 아기 토끼에게 주어지는 뱃지입니다.',
      unlockText: '언제든 항상 열려있음',
      condition: () => true,
      color: 'bg-[#FFB6C1]/20',
      accent: 'text-[#FFB6C1]',
    },
    {
      id: 'acorn',
      emoji: '🐿️',
      name: '도토리 수집가',
      description: '바둑 기초 퀴즈를 맞추거나 대국을 진행해 첫 성취 점수 100점을 돌파했습니다!',
      unlockText: '성취 점수 100점 돌파',
      condition: (score) => score >= 100,
      color: 'bg-[#FF7F50]/20',
      accent: 'text-[#FF7F50]',
    },
    {
      id: 'owl_wisdom',
      emoji: '🦉',
      name: '밤하늘의 등대',
      description: '바둑의 참된 묘리를 탐색하며 똑똑하고 현명하게 300점을 획득했습니다.',
      unlockText: '성취 점수 300점 돌파',
      condition: (score) => score >= 300,
      color: 'bg-[#5D9CEC]/20',
      accent: 'text-[#5D9CEC]',
    },
    {
      id: 'turtle_spirit',
      emoji: '🐢',
      name: '산신령의 거북등',
      description: '서두르지 않는 단단함으로 묘수를 익혀 숲속 놀이터 수호자 수준인 600점을 획득했습니다.',
      unlockText: '성취 점수 600점 돌파',
      condition: (score) => score >= 600,
      color: 'bg-[#7BC043]/20',
      accent: 'text-[#7BC043]',
    },
    {
      id: 'tiger_legend',
      emoji: '🐯',
      name: '전설의 백두호랑이',
      description: '숲속 모든 바둑 퀴즈와 대국을 격파해 최정상 1000점을 성취한 전설의 바둑 대가입니다.',
      unlockText: '성취 점수 1000점 돌파',
      condition: (score) => score >= 1000,
      color: 'bg-yellow-100',
      accent: 'text-amber-600',
    },
    {
      id: 'style_collector',
      emoji: '🎨',
      name: '바둑돌 코디네이터',
      description: '설정창에서 귀여운 동물 친구들이나 싱그러운 숲속 과일 등 특별한 디자인의 바둑돌을 사용해 보았습니다.',
      unlockText: '설정에서 바둑돌 스킨 변경',
      condition: (score, stone) => stone !== 'traditional',
      color: 'bg-indigo-100',
      accent: 'text-indigo-600',
    },
  ];

  const unlockedCount = badges.filter((b) => b.condition(userScore, stoneType)).length;

  const handleBadgeClick = (badge: Badge) => {
    setShowInfo(false);
    const isUnlocked = badge.condition(userScore, stoneType);
    if (isUnlocked) {
      playSuccessSound();
      setSelectedBadge(badge);
    } else {
      playClickSound();
      setSelectedBadge(badge);
    }
  };

  const handleBrag = () => {
    playSuccessSound();
    setCopiedAlert(true);
    setTimeout(() => setCopiedAlert(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* 1. Level & Progress Panel */}
      <div className="bg-white rounded-3xl border-[3.5px] border-[#1E293B] shadow-[4px_4px_0_#1E293B] p-5 flex flex-col md:flex-row gap-4 items-center">
        {/* Left Side: Dynamic Avatar */}
        <div className={`w-20 h-20 shrink-0 rounded-2xl border-[3px] border-[#1E293B] ${level.color} shadow-[3px_3px_0_#1E293B] flex items-center justify-center relative group`}>
          <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{level.avatar}</span>
          <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full border border-[#1E293B] p-0.5 shadow-sm">
            <Star className="w-3.5 h-3.5 text-[#1E293B] fill-current" />
          </div>
        </div>

        {/* Right Side: Level Info & Progress */}
        <div className="flex-1 w-full text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5">
            <div>
              <span className="text-[10px] bg-[#5D9CEC]/15 text-[#1E293B] border border-[#1E293B] px-2 py-0.5 rounded-full font-bold">숲속 현재 등급</span>
              <h3 className="text-lg font-black text-[#1E293B] mt-0.5">{level.title}</h3>
            </div>
            
            <button
              onClick={handleBrag}
              className="mx-auto md:mx-0 flex items-center gap-1 text-xs font-extrabold px-3 py-1 bg-[#FFB6C1] border-2 border-[#1E293B] rounded-xl shadow-[2px_2px_0_#1E293B] hover:bg-pink-200 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              칭호 자랑하기
            </button>
          </div>

          <p className="text-xs text-slate-500 font-bold leading-relaxed">
            {level.desc}
          </p>

          {/* Progress Bar */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[10px] font-extrabold text-[#1E293B]/70">
              <span>현재 {userScore} 점</span>
              {level.min !== level.max ? (
                <span>다음 등급까지 {level.max - userScore} 점 필요</span>
              ) : (
                <span>최고 등급 달성 완료!</span>
              )}
            </div>
            
            <div className="w-full h-4 bg-slate-100 border-[2.5px] border-[#1E293B] rounded-full overflow-hidden p-[2px] relative">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#7BC043] to-[#7BC043]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-[#1E293B] select-none">
                {Math.round(progressPercent)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Alert bubble */}
      <AnimatePresence>
        {copiedAlert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center py-2 px-4 bg-[#7BC043] border-2 border-[#1E293B] rounded-xl text-white font-extrabold text-xs shadow-[2px_2px_0_#1E293B]"
          >
            💌 "숲속 바둑 명예의 전당 등극! [등급: {level.title} / 점수: {userScore}점]" 소식이 꼬마 친구들에게 소문났어요!
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Stats Summary Boxes */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border-[3px] border-[#1E293B] rounded-2xl p-3 shadow-[3px_3px_0_#1E293B] text-center">
          <span className="text-[10px] text-slate-400 font-bold">누적 성취도</span>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-200" />
            <span className="text-xl font-black text-[#1E293B]">{userScore}</span>
            <span className="text-xs font-bold text-slate-500">점</span>
          </div>
        </div>
        <div className="bg-white border-[3px] border-[#1E293B] rounded-2xl p-3 shadow-[3px_3px_0_#1E293B] text-center">
          <span className="text-[10px] text-slate-400 font-bold">보유한 숲속 뱃지</span>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Award className="w-5 h-5 text-pink-500 fill-pink-100" />
            <span className="text-xl font-black text-[#1E293B]">{unlockedCount} / {badges.length}</span>
            <span className="text-xs font-bold text-slate-500">개</span>
          </div>
        </div>
      </div>

      {/* 3. Badges Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-[#1E293B] flex items-center gap-1">
            <Award className="w-4 h-4 text-[#7BC043]" />
            모은 뱃지 구경하기 <span className="text-[10px] font-bold text-slate-400">(탭하여 확인)</span>
          </h4>
          <button
            onClick={() => {
              playClickSound();
              setSelectedBadge(null);
              setShowInfo(true);
            }}
            className="w-6 h-6 bg-[#5D9CEC]/15 text-[#1E293B] border-2 border-[#1E293B] rounded-full hover:bg-[#5D9CEC]/30 transition-all cursor-pointer flex items-center justify-center shadow-[1px_1px_0_#1E293B]"
            title="뱃지 획득 꿀팁 안내"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => {
            const isUnlocked = badge.condition(userScore, stoneType);
            return (
              <motion.button
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBadgeClick(badge)}
                className={`relative aspect-square rounded-2xl border-[3.5px] border-[#1E293B] p-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isUnlocked
                    ? `${badge.color} shadow-[3px_3px_0_#1E293B]`
                    : 'bg-slate-50/55 border-slate-300 opacity-60 shadow-none'
                }`}
              >
                {/* Badge Emoji */}
                <span className={`text-3xl ${isUnlocked ? '' : 'filter grayscale'}`}>
                  {badge.emoji}
                </span>

                {/* Badge Name */}
                <span className="text-[10px] font-black text-[#1E293B] mt-2.5 truncate w-full text-center">
                  {badge.name}
                </span>

                {/* Lock Status overlay icon */}
                {!isUnlocked ? (
                  <div className="absolute -top-1 -right-1 bg-slate-200 border border-slate-400 p-0.5 rounded-full shadow-sm">
                    <Lock className="w-2.5 h-2.5 text-slate-500" />
                  </div>
                ) : (
                  <div className="absolute -top-1 -right-1 bg-[#7BC043] border border-[#1E293B] p-0.5 rounded-full shadow-sm">
                    <Sparkles className="w-2.5 h-2.5 text-white animate-pulse" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 4. Badge Details Tooltip Box & Info Guide */}
      <AnimatePresence mode="wait">
        {selectedBadge && (
          <motion.div
            key="badge-detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-[#1E293B] text-white rounded-2xl border-[3px] border-[#1E293B] p-4 relative shadow-lg"
          >
            <div className="flex gap-3">
              <span className="text-4xl shrink-0 p-1 bg-white/10 rounded-xl flex items-center justify-center h-14 w-14">
                {selectedBadge.emoji}
              </span>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-extrabold text-sm">{selectedBadge.name}</h5>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${
                    selectedBadge.condition(userScore, stoneType)
                      ? 'bg-[#7BC043]/20 border-[#7BC043] text-[#7BC043]'
                      : 'bg-rose-500/20 border-rose-400 text-rose-300'
                  }`}>
                    {selectedBadge.condition(userScore, stoneType) ? '획득 완료! ⭐' : '잠김 🔒'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-semibold leading-relaxed">
                  {selectedBadge.description}
                </p>
                <div className="text-[10px] font-bold text-slate-400 pt-0.5">
                  해금 조건: <span className="text-yellow-300">{selectedBadge.unlockText}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                playClickSound();
                setSelectedBadge(null);
              }}
              className="absolute top-2 right-2 text-slate-400 hover:text-white font-extrabold text-xs px-1 cursor-pointer"
            >
              닫기
            </button>
          </motion.div>
        )}

        {showInfo && (
          <motion.div
            key="badge-info-guide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-[#1E293B] text-white rounded-2xl border-[3px] border-[#1E293B] p-4 relative shadow-lg space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-2">
              <h5 className="font-extrabold text-xs flex items-center gap-1.5 text-yellow-300">
                <Info className="w-4 h-4 text-yellow-300 shrink-0" />
                <span>🌳 숲속 뱃지 획득 꿀팁 가이드</span>
              </h5>
              <button
                onClick={() => {
                  playClickSound();
                  setShowInfo(false);
                }}
                className="text-slate-400 hover:text-white font-extrabold text-xs px-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5 text-[11px] text-slate-300 font-semibold leading-relaxed max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
              <p className="text-yellow-100 font-bold bg-white/5 p-2 rounded-xl border border-white/5">
                대장 토끼 숲속 놀이터에서 특별한 뱃지들을 모아 보세요! 귀여운 동물 친구들과 함께 바둑을 배우며 다 채워봐요! 🐰✨
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-lg shrink-0">🎈</span>
                  <div className="space-y-0.5">
                    <span className="font-black text-white text-xs">숲속의 첫걸음</span>
                    <p className="text-[10px] text-slate-400">숲속 놀이터에 온 모든 어린이 친구들이 가질 수 있어요. 입장하는 즉시 바로 지급!</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-lg shrink-0">🐿️</span>
                  <div className="space-y-0.5">
                    <span className="font-black text-white text-xs">도토리 수집가</span>
                    <p className="text-[10px] text-slate-400">매일 대장 토끼 퀴즈를 풀거나 AI 동물 친구와 바둑을 두어 <span className="text-yellow-300 font-bold">100점</span>을 달성해요!</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-lg shrink-0">🦉</span>
                  <div className="space-y-0.5">
                    <span className="font-black text-white text-xs">밤하늘의 등대</span>
                    <p className="text-[10px] text-slate-400">바둑판의 숨구멍(활로) 규칙과 단수를 똑똑하게 익혀 누적 <span className="text-yellow-300 font-bold">300점</span>을 달성해요!</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-lg shrink-0">🐢</span>
                  <div className="space-y-0.5">
                    <span className="font-black text-white text-xs">산신령의 거북등</span>
                    <p className="text-[10px] text-slate-400">바둑 퀴즈를 풀고 AI 친구를 이기면서 지혜로운 수호자 점수인 <span className="text-yellow-300 font-bold">600점</span>을 모아보세요!</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-lg shrink-0">🐯</span>
                  <div className="space-y-0.5">
                    <span className="font-black text-white text-xs">전설의 백두호랑이</span>
                    <p className="text-[10px] text-slate-400">바둑을 완벽히 정복하여 명예의 숲속 <span className="text-yellow-300 font-bold">1000점</span> 최고 도달 기록을 달성해 봐요!</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-lg shrink-0">🎨</span>
                  <div className="space-y-0.5">
                    <span className="font-black text-white text-xs">바둑돌 코디네이터</span>
                    <p className="text-[10px] text-slate-400">홈 화면의 <span className="text-yellow-300 font-bold">설정(톱니바퀴)</span>을 눌러 바둑돌 스킨을 동물 친구들이나 과일 등으로 한번이라도 바꿔보세요!</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
