/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import BackgroundElements from './components/BackgroundElements';
import MainMenu from './components/MainMenu';
import BadukGame from './components/BadukGame';
import HowToPlay from './components/HowToPlay';
import SettingsModal from './components/SettingsModal';
import RankingModal from './components/RankingModal';
import { GameState, StoneType, BoardTheme, SoundSettings } from './types';
import { startBgm, stopBgm } from './utils/audio';

export default function App() {
  const [view, setView] = useState<GameState>('menu');

  // Load and state track userScore from localStorage
  const [userScore, setUserScore] = useState<number>(() => {
    try {
      const score = localStorage.getItem('forest_baduk_score');
      return score ? parseInt(score, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  // Theme states
  const [stoneType, setStoneType] = useState<StoneType>(() => {
    try {
      const saved = localStorage.getItem('forest_baduk_stone_type');
      return (saved as StoneType) || 'animals'; // Default to cute animals for children
    } catch (e) {
      return 'animals';
    }
  });

  const [boardTheme, setBoardTheme] = useState<BoardTheme>(() => {
    try {
      const saved = localStorage.getItem('forest_baduk_board_theme');
      return (saved as BoardTheme) || 'wood'; // Default to cozy wooden board
    } catch (e) {
      return 'wood';
    }
  });

  // Sound settings
  const [soundSettings, setSoundSettings] = useState<SoundSettings>(() => {
    try {
      const saved = localStorage.getItem('forest_baduk_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore
    }
    return { bgmVolume: 40, sfxVolume: 50, mute: false };
  });

  // Save stone types and board themes on changes
  useEffect(() => {
    localStorage.setItem('forest_baduk_stone_type', stoneType);
  }, [stoneType]);

  useEffect(() => {
    localStorage.setItem('forest_baduk_board_theme', boardTheme);
  }, [boardTheme]);

  // Autoplay compliance: start forest bell BGM on first user click or tap
  useEffect(() => {
    const triggerAudio = () => {
      startBgm();
      window.removeEventListener('click', triggerAudio);
      window.removeEventListener('touchstart', triggerAudio);
    };

    window.addEventListener('click', triggerAudio);
    window.addEventListener('touchstart', triggerAudio);

    return () => {
      window.removeEventListener('click', triggerAudio);
      window.removeEventListener('touchstart', triggerAudio);
      stopBgm();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden font-sans select-none pb-8">
      {/* 1. Animated Cozy Forest Background */}
      <BackgroundElements />

      {/* 2. Primary Views Coordinator */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {view === 'menu' && (
            <motion.div
              key="menu-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <MainMenu
                onStartGame={() => setView('play')}
                onOpenHowTo={() => setView('howto')}
                onOpenSettings={() => setView('settings')}
                onOpenRanking={() => setView('ranking')}
              />
            </motion.div>
          )}

          {view === 'play' && (
            <motion.div
              key="play-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <BadukGame
                onBack={() => setView('menu')}
                stoneType={stoneType}
                boardTheme={boardTheme}
                userScore={userScore}
                setUserScore={setUserScore}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Overlay Modals for settings, rankings, and instruction book */}
      <AnimatePresence>
        {view === 'howto' && (
          <HowToPlay
            isOpen={view === 'howto'}
            onClose={() => setView('menu')}
          />
        )}

        {view === 'settings' && (
          <SettingsModal
            isOpen={view === 'settings'}
            onClose={() => setView('menu')}
            stoneType={stoneType}
            setStoneType={setStoneType}
            boardTheme={boardTheme}
            setBoardTheme={setBoardTheme}
            soundSettings={soundSettings}
            setSoundSettings={setSoundSettings}
          />
        )}

        {view === 'ranking' && (
          <RankingModal
            isOpen={view === 'ranking'}
            onClose={() => setView('menu')}
            userScore={userScore}
            stoneType={stoneType}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
