import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityConfig: Record<
  Severity,
  { badgeBg: string; badgeText: string; border: string; accentColor: string }
> = {
  "FATAL BUG": {
    badgeBg: "bg-[#D9503F]",
    badgeText: "text-white",
    border: "border-[#D9503F]",
    accentColor: "#D9503F",
  },
  "CODE SMELL": {
    badgeBg: "bg-[#EDB13E]",
    badgeText: "text-[#141414]",
    border: "border-[#EDB13E]",
    accentColor: "#EDB13E",
  },
  OPTIMIZATION: {
    badgeBg: "bg-[#4FA35A]",
    badgeText: "text-white",
    border: "border-[#4FA35A]",
    accentColor: "#4FA35A",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const config = severityConfig[issue.severity] || severityConfig["CODE SMELL"];
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div className="bg-white border-2 border-[#141414] shadow-[3px_3px_0px_#141414] p-4 rounded-xl space-y-3 transition-transform hover:-translate-y-0.5">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E6E2] pb-2">
        <div className="flex items-center gap-2">
          <span className="bg-[#141414] text-white text-[11px] font-mono px-2 py-0.5 rounded font-bold">
            #{formattedIndex}
          </span>
          <span className="font-mono text-xs font-bold text-[#141414]">
            LINE {issue.line}
          </span>
          <span
            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${config.badgeBg} ${config.badgeText} border border-[#141414] shadow-[1px_1px_0px_#141414] uppercase tracking-wider`}
          >
            {issue.severity}
          </span>
        </div>
        <span className="font-mono text-xs text-[#66625B] font-semibold text-right max-w-full break-words">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <div className="bg-[#171717] border-l-4 border-[#EDB13E] rounded-r p-3 overflow-x-auto text-xs font-mono text-[#F7F3EA]">
          <pre>
            <code>{issue.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1.5 text-xs font-mono">
        <div className="text-[#D9503F] leading-relaxed">
          <span className="font-bold text-sm mr-1">✕</span>
          <span className="font-bold text-[#141414]">Diagnosis: </span>
          <span className="text-[#141414]">{issue.diagnosis}</span>
        </div>
        <div className="text-[#4FA35A] leading-relaxed">
          <span className="font-bold text-sm mr-1">✓</span>
          <span className="font-bold text-[#141414]">Expected: </span>
          <span className="text-[#141414]">{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
