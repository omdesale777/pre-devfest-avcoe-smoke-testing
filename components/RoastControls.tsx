"use client";

import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 p-3 sm:px-4">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-xs font-bold text-[#141414] uppercase tracking-wider flex items-center gap-1">
          <span>🌶️</span>
          <span>Roast Level:</span>
        </span>
        <div className="flex items-center gap-1.5 bg-[#F8F4EC] p-1 rounded-full border border-[#141414]">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className={`cursor-pointer px-3 py-1 rounded-full font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#EDB13E] text-[#141414] border border-[#141414] shadow-[1px_1px_0px_#141414]"
                    : "text-[#66625B] hover:text-[#141414] hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="sr-only"
                />
                <span
                  className={`w-2 h-2 rounded-full border border-[#141414] inline-block ${
                    isSelected ? "bg-[#141414]" : "bg-white"
                  }`}
                />
                <span>{level.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Right controls: Language + Error Toggle + Roast CTA */}
      <div className="flex items-center flex-wrap gap-2.5">
        {/* 2. Language Select */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-bold text-[#141414] uppercase">
            Lang:
          </span>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
              className="appearance-none bg-white border-2 border-[#141414] rounded-lg px-2.5 py-1.5 pr-7 font-mono text-xs font-bold text-[#141414] shadow-[2px_2px_0px_#141414] focus:outline-none focus:ring-1 focus:ring-[#EDB13E] cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label} (.{lang.extension})
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-[#141414]">
              ▾
            </span>
          </div>
        </div>

        {/* 3. Error Drawer Toggle */}
        <button
          type="button"
          onClick={onToggleErrorDrawer}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border-2 border-[#141414] ${
            errorDrawerOpen
              ? "bg-[#141414] text-white shadow-[2px_2px_0px_#EDB13E]"
              : "bg-white text-[#141414] border-dashed shadow-[2px_2px_0px_#141414] hover:bg-[#F8F4EC]"
          }`}
        >
          {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
        </button>

        {/* 4. Primary Roast CTA */}
        <button
          type="button"
          onClick={onRoast}
          disabled={isRoasting}
          className={`py-2 px-4 sm:px-5 rounded-full font-mono text-xs font-bold border-2 border-[#141414] transition-all flex items-center gap-2 ${
            isRoasting
              ? "bg-[#66625B] text-white opacity-80 cursor-not-allowed animate-pulse"
              : "bg-[#EDB13E] hover:bg-[#141414] text-[#141414] hover:text-white shadow-[3px_3px_0px_#141414] brutal-press"
          }`}
        >
          {isRoasting ? (
            <span>ANALYZING... ⏳</span>
          ) : (
            <>
              <span>ROAST MY CODE 🔥</span>
              <kbd className="hidden sm:inline-block bg-[#141414] text-white group-hover:bg-white group-hover:text-[#141414] px-1.5 py-0.2 rounded text-[10px] font-bold">
                Ctrl ⏎
              </kbd>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
