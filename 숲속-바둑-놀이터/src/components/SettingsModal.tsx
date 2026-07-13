/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, X, HelpCircle, Music, Sun, Sparkles, Check } from 'lucide-react';
import { playClickSound } from '../utils/audio';
import { StoneType, BoardTheme, SoundSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stoneType: StoneType;
  setStoneType: (type: StoneType) => void;
  boardTheme: BoardTheme;
  setBoardTheme: (theme: BoardTheme) => void;
  soundSettings: SoundSettings;
  setSoundSettings: (settings: SoundSettings) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  stoneType,
  setStoneType,
  boardTheme,
  setBoardTheme,
  soundSettings,
  setSoundSettings,
}: SettingsModalProps) {
  
  const handleToggleMute = () => {
    playClickSound();
    const updated = { ...soundSettings, mute: !soundSettings.mute };
    setSoundSettings(updated);
    localStorage.setItem('forest_baduk_settings', JSON.stringify(updated));
  };

  const handleBgmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    const updated = { ...soundSettings, bgmVolume: val };
    setSoundSettings(updated);
    localStorage.setItem('forest_baduk_settings', JSON.stringify(updated));
  };

  const handleSfxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    const updated = { ...soundSettings, sfxVolume: val };
    setSoundSettings(updated);
    localStorage.setItem('forest_baduk_settings', JSON.stringify(updated));
  };

  const testSfx = () => {
    playClickSound();
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
        <div className="bg-[#FFB6C1] p-4 text-[#1E293B] flex items-center justify-between border-b-[4px] border-[#1E293B]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <h2 className="text-2xl font-bold font-sans tracking-wide">숲속 놀이터 설정</h2>
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

        {/* Modal content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Sound section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1E293B] flex items-center gap-2 border-b border-[#1E293B]/20 pb-2">
              <Volume2 className="w-5 h-5" />
              소리 설정
            </h3>
            
            <div className="flex items-center justify-between bg-white/80 border-[3px] border-[#1E293B] p-3 rounded-2xl shadow-[3px_3px_0px_#1E293B]">
              <span className="text-[#1E293B] font-bold">모든 소리 끄기</span>
              <button
                onClick={handleToggleMute}
                className={`w-14 h-8 rounded-full transition-colors flex items-center p-1 border-[3px] border-[#1E293B] cursor-pointer ${
                  soundSettings.mute ? 'bg-[#FF7F50]' : 'bg-[#7BC043]'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-white border-2 border-[#1E293B] shadow flex items-center justify-center">
                  {soundSettings.mute ? (
                    <VolumeX className="w-3.5 h-3.5 text-amber-600" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </div>
              </button>
            </div>

            <div className="space-y-3">
              {/* BGM Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-bold text-[#1E293B]/80">
                  <span className="flex items-center gap-1"><Music className="w-4 h-4" /> 배경 음악</span>
                  <span>{soundSettings.mute ? '음소거' : `${soundSettings.bgmVolume}%`}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundSettings.bgmVolume}
                  onChange={handleBgmChange}
                  disabled={soundSettings.mute}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5D9CEC] disabled:opacity-50"
                />
              </div>

              {/* SFX Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-bold text-[#1E293B]/80">
                  <span className="flex items-center gap-1"><Sparkles className="w-4 h-4" /> 소리 효과</span>
                  <span>{soundSettings.mute ? '음소거' : `${soundSettings.sfxVolume}%`}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={soundSettings.sfxVolume}
                    onChange={handleSfxChange}
                    disabled={soundSettings.mute}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF7F50] disabled:opacity-50"
                  />
                  <button
                    onClick={testSfx}
                    disabled={soundSettings.mute}
                    className="px-3 py-1 bg-[#5D9CEC] text-white rounded-xl text-xs font-bold border-2 border-[#1E293B] shadow-[2px_2px_0_#1E293B] hover:bg-blue-400 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    테스트
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stone Theme settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1E293B] flex items-center gap-2 border-b border-[#1E293B]/20 pb-2">
              <Sun className="w-5 h-5" />
              바둑돌 디자인
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {/* Traditional */}
              <button
                onClick={() => {
                  playClickSound();
                  setStoneType('traditional');
                }}
                className={`relative p-3 rounded-2xl border-[3px] flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  stoneType === 'traditional'
                    ? 'bg-[#7BC043]/10 border-[#1E293B] shadow-[3px_3px_0px_#1E293B]'
                    : 'bg-white border-[#1E293B]/20 hover:border-[#1E293B]'
                }`}
              >
                <div className="flex gap-1 justify-center items-center h-10">
                  <div className="w-6 h-6 rounded-full bg-[#1E293B] border-2 border-[#1E293B]" />
                  <div className="w-6 h-6 rounded-full bg-[#FDFCF0] border-2 border-[#1E293B]" />
                </div>
                <span className="text-xs font-extrabold text-[#1E293B]">전통 바둑돌</span>
                {stoneType === 'traditional' && (
                  <div className="absolute top-1.5 right-1.5 bg-[#7BC043] text-white p-0.5 rounded-full border border-[#1E293B]">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>

              {/* Animal faces */}
              <button
                onClick={() => {
                  playClickSound();
                  setStoneType('animals');
                }}
                className={`relative p-3 rounded-2xl border-[3px] flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  stoneType === 'animals'
                    ? 'bg-[#7BC043]/10 border-[#1E293B] shadow-[3px_3px_0px_#1E293B]'
                    : 'bg-white border-[#1E293B]/20 hover:border-[#1E293B]'
                }`}
              >
                <div className="flex gap-1 justify-center items-center h-10 text-xl">
                  <span>🐱</span>
                  <span>🐰</span>
                </div>
                <span className="text-xs font-extrabold text-[#1E293B]">동물 친구들</span>
                {stoneType === 'animals' && (
                  <div className="absolute top-1.5 right-1.5 bg-[#7BC043] text-white p-0.5 rounded-full border border-[#1E293B]">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>

              {/* Fruit harvest */}
              <button
                onClick={() => {
                  playClickSound();
                  setStoneType('forest');
                }}
                className={`relative p-3 rounded-2xl border-[3px] flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  stoneType === 'forest'
                    ? 'bg-[#7BC043]/10 border-[#1E293B] shadow-[3px_3px_0px_#1E293B]'
                    : 'bg-white border-[#1E293B]/20 hover:border-[#1E293B]'
                }`}
              >
                <div className="flex gap-1 justify-center items-center h-10 text-xl">
                  <span>🍎</span>
                  <span>🍐</span>
                </div>
                <span className="text-xs font-extrabold text-[#1E293B]">숲속 과일</span>
                {stoneType === 'forest' && (
                  <div className="absolute top-1.5 right-1.5 bg-[#7BC043] text-white p-0.5 rounded-full border border-[#1E293B]">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Board Theme settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1E293B] flex items-center gap-2 border-b border-[#1E293B]/20 pb-2">
              <HelpCircle className="w-5 h-5" />
              바둑판 테마
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Wood Theme */}
              <button
                onClick={() => {
                  playClickSound();
                  setBoardTheme('wood');
                }}
                className={`relative p-3 rounded-2xl border-[3px] flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  boardTheme === 'wood'
                    ? 'bg-[#7BC043]/10 border-[#1E293B] shadow-[3px_3px_0px_#1E293B]'
                    : 'bg-white border-[#1E293B]/20 hover:border-[#1E293B]'
                }`}
              >
                <div className="w-16 h-10 rounded-xl bg-[#FDFCF0] border-2 border-[#1E293B] shadow-inner flex items-center justify-center">
                  <div className="w-10 h-6 border border-[#1E293B]/30 flex" />
                </div>
                <span className="text-xs font-extrabold text-[#1E293B]">포근한 나무판</span>
                {boardTheme === 'wood' && (
                  <div className="absolute top-1.5 right-1.5 bg-[#7BC043] text-white p-0.5 rounded-full border border-[#1E293B]">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>

              {/* Meadow Theme */}
              <button
                onClick={() => {
                  playClickSound();
                  setBoardTheme('meadow');
                }}
                className={`relative p-3 rounded-2xl border-[3px] flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  boardTheme === 'meadow'
                    ? 'bg-[#7BC043]/10 border-[#1E293B] shadow-[3px_3px_0px_#1E293B]'
                    : 'bg-white border-[#1E293B]/20 hover:border-[#1E293B]'
                }`}
              >
                <div className="w-16 h-10 rounded-xl bg-[#7BC043]/15 border-2 border-[#1E293B] shadow-inner flex items-center justify-center">
                  <div className="w-10 h-6 border border-[#1E293B]/30 flex" />
                </div>
                <span className="text-xs font-extrabold text-[#1E293B]">초록 풀밭판</span>
                {boardTheme === 'meadow' && (
                  <div className="absolute top-1.5 right-1.5 bg-[#7BC043] text-white p-0.5 rounded-full border border-[#1E293B]">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            </div>
          </div>

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
            설정 완료!
          </button>
        </div>
      </motion.div>
    </div>
  );
}
