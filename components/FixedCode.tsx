"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import { SectionHeader } from "./SectionHeader";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const extension = langConfig?.extension ?? "txt";
  const filename = `solution.${extension}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const getCopyLabel = () => {
    switch (copyStatus) {
      case "copied":
        return "✓ COPIED TO CLIPBOARD";
      case "failed":
        return "✕ COPY BLOCKED, SELECT MANUALLY";
      default:
        return "📋 COPY FIXED CODE";
    }
  };

  return (
    <div className="space-y-3 pt-2">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-mono text-[11px] font-bold text-[#4FA35A] uppercase tracking-wider bg-[#EFF8F1] px-2 py-0.5 rounded border border-[#4FA35A]">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border-2 border-[#141414] rounded-xl overflow-hidden shadow-[4px_4px_0px_#141414] bg-[#171717]">
        {/* Header Strip */}
        <div className="bg-[#242424] px-4 py-2 border-b-2 border-[#141414] flex items-center justify-between font-mono text-xs text-[#F7F3EA]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9503F] inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#EDB13E] inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#4FA35A] inline-block"></span>
            <span className="font-bold text-[#F7F3EA] ml-1">{filename}</span>
          </div>
          <span className="text-[#4FA35A] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FA35A] animate-pulse"></span>
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto max-h-[360px] text-xs font-mono text-[#F7F3EA] leading-relaxed">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={handleCopy}
          className="w-full bg-white hover:bg-[#141414] text-[#141414] hover:text-white border-2 border-[#141414] py-2 px-3 rounded-full font-mono text-xs font-bold shadow-[2px_2px_0px_#141414] transition-all brutal-press flex items-center justify-center gap-1.5"
        >
          {getCopyLabel()}
        </button>

        <button
          type="button"
          onClick={() => onApply(code)}
          className="w-full bg-[#EDB13E] hover:bg-[#141414] text-[#141414] hover:text-white border-2 border-[#141414] py-2 px-3 rounded-full font-mono text-xs font-bold shadow-[2px_2px_0px_#141414] transition-all brutal-press flex items-center justify-center gap-1.5"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
