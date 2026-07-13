/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, RotateCcw, ArrowLeft, Sparkles, Star, Award } from 'lucide-react';
import { playClickSound, playStoneSound, playSuccessSound } from '../utils/audio';
import { StoneType, BoardTheme } from '../types';

interface BadukGameProps {
  onBack: () => void;
  stoneType: StoneType;
  boardTheme: BoardTheme;
  userScore: number;
  setUserScore: React.Dispatch<React.SetStateAction<number>>;
}

const BOARD_SIZE = 19;
// Standard star points for a 19x19 board (0-indexed: 3rd, 9th, 15th lines)
const STAR_POINTS = [3, 9, 15];

// ==========================================
// 1. CUTE 3D TOY-STYLE STONE COMPONENTS
// ==========================================

// [포메라니안 돌] - 흰 돌 대신 사용하는 새하얀 포메라니안 강아지 얼굴
const PomeranianStone = ({ isPreview = false }: { isPreview?: boolean }) => {
  return (
    <div className={`w-[92%] h-[92%] flex items-center justify-center ${isPreview ? 'opacity-45 select-none' : 'drop-shadow-[0_3px_5px_rgba(0,0,0,0.22)]'}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full select-none overflow-visible">
        <defs>
          <radialGradient id="pomGloss" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pomBody" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#FAF9F6" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </radialGradient>
          <radialGradient id="earInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD8D8" />
            <stop offset="100%" stopColor="#FFA6A6" />
          </radialGradient>
        </defs>

        {/* Fluffy ears */}
        <path d="M 20 33 Q 9 16 25 15 Q 33 14 31 29" fill="url(#pomBody)" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 18 29 Q 13 19 22 19 Q 27 19 26 27" fill="url(#earInner)" />

        <path d="M 80 33 Q 91 16 75 15 Q 67 14 69 29" fill="url(#pomBody)" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 82 29 Q 87 19 78 19 Q 73 19 74 27" fill="url(#earInner)" />

        {/* 둥근 곰돌이컷 머리 */}
        <circle cx="50" cy="51" r="35" fill="url(#pomBody)" stroke="#1E293B" strokeWidth="3" />

        {/* 하늘색 목걸이 (하늘색 목걸이 착용) */}
        <path d="M 23 76 Q 50 91 77 76" fill="none" stroke="#5D9CEC" strokeWidth="6" strokeLinecap="round" />
        {/* 금빛 종/태그 */}
        <circle cx="50" cy="83" r="5" fill="#FFD700" stroke="#1E293B" strokeWidth="1.8" />
        <circle cx="50" cy="81" r="1" fill="#1E293B" />

        {/* 크고 동그란 검은 눈 */}
        <circle cx="35" cy="47" r="7.2" fill="#1E293B" />
        <circle cx="33" cy="44" r="2.5" fill="#FFFFFF" /> {/* 반짝임 */}
        <circle cx="37" cy="49" r="1" fill="#FFFFFF" />

        <circle cx="65" cy="47" r="7.2" fill="#1E293B" />
        <circle cx="63" cy="44" r="2.5" fill="#FFFFFF" /> {/* 반짝임 */}
        <circle cx="67" cy="49" r="1" fill="#FFFFFF" />

        {/* 부드러운 볼터치 */}
        <ellipse cx="25" cy="56" rx="5.5" ry="3.5" fill="#FF9AA2" opacity="0.65" />
        <ellipse cx="75" cy="56" rx="5.5" ry="3.5" fill="#FF9AA2" opacity="0.65" />

        {/* 머즐(코 주변) 영역 */}
        <ellipse cx="50" cy="57" rx="10.5" ry="7.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        
        {/* 작고 귀여운 코 */}
        <path d="M 46 54 Q 50 51.5 54 54 Q 50 58.5 46 54 Z" fill="#2D3748" />
        
        {/* W자형 귀여운 미소 */}
        <path d="M 43 61 Q 47 64.5 50 61 Q 53 64.5 57 61" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 48 62 Q 50 66.5 52 62 Z" fill="#FF8E9E" />

        {/* 3D 반짝이는 하이라이트 */}
        <ellipse cx="38" cy="30" rx="13" ry="6" fill="url(#pomGloss)" transform="rotate(-15 38 30)" />
      </svg>
    </div>
  );
};

// [고양이 돌] - 검은 돌 대신 사용하는 회색 아기 고양이 얼굴
const CatStone = ({ isPreview = false }: { isPreview?: boolean }) => {
  return (
    <div className={`w-[92%] h-[92%] flex items-center justify-center ${isPreview ? 'opacity-45 select-none' : 'drop-shadow-[0_3px_5px_rgba(0,0,0,0.22)]'}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full select-none overflow-visible">
        <defs>
          <radialGradient id="catGloss" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="catBody" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#A6B3C2" />
            <stop offset="75%" stopColor="#7F8E9F" />
            <stop offset="100%" stopColor="#606E7F" />
          </radialGradient>
          <radialGradient id="catEar" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFC8D3" />
            <stop offset="100%" stopColor="#FFA6B4" />
          </radialGradient>
        </defs>

        {/* 뾰족하고 귀여운 고양이 귀 */}
        <path d="M 16 35 L 11 11 Q 23 17 31 27" fill="url(#catBody)" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 17 30 L 14 17 Q 21 21 26 27" fill="url(#catEar)" />

        <path d="M 84 35 L 89 11 Q 77 17 69 27" fill="url(#catBody)" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 83 30 L 86 17 Q 79 21 74 27" fill="url(#catEar)" />

        {/* 둥근 고양이 얼굴 */}
        <circle cx="50" cy="51" r="35" fill="url(#catBody)" stroke="#1E293B" strokeWidth="3" />

        {/* 하얀 수염 구역 */}
        <ellipse cx="50" cy="59" rx="12" ry="7.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />

        {/* 크고 맑은 보석 같은 금색 눈 */}
        <circle cx="34" cy="45" r="8" fill="#FFD700" stroke="#1E293B" strokeWidth="1.5" />
        <circle cx="34" cy="45" r="5.2" fill="#1E293B" /> {/* 눈동자 */}
        <circle cx="32" cy="42" r="2" fill="#FFFFFF" /> {/* 반짝임 */}
        <circle cx="36" cy="47" r="0.8" fill="#FFFFFF" />

        <circle cx="66" cy="45" r="8" fill="#FFD700" stroke="#1E293B" strokeWidth="1.5" />
        <circle cx="66" cy="45" r="5.2" fill="#1E293B" />
        <circle cx="64" cy="42" r="2" fill="#FFFFFF" />
        <circle cx="68" cy="47" r="0.8" fill="#FFFFFF" />

        {/* 핑크빛 볼터치 */}
        <ellipse cx="23" cy="55" rx="5" ry="3" fill="#FF9AA2" opacity="0.65" />
        <ellipse cx="77" cy="55" rx="5" ry="3" fill="#FF9AA2" opacity="0.65" />

        {/* 귀여운 아기 고양이 표정 */}
        <polygon points="48,55 52,55 50,57.5" fill="#FF8E9E" stroke="#1E293B" strokeWidth="1" />
        <path d="M 43 61 Q 47 64 50 61 Q 53 64 57 61" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

        {/* 고양이 수염 */}
        <line x1="20" y1="58" x2="8" y2="56" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="20" y1="62" x2="7" y2="63" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />

        <line x1="80" y1="58" x2="92" y2="56" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="80" y1="62" x2="93" y2="63" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />

        {/* 3D 광택 */}
        <ellipse cx="38" cy="28" rx="13" ry="6" fill="url(#catGloss)" transform="rotate(-15 38 28)" />
      </svg>
    </div>
  );
};

// [전통 스타일 3D 바둑돌] - 입체감이 있는 전통 돌 디자인
const Traditional3DStone = ({ color, isPreview = false }: { color: 'black' | 'white'; isPreview?: boolean }) => {
  const isBlack = color === 'black';
  return (
    <div
      className={`w-[85%] h-[85%] rounded-full transition-all duration-300 ${
        isPreview 
          ? 'opacity-40 select-none' 
          : 'shadow-[0_5px_8px_rgba(0,0,0,0.3),inset_0_-4px_6px_rgba(0,0,0,0.4)]'
      }`}
      style={{
        background: isBlack
          ? 'radial-gradient(circle at 35% 30%, #475569 0%, #1E293B 45%, #0F172A 100%)'
          : 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #F1F5F9 55%, #CBD5E1 100%)',
        border: isBlack ? '2.5px solid #0F172A' : '2.5px solid #94A3B8',
      }}
    />
  );
};

// [숲속 가일 3D 과일돌] - 밤톨이(🌰)와 귀여운 버섯(🍄)
const Forest3DStone = ({ color, isPreview = false }: { color: 'black' | 'white'; isPreview?: boolean }) => {
  const isChestnut = color === 'black'; // Black = Chestnut 🌰, White = Mushroom 🍄
  
  if (isChestnut) {
    // 3D 밤톨이 (Chestnut)
    return (
      <div className={`w-[90%] h-[90%] flex items-center justify-center ${isPreview ? 'opacity-45 select-none' : 'drop-shadow-[0_3px_5px_rgba(0,0,0,0.25)]'}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="chestnutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A0522D" />
              <stop offset="50%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#5C2E0B" />
            </linearGradient>
            <linearGradient id="chestnutBase" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5DEB3" />
              <stop offset="100%" stopColor="#D2B48C" />
            </linearGradient>
          </defs>
          {/* 밤톨 몸통 */}
          <path d="M 50 12 C 75 16, 92 48, 85 70 C 80 82, 68 85, 50 85 C 32 85, 20 82, 15 70 C 8 48, 25 16, 50 12 Z" fill="url(#chestnutGrad)" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
          {/* 아랫부분 밝은 영역 */}
          <path d="M 18 73 C 24 83, 38 85, 50 85 C 62 85, 76 83, 82 73 C 70 70, 30 70, 18 73 Z" fill="url(#chestnutBase)" stroke="#1E293B" strokeWidth="2" />
          {/* 눈 */}
          <circle cx="36" cy="50" r="5.5" fill="#1E293B" />
          <circle cx="34" cy="48" r="1.8" fill="#FFFFFF" />
          <circle cx="64" cy="50" r="5.5" fill="#1E293B" />
          <circle cx="62" cy="48" r="1.8" fill="#FFFFFF" />
          {/* 볼터치 */}
          <ellipse cx="26" cy="56" rx="4" ry="2.5" fill="#FF8E9E" opacity="0.6" />
          <ellipse cx="74" cy="56" rx="4" ry="2.5" fill="#FF8E9E" opacity="0.6" />
          {/* 귀여운 미소 */}
          <path d="M 44 58 Q 50 63 56 58" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  } else {
    // 3D 버섯 (Mushroom)
    return (
      <div className={`w-[90%] h-[90%] flex items-center justify-center ${isPreview ? 'opacity-45 select-none' : 'drop-shadow-[0_3px_5px_rgba(0,0,0,0.25)]'}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <radialGradient id="mushCap" cx="40%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="70%" stopColor="#E84A4A" />
              <stop offset="100%" stopColor="#B22222" />
            </radialGradient>
            <linearGradient id="mushStem" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          {/* 버섯 대(줄기) */}
          <path d="M 36 55 Q 36 85 50 85 Q 64 85 64 55" fill="url(#mushStem)" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* 버섯 갓 */}
          <path d="M 12 52 C 12 24, 88 24, 88 52 C 75 56, 25 56, 12 52 Z" fill="url(#mushCap)" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
          {/* 버섯 갓 무늬 (흰 반점) */}
          <circle cx="30" cy="34" r="5" fill="#FFFFFF" />
          <circle cx="50" cy="28" r="6.5" fill="#FFFFFF" />
          <circle cx="70" cy="35" r="4.5" fill="#FFFFFF" />
          <circle cx="18" cy="45" r="3.5" fill="#FFFFFF" />
          <circle cx="82" cy="44" r="3.5" fill="#FFFFFF" />
          {/* 줄기 얼굴 눈 */}
          <circle cx="43" cy="65" r="3.5" fill="#1E293B" />
          <circle cx="57" cy="65" r="3.5" fill="#1E293B" />
          {/* 미소 */}
          <path d="M 47 71 Q 50 74 53 71" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
};

export default function BadukGame({
  onBack,
  stoneType,
  boardTheme,
  userScore,
  setUserScore,
}: BadukGameProps) {
  // 19x19 board representation
  const [board, setBoard] = useState<('black' | 'white' | null)[][]>(
    Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))
  );

  // Alternating turn: black stone always starts first
  const [currentTurn, setCurrentTurn] = useState<'black' | 'white'>('black');

  // Game Status State: 'playing' | 'draw' | 'won_black' | 'won_white'
  const [playStatus, setPlayStatus] = useState<'playing' | 'draw' | 'won_black' | 'won_white'>('playing');

  // Undo history stack
  const [history, setHistory] = useState<{
    board: ('black' | 'white' | null)[][];
    turn: 'black' | 'white';
    status: 'playing' | 'draw' | 'won_black' | 'won_white';
  }[]>([]);

  // How-to-play instruction modal visibility state
  const [showHowTo, setShowHowTo] = useState(false);

  // Speech bubble turn indicator visibility and text
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');

  // Store active particle burst effects (stars and dust puffs) to show on placement
  const [boardParticles, setBoardParticles] = useState<{
    id: string;
    r: number;
    c: number;
    type: 'star' | 'dust';
    angle: number;
    distance: number;
    size: number;
  }[]>([]);

  // Track hovered cell coordinate for glow and preview
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);

  // Character custom names based on current stone skins
  const getCharacterName = (color: 'black' | 'white') => {
    if (color === 'black') {
      if (stoneType === 'animals') return '고양이';
      if (stoneType === 'forest') return '밤톨이';
      return '검은 돌';
    } else {
      if (stoneType === 'animals') return '포메라니안';
      if (stoneType === 'forest') return '빨간 버섯';
      return '하얀 돌';
    }
  };

  // Character emojis
  const getCharacterEmoji = (color: 'black' | 'white') => {
    if (color === 'black') {
      if (stoneType === 'animals') return '🐱';
      if (stoneType === 'forest') return '🌰';
      return '⚫';
    } else {
      if (stoneType === 'animals') return '🐶';
      if (stoneType === 'forest') return '🍄';
      return '⚪';
    }
  };

  // Turn changes speech bubble triggers
  useEffect(() => {
    const characterName = getCharacterName(currentTurn);
    setBubbleText(`${characterName} 차례입니다.`);
    setShowBubble(true);
    const t = setTimeout(() => {
      setShowBubble(false);
    }, 1200);
    return () => clearTimeout(t);
  }, [currentTurn]);

  // Restart the board
  const handleRestart = () => {
    playClickSound();
    setBoard(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null)));
    setCurrentTurn('black');
    setPlayStatus('playing');
    setHistory([]);
    setBoardParticles([]);
    setHoveredCell(null);
    setShowBubble(false);
  };

  // Undo the last placement or removal
  const handleUndo = () => {
    if (history.length === 0) return;
    playClickSound();
    const lastState = history[history.length - 1];
    setBoard(lastState.board);
    setCurrentTurn(lastState.turn);
    setPlayStatus(lastState.status);
    setHistory((prev) => prev.slice(0, -1));
    setHoveredCell(null);
    setShowBubble(false);
  };

  // Gomoku 5-in-a-row winner verification algorithm
  const checkWinner = (grid: ('black' | 'white' | null)[][], row: number, col: number, color: 'black' | 'white'): boolean => {
    const directions = [
      { dr: 0, dc: 1 },  // horizontal
      { dr: 1, dc: 0 },  // vertical
      { dr: 1, dc: 1 },  // diagonal down-right
      { dr: 1, dc: -1 }, // diagonal down-left
    ];

    for (const { dr, dc } of directions) {
      let count = 1;

      // Positive offset checks
      let r = row + dr;
      let c = col + dc;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && grid[r][c] === color) {
        count++;
        r += dr;
        c += dc;
      }

      // Negative offset checks
      r = row - dr;
      c = col - dc;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && grid[r][c] === color) {
        count++;
        r -= dr;
        c -= dc;
      }

      if (count >= 5) {
        return true;
      }
    }
    return false;
  };

  // Board fully occupied validation
  const isBoardFull = (grid: ('black' | 'white' | null)[][]) => {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (grid[r][c] === null) return false;
      }
    }
    return true;
  };

  // Particle spawning algorithm for beautiful splash effects on landing
  const spawnParticles = (r: number, c: number) => {
    const newParticles: typeof boardParticles = [];
    const count = 7; // 7 star particles + 7 dust particles

    // 1. Sparkle Stars (반짝이는 별 효과)
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: `star-${r}-${c}-${Date.now()}-${i}-${Math.random()}`,
        r,
        c,
        type: 'star',
        angle: (i * (360 / count)) + Math.random() * 25,
        distance: 24 + Math.random() * 26,
        size: 7 + Math.random() * 8,
      });
    }

    // 2. Dust Puffs (작은 먼지 효과)
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: `dust-${r}-${c}-${Date.now()}-${i}-${Math.random()}`,
        r,
        c,
        type: 'dust',
        angle: (i * (360 / count)) + 15 + Math.random() * 25,
        distance: 14 + Math.random() * 18,
        size: 5 + Math.random() * 6,
      });
    }

    setBoardParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles shortly after explosion ends
    setTimeout(() => {
      setBoardParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 1000);
  };

  const handleCellClick = (r: number, c: number) => {
    // Block playing if game already won/drawn
    if (playStatus !== 'playing') return;

    const existing = board[r][c];

    // Push current board to history before updating state
    setHistory((prev) => [
      ...prev,
      {
        board: board.map((row) => [...row]),
        turn: currentTurn,
        status: playStatus,
      },
    ]);

    // Toggle/Remove stone if clicked on an occupied cell (Friendly UX to fix wrong moves)
    if (existing !== null) {
      playClickSound();
      const updated = board.map((row) => [...row]);
      updated[r][c] = null;
      setBoard(updated);
      return;
    }

    // Play cute responsive sound effect depending on stone design
    playStoneSound(stoneType);

    // Place the stone on board
    const updated = board.map((row) => [...row]);
    updated[r][c] = currentTurn;
    setBoard(updated);

    // Trigger explosive stars and dust particles at (r, c)
    spawnParticles(r, c);

    // Check winner or draw
    if (checkWinner(updated, r, c, currentTurn)) {
      setPlayStatus(currentTurn === 'black' ? 'won_black' : 'won_white');
      playSuccessSound();

      // Fun victory sparkles explosion loop
      for (let i = 0; i < 3; i++) {
        setTimeout(() => spawnParticles(r, c), i * 150);
      }
    } else if (isBoardFull(updated)) {
      setPlayStatus('draw');
    } else {
      // Switch turns
      setCurrentTurn(currentTurn === 'black' ? 'white' : 'black');
    }

    // Increase user score for practicing placements!
    setUserScore((prev) => {
      const nextScore = prev + 1;
      try {
        localStorage.setItem('forest_baduk_score', String(nextScore));
      } catch (e) {
        // Ignore
      }
      return nextScore;
    });
  };

  // Render Stone wrapper based on user selection in settings
  const renderStoneGraphic = (color: 'black' | 'white', isPreview = false) => {
    switch (stoneType) {
      case 'animals':
        return color === 'black' ? <CatStone isPreview={isPreview} /> : <PomeranianStone isPreview={isPreview} />;
      case 'forest':
        return <Forest3DStone color={color} isPreview={isPreview} />;
      case 'traditional':
      default:
        return <Traditional3DStone color={color} isPreview={isPreview} />;
    }
  };

  // Determine board styling based on theme
  const getBoardBgStyle = () => {
    switch (boardTheme) {
      case 'meadow':
        return 'bg-gradient-to-br from-[#9FE4C9] via-[#86D6B6] to-[#59C294]'; // Grassy green
      case 'wood':
      default:
        return 'bg-gradient-to-br from-[#FCDAA2] via-[#E8B97C] to-[#CD9554]'; // Cozy wood
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ type: 'spring', damping: 18, stiffness: 95 }}
      className="flex flex-col items-center justify-center min-h-[85vh] w-full max-w-xl mx-auto px-4 z-10 select-none space-y-5"
    >
      {/* Immersive Header Indicator & Game Status State */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between bg-white rounded-3xl border-[4px] border-[#1E293B] shadow-[4px_4px_0px_#1E293B] px-5 py-3 gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl shrink-0">
            {playStatus === 'playing' 
              ? getCharacterEmoji(currentTurn) 
              : playStatus === 'draw' ? '🤝' : getCharacterEmoji(playStatus === 'won_black' ? 'black' : 'white')
            }
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                {playStatus === 'playing' ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 animate-pulse"></span>
                )}
              </span>
              <span className="text-[10px] text-slate-400 font-extrabold leading-none">
                {playStatus === 'playing' ? '현재 진행 중' : '게임 종료'}
              </span>
            </div>
            
            <div className="text-xs sm:text-sm font-black text-[#1E293B] mt-1">
              {playStatus === 'playing' ? (
                <span>{getCharacterName(currentTurn)} 차례입니다!</span>
              ) : playStatus === 'draw' ? (
                <span className="text-amber-500">무승부! 멋진 대결이었어요!</span>
              ) : (
                <span className="text-emerald-500">🎉 {getCharacterName(playStatus === 'won_black' ? 'black' : 'white')} 승리! 🎉</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-[#5D9CEC]/10 px-3 py-1.5 rounded-2xl border-2 border-[#1E293B] shrink-0 self-stretch sm:self-auto justify-center">
          <Award className="w-4 h-4 text-[#5D9CEC]" />
          <span className="text-[11px] font-black text-[#1E293B]">{userScore} 점</span>
        </div>
      </div>

      {/* Turn Speech Bubble Notification Overlay */}
      <div className="relative w-full h-0 flex justify-center z-40 pointer-events-none">
        <AnimatePresence>
          {showBubble && playStatus === 'playing' && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.7 }}
              animate={{ opacity: 1, y: -28, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.7 }}
              transition={{ type: 'spring', damping: 11, stiffness: 140 }}
              className="absolute bg-white text-[#1E293B] font-black text-xs sm:text-sm px-4.5 py-2.5 rounded-2xl border-[3px] border-[#1E293B] shadow-[3px_3px_0px_#1E293B] flex items-center gap-2"
            >
              <span className="text-base">{getCharacterEmoji(currentTurn)}</span>
              <span>{bubbleText}</span>
              {/* Down pointing Speech Arrow */}
              <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-t-[8px] border-t-white border-x-[8px] border-x-transparent" />
              <div className="absolute bottom-[-11px] left-1/2 -translate-x-1/2 w-0 h-0 border-t-[8.5px] border-t-[#1E293B] border-x-[8.5px] border-x-transparent -z-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helpful Hint Notice */}
      <div className="w-full py-2 px-3 bg-[#FDFCF0] text-[#1E293B] text-[10px] sm:text-[11px] font-bold text-center rounded-2xl border-[3px] border-[#1E293B] shadow-[2px_2px_0_#1E293B] flex items-center justify-center gap-1.5 leading-normal">
        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 animate-pulse" />
        <span>교차점에 마우스를 대면 반투명 미리보기가 나오고, 터치하면 튕기며 착지해요! 🌟</span>
      </div>

      {/* 1. Wood Stump Container (나무 그루터기) */}
      <div className="relative w-full aspect-square max-w-[460px] p-5 sm:p-7 md:p-8 rounded-full bg-gradient-to-b from-[#8E5E38] via-[#754928] to-[#4F2D14] border-[11px] sm:border-[13px] border-[#3D200B] shadow-[0_16px_32px_rgba(0,0,0,0.4),inset_0_4px_12px_rgba(255,255,255,0.15)] flex items-center justify-center overflow-hidden">
        
        {/* Tree Stump Rings (나이테 효과) */}
        <div className="absolute inset-2 rounded-full border-[3px] border-dashed border-[#3A1D08]/20 pointer-events-none" />
        <div className="absolute inset-10 rounded-full border border-[#3A1D08]/15 pointer-events-none" />
        <div className="absolute inset-20 rounded-full border-2 border-dashed border-[#3A1D08]/12 pointer-events-none" />
        <div className="absolute inset-32 rounded-full border border-[#3A1D08]/8 pointer-events-none" />
        <div className="absolute inset-44 rounded-full border-2 border-dashed border-[#3A1D08]/5 pointer-events-none" />

        {/* 2. Realistic 3D Wooden Baduk Board (입체적 바둑판) */}
        <div className="relative w-full h-full rounded-2xl border-[4px] border-[#1E293B] shadow-[0_12px_0px_#55351B,0_16px_28px_rgba(0,0,0,0.45)] p-[8px] sm:p-[12px] md:p-[14px] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_14px_0px_#55351B,0_20px_35px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center">
          
          {/* Wood board theme background texture */}
          <div className={`absolute inset-0 transition-all duration-300 ${getBoardBgStyle()}`} />
          
          {/* Wood grain pattern lines overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4D2E14]/3 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_80%)] pointer-events-none" />

          {/* Grid lines & Star points */}
          <div className="absolute inset-[8px] sm:inset-[12px] md:inset-[14px] pointer-events-none">
            {/* Horizontal Grid Lines */}
            {[...Array(BOARD_SIZE)].map((_, r) => {
              const percent = (r / (BOARD_SIZE - 1)) * 100;
              return (
                <div
                  key={`h-${r}`}
                  className="absolute left-0 right-0 h-[1.2px] bg-[#1E293B]/35"
                  style={{ top: `${percent}%` }}
                />
              );
            })}

            {/* Vertical Grid Lines */}
            {[...Array(BOARD_SIZE)].map((_, c) => {
              const percent = (c / (BOARD_SIZE - 1)) * 100;
              return (
                <div
                  key={`v-${c}`}
                  className="absolute top-0 bottom-0 w-[1.2px] bg-[#1E293B]/35"
                  style={{ left: `${percent}%` }}
                />
              );
            })}

            {/* Star Points (화점) */}
            {STAR_POINTS.map((r) =>
              STAR_POINTS.map((c) => {
                const topPercent = (r / (BOARD_SIZE - 1)) * 100;
                const leftPercent = (c / (BOARD_SIZE - 1)) * 100;
                return (
                  <div
                    key={`star-${r}-${c}`}
                    className="absolute w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full bg-[#1E293B]/85 -translate-x-1/2 -translate-y-1/2 shadow-[0.5px_0.5px_0_rgba(255,255,255,0.3)]"
                    style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                  />
                );
              })
            )}
          </div>

          {/* Intersections & Clickable Target Highlights */}
          <div
            className="absolute inset-[8px] sm:inset-[12px] md:inset-[14px]"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
            }}
          >
            {[...Array(BOARD_SIZE)].map((_, r) =>
              [...Array(BOARD_SIZE)].map((_, c) => {
                const cell = board[r][c];
                const isHovered = hoveredCell && hoveredCell.r === r && hoveredCell.c === c;
                const activeParticles = boardParticles.filter((p) => p.r === r && p.c === c);

                return (
                  <div
                    key={`${r}-${c}`}
                    onMouseEnter={() => setHoveredCell({ r, c })}
                    onMouseLeave={() => setHoveredCell(null)}
                    onClick={() => handleCellClick(r, c)}
                    className="relative flex items-center justify-center cursor-pointer group/cell select-none"
                    style={{
                      margin: '-4.5px', // slightly wider overlap area for comfortable touch targets
                    }}
                  >
                    {/* Glow and Preview Layer on Empty Cell Hover (클릭 가능한 위치만 표시) */}
                    {cell === null && playStatus === 'playing' && (
                      <>
                        {/* Hover glow background */}
                        <div
                          className={`absolute w-4 h-4 sm:w-5.5 sm:h-5.5 rounded-full transition-all duration-150 ${
                            isHovered 
                              ? 'bg-white/45 scale-125 border border-white shadow-[0_0_12px_rgba(255,255,255,0.9)] z-10' 
                              : 'bg-transparent scale-100'
                          }`}
                        />
                        {/* Dot guide */}
                        <div
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                            isHovered 
                              ? 'bg-white shadow-[0_0_5px_#fff] opacity-0' 
                              : 'bg-[#1E293B]/10 group-hover/cell:bg-[#1E293B]/25'
                          }`}
                        />
                        {/* Translucent preview stone on hover (반투명 미리보기 돌) */}
                        {isHovered && (
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none scale-105">
                            {renderStoneGraphic(currentTurn, true)}
                          </div>
                        )}
                      </>
                    )}

                    {/* Placed Stone with cute bouncy fall animation (위에서 살짝 내려와서 통통 튀며 착지) */}
                    {cell !== null && (
                      <motion.div
                        initial={{ y: -50, scale: 0.2, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        transition={{
                          type: 'spring',
                          damping: 10,  // soft squishy rebound bounce
                          stiffness: 155, // energetic spring rate
                          mass: 0.85,
                        }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center z-10"
                      >
                        {renderStoneGraphic(cell, false)}
                      </motion.div>
                    )}

                    {/* Explosive Stars & Dust Particles (반짝이는 별 + 작은 먼지 입자 효과) */}
                    <AnimatePresence>
                      {activeParticles.map((p) => {
                        const rad = (p.angle * Math.PI) / 180;
                        const tx = Math.cos(rad) * p.distance;
                        const ty = Math.sin(rad) * p.distance;

                        return (
                          <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 0.2 }}
                            animate={{
                              x: tx,
                              y: ty,
                              opacity: [1, 0.85, 0],
                              scale: p.type === 'star' ? [0.2, 1.3, 0.1] : [0.2, 1.4, 0.2],
                              rotate: p.type === 'star' ? [0, 180, 360] : 0,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: p.type === 'star' ? 0.72 : 0.58,
                              ease: 'easeOut',
                            }}
                            className="absolute pointer-events-none z-30"
                            style={{
                              width: p.size,
                              height: p.size,
                              top: '50%',
                              left: '50%',
                              marginTop: -p.size / 2,
                              marginLeft: -p.size / 2,
                            }}
                          >
                            {p.type === 'star' ? (
                              <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-400 fill-yellow-300 drop-shadow-[0_0_3px_rgba(253,224,71,0.85)]">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ) : (
                              <div className="w-full h-full rounded-full bg-[#FAF7ED] opacity-60 border border-slate-200/25 blur-[0.4px]" />
                            )}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>

      {/* 3. Navigation Controls Grid (홈으로, 게임 방법, 실행 취소, 다시 시작) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-1.5">
        {/* 🏠 홈으로 */}
        <motion.button
          onClick={() => {
            playClickSound();
            onBack();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-1.5 px-3 py-3 bg-[#5D9CEC] text-white font-black text-xs sm:text-sm rounded-2xl border-[3px] border-[#1E293B] shadow-[0_4px_0_#1E293B] active:translate-y-[2px] active:shadow-[0_2px_0_#1E293B] cursor-pointer"
        >
          <span>🏠 홈으로</span>
        </motion.button>

        {/* 📖 게임 방법 */}
        <motion.button
          onClick={() => {
            playClickSound();
            setShowHowTo(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-1.5 px-3 py-3 bg-[#4FC1E9] text-white font-black text-xs sm:text-sm rounded-2xl border-[3px] border-[#1E293B] shadow-[0_4px_0_#1E293B] active:translate-y-[2px] active:shadow-[0_2px_0_#1E293B] cursor-pointer"
        >
          <span>📖 게임 방법</span>
        </motion.button>

        {/* ↩ 실행 취소 */}
        <motion.button
          onClick={handleUndo}
          disabled={history.length === 0}
          whileHover={history.length > 0 ? { scale: 1.05 } : {}}
          whileTap={history.length > 0 ? { scale: 0.95 } : {}}
          className={`flex items-center justify-center gap-1.5 px-3 py-3 font-black text-xs sm:text-sm rounded-2xl border-[3px] border-[#1E293B] shadow-[0_4px_0_#1E293B] active:translate-y-[2px] active:shadow-[0_2px_0_#1E293B] transition-opacity ${
            history.length === 0 
              ? 'bg-slate-200 text-slate-400 opacity-60 cursor-not-allowed shadow-none translate-y-[2px]' 
              : 'bg-[#FFCC00] text-[#1E293B] cursor-pointer'
          }`}
        >
          <span>↩ 실행 취소</span>
        </motion.button>

        {/* 🔄 다시 시작 */}
        <motion.button
          onClick={handleRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-1.5 px-3 py-3 bg-[#FF7F50] text-white font-black text-xs sm:text-sm rounded-2xl border-[3px] border-[#1E293B] shadow-[0_4px_0_#1E293B] active:translate-y-[2px] active:shadow-[0_2px_0_#1E293B] cursor-pointer"
        >
          <span>🔄 다시 시작</span>
        </motion.button>
      </div>

      {/* Underline note */}
      <p className="text-[10px] text-slate-400 font-extrabold text-center max-w-xs leading-relaxed">
        🌳 실수로 잘못 놓은 바둑돌은 다시 터치하거나 [실행 취소]로 거두어 갈 수 있어요!
      </p>

      {/* 📖 게임 방법 모달 */}
      <AnimatePresence>
        {showHowTo && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl border-[4px] border-[#1E293B] shadow-[8px_8px_0px_#1E293B] p-6 max-w-sm w-full space-y-4"
            >
              <div className="flex items-center gap-2 border-b-[3px] border-[#1E293B] pb-3">
                <span className="text-2xl">📖</span>
                <h3 className="text-lg font-black text-[#1E293B]">동물숲 바둑 놀이터 방법</h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#1E293B] font-bold leading-relaxed">
                <p className="flex gap-2">
                  <span className="text-emerald-500 shrink-0">⭐</span>
                  <span><strong>오목(5줄 연결) 규칙:</strong> 가로, 세로, 혹은 대각선으로 같은 돌 5개를 먼저 연속으로 나란히 놓으면 승리합니다!</span>
                </p>
                <p className="flex gap-2">
                  <span className="text-[#5D9CEC] shrink-0">🐾</span>
                  <span><strong>흑돌과 백돌 캐릭터:</strong> 흑돌은 고양이/밤톨이고, 백돌은 포메라니안/버섯이에요!</span>
                </p>
                <p className="flex gap-2">
                  <span className="text-yellow-500 shrink-0">✨</span>
                  <span><strong>실행 취소:</strong> 실수로 잘못 놓았다면 아래 <strong>실행 취소</strong> 버튼을 눌러 바로 한 수 뒤로 갈 수 있어요!</span>
                </p>
                <p className="flex gap-2">
                  <span className="text-rose-400 shrink-0">🔄</span>
                  <span><strong>돌 거두기:</strong> 판 위에 놓인 돌을 직접 탭해도 살포시 지울 수 있답니다.</span>
                </p>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  setShowHowTo(false);
                }}
                className="w-full py-3 bg-[#5D9CEC] text-white font-black rounded-2xl border-[3px] border-[#1E293B] shadow-[0_4px_0_#1E293B] active:translate-y-[2px] active:shadow-[0_2px_0_#1E293B] cursor-pointer"
              >
                알겠어요! 🎮
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
