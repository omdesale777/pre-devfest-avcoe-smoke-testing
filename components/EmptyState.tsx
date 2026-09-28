import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px] space-y-4">
      <div className="w-16 h-16 border-2 border-dashed border-[#141414] rounded-2xl flex items-center justify-center text-2xl font-mono font-bold text-[#66625B] bg-[#F8F4EC] shadow-[3px_3px_0px_#141414]">
        {"{}"}
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#141414]">
          Awaiting Code Submission
        </h3>
        <p className="font-mono text-xs text-[#66625B] leading-relaxed">
          Paste your code on the left, then click{" "}
          <span className="font-bold text-[#141414] bg-[#EDB13E] px-1 rounded">
            "ROAST MY CODE"
          </span>{" "}
          or press <kbd className="bg-white px-1.5 py-0.5 border border-[#141414] rounded text-[10px] font-bold">Ctrl+Enter</kbd> (⌘+Enter on Mac).
        </p>
      </div>

      <div className="pt-2 text-[11px] font-mono text-[#66625B] flex items-center gap-1.5">
        <span>🌶️</span>
        <span>Your code is suspiciously quiet. Let's fix that.</span>
      </div>
    </div>
  );
}
