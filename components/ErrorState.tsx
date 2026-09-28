import React from "react";

interface ErrorStateProps {
  error?: string | null;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px] space-y-4">
      <div className="w-16 h-16 border-2 border-[#141414] rounded-2xl flex items-center justify-center text-3xl font-mono font-bold text-white bg-[#D9503F] shadow-[4px_4px_0px_#141414]">
        !
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#D9503F]">
          Analysis Failed ⚠️
        </h3>
        <p className="font-mono text-xs text-[#141414] bg-[#FFF5F5] border border-[#D9503F] rounded-lg p-3 leading-relaxed break-words">
          {error || "An unknown error occurred during code evaluation."}
        </p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="bg-[#EDB13E] hover:bg-[#141414] text-[#141414] hover:text-white border-2 border-[#141414] py-2 px-6 rounded-full font-mono text-xs font-bold shadow-[3px_3px_0px_#141414] transition-all brutal-press flex items-center gap-1.5"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
