import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-[#141414] bg-[#F8F4EC] select-none">
      {/* Primary Status Row */}
      <div className="px-4 py-2 flex items-center justify-between font-mono text-[11px] text-[#66625B]">
        {/* Left Status */}
        <div className="flex items-center gap-2">
          <span>STATUS:</span>
          {isRoasting ? (
            <span className="text-[#EDB13E] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#EDB13E] animate-ping inline-block"></span>
              PROCESSING...
            </span>
          ) : (
            <span className="text-[#4FA35A] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#4FA35A] inline-block"></span>
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-[#AAA]">|</span>
          <span className="hidden sm:inline font-semibold text-[#141414]">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        {/* Right Status */}
        <div className="font-bold tracking-widest uppercase text-[#141414] text-[10px]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Workshop Attribution Line */}
      <div className="border-t border-[#E6E6E2] py-1 text-center font-mono text-[10px] text-[#8E8B85]">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
