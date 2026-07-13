/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GameState = 'menu' | 'play' | 'quiz' | 'howto' | 'settings' | 'ranking';

export type StoneType = 'traditional' | 'animals' | 'forest';
export type BoardTheme = 'wood' | 'meadow';

export interface SoundSettings {
  bgmVolume: number;
  sfxVolume: number;
  mute: boolean;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  boardSize: number;
  stones: { x: number; y: number; color: 'black' | 'white' }[];
  solution: { x: number; y: number };
  explanation: string;
  difficulty: '쉬움' | '보통' | '어려움';
}

export interface RankEntry {
  id: string;
  name: string;
  score: number;
  character: string;
  date: string;
  isUser?: boolean;
}
