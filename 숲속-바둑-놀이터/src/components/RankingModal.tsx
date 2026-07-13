/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, X, Sparkles, RefreshCw, Award } from 'lucide-react';
import { playClickSound } from '../utils/audio';
import { RankEntry, StoneType } from '../types';
import MyStorageDashboard from './MyStorageDashboard';

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userScore: number;
  stoneType: StoneType;
}

export default function RankingModal({ isOpen, onClose, userScore, stoneType }: RankingModalProps) {
  const [rankings, setRankings] = useState<RankEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'ranking' | 'storage'>('ranking');

  useEffect(() => {
    // Initial standard forest ranking
    const defaultRanks: RankEntry[] = [
      { id: 'rank-1', name: '지혜로운 다람쥐 대장', score: 1250, character: '🐿️', date: '어제' },
      { id: 'rank-2', name: '공부하는 꼬마 부엉이', score: 980, character: '🦉', date: '오늘' },
      { id: 'rank-3', name: '바둑왕 숲속 아기토끼', score: 850, character: '🐰', date: '그저께' },
      { id: 'rank-4', name: '느릿느릿 숲길 거북이', score: 620, character: '🐢', date: '오늘' },
      { id: 'rank-user', name: '우리 꼬마 대장 (나)', score: userScore, character: '⭐', date: '방금', isUser: true },
    ];

    // Sort rankings by score descending
    const sorted = [...defaultRanks].sort((a, b) => b.score - a.score);
    setRankings(sorted);
  }, [isOpen, userScore]);

  const handleResetScore = () => {
    playClickSound();
    if (confirm('모든 기록을 새롭게 지우고 처음부터 시작할까요?')) {
      localStorage.setItem('forest_baduk_score', '0');
      // Force trigger state reload or let page do it
      window.location.reload();
    }
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
        className="relative w-full max-w-md bg-[#FDFCF0] rounded-[40px] border-[5px] border-[#1E293B] shadow-[0_16px_0px_rgba(30,41,59,1)] overflow-hidden z-10"
      >
        {/* Top Header Decorative Bar */}
        <div className="bg-[#FF7F50] p-4 text-white flex items-center justify-between border-b-[4px] border-[#1E293B]">
          <div className="flex items-center gap-2">
            <Trophy className="w-7 h-7 text-yellow-100 fill-yellow-200 animate-pulse" />
            <h2 className="text-2xl font-bold font-sans tracking-wide text-amber-50">숲속 명예의 전당 & 보관함</h2>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-[#FDFCF0] border-[3px] border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-center text-[#1E293B] hover:bg-slate-50 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex px-4 pt-3.5 pb-0 gap-2 border-b-2 border-[#1E293B]/10 bg-white/20">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('ranking');
            }}
            className={`flex-1 py-2.5 text-xs font-black rounded-t-2xl border-t-[3px] border-x-[3px] border-[#1E293B] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'ranking'
                ? 'bg-[#FDFCF0] text-[#1E293B] translate-y-[2px] border-b-[3px] border-b-[#FDFCF0] z-10'
                : 'bg-[#7BC043]/15 text-[#1E293B]/60 border-b-[3px] border-b-[#1E293B] hover:bg-[#7BC043]/25 hover:text-[#1E293B]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            명예의 전당 (랭킹)
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('storage');
            }}
            className={`flex-1 py-2.5 text-xs font-black rounded-t-2xl border-t-[3px] border-x-[3px] border-[#1E293B] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'storage'
                ? 'bg-[#FDFCF0] text-[#1E293B] translate-y-[2px] border-b-[3px] border-b-[#FDFCF0] z-10'
                : 'bg-[#FF7F50]/15 text-[#1E293B]/60 border-b-[3px] border-b-[#1E293B] hover:bg-[#FF7F50]/25 hover:text-[#1E293B]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            내 보관함 (대시보드)
          </button>
        </div>

        {/* Scrollable Modal content area to keep size constrained */}
        <div className="p-6 overflow-y-auto max-h-[460px] custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'ranking' ? (
              <motion.div
                key="ranking-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="space-y-5"
              >
                <p className="text-xs text-[#1E293B] font-extrabold text-center bg-[#7BC043]/15 py-2.5 px-3 rounded-2xl border-[3px] border-[#1E293B] shadow-[2px_2px_0_#1E293B]">
                  🌳 퀴즈를 풀고 바둑을 이겨서 대장 토끼의 점수를 올려보세요!
                </p>

                {/* Ranking list */}
                <div className="space-y-3">
                  {rankings.map((player, index) => {
                    const rank = index + 1;
                    let rankBadge = null;
                    if (rank === 1) {
                      rankBadge = <Medal className="w-6 h-6 text-yellow-500 fill-yellow-100 shrink-0" />;
                    } else if (rank === 2) {
                      rankBadge = <Medal className="w-6 h-6 text-slate-400 fill-slate-100 shrink-0" />;
                    } else if (rank === 3) {
                      rankBadge = <Medal className="w-6 h-6 text-amber-600 fill-amber-100 shrink-0" />;
                    } else {
                      rankBadge = <div className="w-6 h-6 rounded-full bg-white text-[#1E293B] font-bold flex items-center justify-center text-xs border-2 border-[#1E293B] shrink-0">{rank}</div>;
                    }

                    return (
                      <motion.div
                         key={player.id}
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: index * 0.05 }}
                         className={`flex items-center justify-between p-3.5 rounded-2xl border-[3px] border-[#1E293B] transition-all ${
                           player.isUser
                             ? 'bg-[#7BC043]/15 shadow-[4px_4px_0px_#1E293B] scale-[1.02]'
                             : 'bg-white shadow-[4px_4px_0px_rgba(30,41,59,0.1)] hover:bg-slate-50'
                         }`}
                      >
                        <div className="flex items-center gap-3">
                          {rankBadge}
                          <span className="text-2xl shrink-0">{player.character}</span>
                          <div>
                            <h4 className="text-sm font-extrabold text-[#1E293B]">
                              {player.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-bold">활동 시기: {player.date}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-black text-[#1E293B]">
                            {player.score.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold ml-0.5">점</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* User Specific Performance Stats */}
                <div className="bg-white rounded-2xl p-4 border-[3px] border-[#1E293B] shadow-[4px_4px_0_#1E293B] text-center flex flex-col items-center gap-1.5">
                  <span className="text-xs font-bold text-[#1E293B]/70">나의 대장 기록</span>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-2xl font-black text-[#1E293B]">{userScore} 점</span>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <button
                    onClick={handleResetScore}
                    className="mt-1 flex items-center gap-1 text-[10px] text-rose-500 hover:text-rose-600 font-bold transition-colors active:scale-95 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    점수 초기화하기
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="storage-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
              >
                <MyStorageDashboard userScore={userScore} stoneType={stoneType} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-[#FDFCF0] p-4 border-t border-[#1E293B]/25 flex justify-center">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-8 py-2.5 bg-[#FF7F50] text-white font-extrabold rounded-2xl border-[3px] border-[#1E293B] shadow-[0_4px_0_#1E293B] hover:shadow-[0_2px_0_#1E293B] hover:translate-y-0.5 transform active:scale-95 transition-all text-sm cursor-pointer"
          >
            놀이터로 돌아가기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
