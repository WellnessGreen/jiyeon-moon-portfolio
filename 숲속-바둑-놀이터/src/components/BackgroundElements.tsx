/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export default function BackgroundElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Custom CSS for fairytale forest animations */}
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes sway-slow {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes drift-cloud-slow {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(calc(100vw + 150px)); }
        }
        @keyframes drift-cloud-fast {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        @keyframes fly-bird-path {
          0% { transform: translate(-100px, 15vh) scale(0.6); }
          30% { transform: translate(30vw, 8vh) scale(0.7); }
          60% { transform: translate(65vw, 18vh) scale(0.65); }
          100% { transform: translate(calc(100vw + 100px), 12vh) scale(0.6); }
        }
        @keyframes fly-bird-wing {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.2); }
        }
        @keyframes sun-ray-glow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-sway { animation: sway 6s ease-in-out infinite; }
        .animate-sway-slow { animation: sway-slow 9s ease-in-out infinite; }
        .animate-drift-slow { animation: drift-cloud-slow 45s linear infinite; }
        .animate-drift-fast { animation: drift-cloud-fast 30s linear infinite; }
        .animate-fly-bird { animation: fly-bird-path 18s linear infinite; }
        .animate-wing-flap { animation: fly-bird-wing 0.4s ease-in-out infinite; }
        .animate-ray { animation: sun-ray-glow 4s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 5s ease-in-out infinite; }
      `}</style>

      {/* Warm Cream Base */}
      <div className="absolute inset-0 bg-[#FDFCF0]" />

      {/* Abstract Pastel Geometric Elements behind (Geometric Balance) */}
      <div className="absolute inset-0 opacity-15 overflow-hidden">
        {/* Coral Arch */}
        <div className="absolute top-10 left-[15%] w-72 h-72 rounded-t-full border-[12px] border-[#FF7F50] border-b-0" />
        {/* Soft Blue Sphere */}
        <div className="absolute top-[25%] right-[10%] w-48 h-48 rounded-full bg-[#5D9CEC]" />
        {/* Light Pink Triangle */}
        <div className="absolute bottom-[40%] left-[5%] w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-[#FFB6C1]" />
        {/* Lime Green Donut */}
        <div className="absolute bottom-[25%] right-[25%] w-36 h-36 rounded-full border-[16px] border-[#7BC043]" />
      </div>

      {/* Sun Rays (햇살이 비추는 느낌) */}
      <div className="absolute top-0 left-0 w-full h-[60%] overflow-hidden opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] origin-top-left animate-ray bg-[radial-gradient(circle_at_10%_10%,rgba(253,224,71,0.4)_0%,rgba(253,224,71,0.05)_50%,transparent_100%)]" />
      </div>

      {/* Clouds (구름이 천천히 움직이는 애니메이션) */}
      <div className="absolute top-[8%] left-0 w-full h-[25%] overflow-hidden">
        {/* Cloud 1 */}
        <div className="absolute left-0 top-[10%] animate-drift-slow" style={{ animationDelay: '0s' }}>
          <svg className="w-28 h-16 text-white/80 filter drop-shadow-sm" fill="currentColor" viewBox="0 0 100 60">
            <path d="M 20 40 a 20 20 0 0 1 20 -20 a 25 25 0 0 1 45 5 a 15 15 0 0 1 10 30 c -5 5 -75 5 -75 -15 Z" />
          </svg>
        </div>
        {/* Cloud 2 */}
        <div className="absolute left-0 top-[40%] animate-drift-fast" style={{ animationDelay: '-12s' }}>
          <svg className="w-20 h-12 text-white/90 filter drop-shadow-sm" fill="currentColor" viewBox="0 0 100 60">
            <path d="M 20 40 a 15 15 0 0 1 15 -15 a 20 20 0 0 1 40 4 a 12 12 0 0 1 10 24 c -4 4 -65 4 -65 -13 Z" />
          </svg>
        </div>
        {/* Cloud 3 */}
        <div className="absolute left-0 top-[25%] animate-drift-slow" style={{ animationDelay: '-25s' }}>
          <svg className="w-32 h-20 text-white/70 filter drop-shadow-sm" fill="currentColor" viewBox="0 0 100 60">
            <path d="M 25 45 a 18 18 0 0 1 18 -18 a 22 22 0 0 1 38 6 a 14 14 0 0 1 9 22 c -5 5 -65 5 -65 -10 Z" />
          </svg>
        </div>
      </div>

      {/* Flying Birds (새가 날아다니는 애니메이션) */}
      <div className="absolute top-[10%] left-0 w-full h-[30%]">
        <div className="absolute animate-fly-bird">
          <div className="relative">
            {/* Minimalist cute bird SVG */}
            <svg className="w-10 h-8 text-sky-500/80" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path className="animate-wing-flap origin-center" strokeLinecap="round" strokeLinejoin="round" d="M3 12c4-4 8-4 12 0m-12 0c4 4 8 4 12 0m-12 0h18" />
            </svg>
          </div>
        </div>
        {/* Bird 2 (staggered delay) */}
        <div className="absolute animate-fly-bird" style={{ animationDelay: '-9s', animationDuration: '24s' }}>
          <div className="relative">
            <svg className="w-8 h-6 text-sky-400/70" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path className="animate-wing-flap origin-center" style={{ animationDuration: '0.35s' }} strokeLinecap="round" strokeLinejoin="round" d="M3 12c4-4 8-4 12 0M3 12c4 4 8 4 12 0" />
            </svg>
          </div>
        </div>
      </div>

      {/* Far Background Mountains / Soft Hills */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] flex items-end">
        {/* Soft Green Hill 1 */}
        <div className="absolute left-[-10%] bottom-[-5%] w-[60%] h-[90%] bg-emerald-100/60 rounded-t-[100%] filter blur-md" />
        {/* Soft Green Hill 2 */}
        <div className="absolute right-[-10%] bottom-[-10%] w-[65%] h-[85%] bg-teal-100/50 rounded-t-[100%] filter blur-md" />
        {/* Soft Green Hill 3 */}
        <div className="absolute left-[20%] bottom-[-15%] w-[70%] h-[80%] bg-green-100/70 rounded-t-[100%] filter blur-lg" />
      </div>

      {/* Midground Trees & Forest Elements (나무, 버섯, 꽃, 풀로 꾸며진 숲속) */}
      <div className="absolute bottom-0 left-0 w-full h-[35%]">
        
        {/* Cozy Tree Left */}
        <div className="absolute left-[3%] bottom-[12%] w-[24%] max-w-[200px] h-full flex flex-col items-center justify-end">
          {/* Tree Canopy */}
          <div className="relative w-full aspect-square flex items-center justify-center animate-sway origin-bottom">
            <div className="absolute bottom-0 w-full h-full bg-[#7BC043] rounded-full border-[3px] border-[#1E293B] shadow-sm" />
            <div className="absolute bottom-[10%] left-[10%] w-[80%] h-[80%] bg-[#5D9CEC] rounded-full border-[3px] border-[#1E293B]" />
            <div className="absolute bottom-[20%] left-[20%] w-[50%] h-[50%] bg-[#FF7F50] rounded-full border-[3px] border-[#1E293B]" />
            {/* Small leaves/berries in the tree */}
            <div className="absolute top-[25%] left-[30%] w-3 h-3 bg-[#FFB6C1] rounded-full border border-[#1E293B]" />
            <div className="absolute top-[45%] right-[25%] w-3.5 h-3.5 bg-[#FDFCF0] rounded-full border border-[#1E293B]" />
            <div className="absolute top-[60%] left-[20%] w-2.5 h-2.5 bg-[#FF7F50] rounded-full border border-[#1E293B]" />
          </div>
          {/* Trunk */}
          <div className="w-[18%] h-[35%] bg-amber-800 border-x-[3px] border-t-[3px] border-[#1E293B] rounded-t-md" />
        </div>

        {/* Cozy Tree Right */}
        <div className="absolute right-[5%] bottom-[8%] w-[22%] max-w-[180px] h-full flex flex-col items-center justify-end">
          <div className="relative w-full aspect-[4/5] flex items-center justify-center animate-sway-slow origin-bottom">
            {/* Layered pine tree shape */}
            <div className="absolute bottom-0 w-full h-[60%] bg-[#7BC043] rounded-b-xl clip-triangle border-b-4 border-[#1E293B]" />
            <div className="absolute bottom-[25%] w-[85%] h-[55%] bg-[#5D9CEC] rounded-b-lg border-b-4 border-[#1E293B]" />
            <div className="absolute bottom-[50%] w-[65%] h-[50%] bg-[#FF7F50] rounded-b-md border-b-4 border-[#1E293B]" />
          </div>
          <div className="w-[15%] h-[30%] bg-amber-900 border-x-[3px] border-t-[3px] border-[#1E293B] rounded-t-md" />
        </div>

        {/* Shrub Left */}
        <div className="absolute left-[18%] bottom-[5%] w-16 h-12 bg-[#7BC043] border-[3px] border-[#1E293B] rounded-full animate-sway origin-bottom shadow-sm" />
        {/* Shrub Right */}
        <div className="absolute right-[22%] bottom-[3%] w-20 h-14 bg-[#5D9CEC] border-[3px] border-[#1E293B] rounded-full animate-sway-slow origin-bottom shadow-sm" />

        {/* Whimsical Mushrooms (꽃, 버섯) */}
        {/* Mushroom Left */}
        <div className="absolute left-[12%] bottom-[2%] w-10 h-10 animate-float-gentle" style={{ animationDelay: '0.5s' }}>
          {/* Stem */}
          <div className="absolute left-[35%] bottom-0 w-[30%] h-[70%] bg-amber-100 rounded-t-full border-x-[2px] border-t-[2px] border-[#1E293B]" />
          {/* Cap */}
          <div className="absolute top-0 left-0 w-full h-[55%] bg-[#FF7F50] rounded-t-full border-[3px] border-[#1E293B] shadow-sm">
            {/* White dots */}
            <div className="absolute top-[20%] left-[25%] w-2 h-2 bg-white rounded-full border border-[#1E293B]" />
            <div className="absolute top-[40%] right-[20%] w-1.5 h-1.5 bg-white rounded-full border border-[#1E293B]" />
            <div className="absolute top-[15%] right-[30%] w-1 h-1 bg-white rounded-full border border-[#1E293B]" />
          </div>
        </div>

        {/* Mushroom Right (small duo) */}
        <div className="absolute right-[15%] bottom-[1%] w-8 h-8 animate-float-gentle" style={{ animationDelay: '1.2s' }}>
          <div className="absolute left-[35%] bottom-0 w-[30%] h-[70%] bg-amber-50 rounded-t-full" />
          <div className="absolute top-0 left-0 w-full h-[55%] bg-amber-400 rounded-t-full shadow-sm">
            <div className="absolute top-[25%] left-[30%] w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>

        {/* Sweet Flowers (꽃) */}
        {/* Pink Flower Left */}
        <div className="absolute left-[24%] bottom-[3%] w-6 h-10 flex flex-col items-center">
          <div className="w-1 h-6 bg-emerald-500" />
          <div className="absolute top-0 w-6 h-6 flex items-center justify-center">
            {/* Petals */}
            <div className="absolute w-2 h-2 bg-pink-400 rounded-full -translate-x-1.5" />
            <div className="absolute w-2 h-2 bg-pink-400 rounded-full translate-x-1.5" />
            <div className="absolute w-2 h-2 bg-pink-400 rounded-full -translate-y-1.5" />
            <div className="absolute w-2 h-2 bg-pink-400 rounded-full translate-y-1.5" />
            {/* Center */}
            <div className="z-10 w-2.5 h-2.5 bg-yellow-300 rounded-full border border-pink-500/20" />
          </div>
        </div>

        {/* Blue Flower Right */}
        <div className="absolute right-[11%] bottom-[4%] w-6 h-12 flex flex-col items-center">
          <div className="w-1 h-8 bg-emerald-500" />
          <div className="absolute top-0 w-6 h-6 flex items-center justify-center animate-sway" style={{ animationDuration: '4s' }}>
            <div className="absolute w-2 h-2 bg-sky-300 rounded-full -translate-x-1.5" />
            <div className="absolute w-2 h-2 bg-sky-300 rounded-full translate-x-1.5" />
            <div className="absolute w-2 h-2 bg-sky-300 rounded-full -translate-y-1.5" />
            <div className="absolute w-2 h-2 bg-sky-300 rounded-full translate-y-1.5" />
            <div className="z-10 w-2.5 h-2.5 bg-yellow-200 rounded-full" />
          </div>
        </div>

        {/* Tuft of grass (풀) */}
        <div className="absolute left-[40%] bottom-0 flex gap-1">
          <div className="w-1 h-4 bg-emerald-400/80 rounded-full rotate-[-15deg] origin-bottom animate-sway-slow" />
          <div className="w-1.5 h-6 bg-emerald-500/80 rounded-full origin-bottom animate-sway" />
          <div className="w-1 h-5 bg-emerald-400/80 rounded-full rotate-[15deg] origin-bottom animate-sway-slow" />
        </div>
        
        <div className="absolute right-[35%] bottom-0 flex gap-1">
          <div className="w-1.5 h-5 bg-emerald-500/80 rounded-full rotate-[-10deg] origin-bottom animate-sway" />
          <div className="w-1.5 h-6 bg-emerald-400/90 rounded-full origin-bottom animate-sway-slow" />
        </div>
      </div>

      {/* Gentle Floating Dandelion Seeds / Light Particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/75 rounded-full filter blur-[1px] animate-float-gentle"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              top: `${20 + Math.random() * 50}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
