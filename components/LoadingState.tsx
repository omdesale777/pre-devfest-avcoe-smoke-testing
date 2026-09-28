import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px] space-y-4">
      <div className="w-16 h-16 border-2 border-[#141414] rounded-2xl flex items-center justify-center text-3xl font-mono font-bold text-[#141414] bg-[#EDB13E] shadow-[4px_4px_0px_#141414] animate-spin">
        /
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#141414] animate-pulse">
          Analyzing Code 🔥
        </h3>
        <p className="font-mono text-xs text-[#66625B] leading-relaxed">
          Evaluating computational complexity and architectural purity...
        </p>
      </div>

      <div className="bg-[#EFF2FB] border border-[#141414] rounded-full px-3 py-1 text-[11px] font-mono text-[#141414] font-semibold">
        ☕ Compiler ki chai thandi ho rahi hai...
      </div>
    </div>
  );
}
