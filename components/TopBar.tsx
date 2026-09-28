import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-[#141414] bg-[#FFFDF9] flex flex-col xl:flex-row xl:items-center xl:justify-between">
      {/* Brand Header Strip */}
      <div className="px-4 py-3 border-b xl:border-b-0 xl:border-r-2 border-[#141414] flex items-center justify-between gap-3 bg-[#F8F4EC]">
        <div className="flex items-center gap-2.5">
          {/* Google 4-Color Dots Badge */}
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-[#141414] shadow-[1px_1px_0px_#141414]">
            <span className="w-2 h-2 rounded-full bg-[#4C80F0] inline-block"></span>
            <span className="w-2 h-2 rounded-full bg-[#D9503F] inline-block"></span>
            <span className="w-2 h-2 rounded-full bg-[#EDB13E] inline-block"></span>
            <span className="w-2 h-2 rounded-full bg-[#4FA35A] inline-block"></span>
            <span className="text-[10px] font-mono font-bold tracking-tight text-[#141414] ml-0.5">
              GDG Nashik
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="font-sans text-sm sm:text-base font-bold tracking-wider uppercase text-[#141414] flex items-center gap-1.5">
              <span>{APP.name}</span>
            </h1>
            <span className="font-mono text-[10px] font-bold bg-[#EDB13E] text-[#141414] px-1.5 py-0.5 rounded border border-[#141414] shadow-[1px_1px_0px_#141414]">
              {APP.version}
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] font-bold bg-[#EFF2FB] text-[#141414] px-1.5 py-0.5 rounded border border-[#141414]">
              🌶️ DESI
            </span>
          </div>
        </div>

        <div className="xl:hidden font-mono text-[10px] text-[#66625B] font-bold uppercase tracking-wider">
          DevFest 2026
        </div>
      </div>

      {/* Controls Container */}
      <div className="flex-1 overflow-x-auto">{children}</div>
    </header>
  );
}
