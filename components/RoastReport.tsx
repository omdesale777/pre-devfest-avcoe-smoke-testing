"use client";

import React from "react";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { FixedCode } from "./FixedCode";
import { IssueCard } from "./IssueCard";
import { LoadingState } from "./LoadingState";
import { SectionHeader } from "./SectionHeader";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string | null;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const renderContent = () => {
    switch (state) {
      case "loading":
        return <LoadingState />;
      case "error":
        return <ErrorState error={errorMsg} onRetry={onRetry} />;
      case "results":
        if (!result) return <EmptyState />;

        const issueCount = result.issues.length;
        const issueLabel = issueCount === 1 ? "1 ISSUE" : `${issueCount} ISSUES`;
        const hasFixedCode = Boolean(result.correctedCode && result.correctedCode.trim());
        const takeawaySectionNum = hasFixedCode ? 4 : 3;

        return (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 max-h-[calc(100vh-280px)] min-h-[400px]">
            {/* Section 1: Roast */}
            <div className="space-y-3">
              <SectionHeader number={1} title="Roast">
                <span className="font-mono text-[11px] font-bold text-[#EDB13E] bg-[#141414] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>

              <div className="bg-[#EFF2FB] border-2 border-[#141414] p-4 rounded-xl shadow-[3px_3px_0px_#141414] relative">
                <span className="text-3xl text-[#EDB13E] font-serif absolute -top-3 left-3 select-none">
                  “
                </span>
                <p className="font-mono text-sm sm:text-base font-semibold text-[#141414] leading-relaxed pt-1 pl-2">
                  {result.roast}
                </p>
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div className="space-y-3">
              <SectionHeader number={2} title="What's Wrong">
                <span className="font-mono text-[11px] font-bold text-[#66625B] bg-[#E6E6E2] px-2 py-0.5 rounded uppercase tracking-wider">
                  {issueLabel}
                </span>
              </SectionHeader>

              {issueCount === 0 ? (
                <div className="bg-[#EFF8F1] border-2 border-[#4FA35A] rounded-xl p-4 text-center text-xs font-mono font-bold text-[#4FA35A] shadow-[2px_2px_0px_#141414]">
                  ✓ No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={`${issue.line}-${idx}`} index={idx} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix */}
            {hasFixedCode && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section 4 / 3: Takeaway */}
            {result.takeaway && result.takeaway.trim() && (
              <div className="space-y-2 pt-1 border-t border-[#E6E6E2]">
                <SectionHeader number={takeawaySectionNum} title="Takeaway" />
                <div className="bg-[#F8F4EC] border-2 border-[#141414] rounded-xl p-4 shadow-[2px_2px_0px_#141414]">
                  <p className="font-mono text-xs text-[#141414] leading-relaxed font-medium">
                    💡 {result.takeaway}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      case "empty":
      default:
        return <EmptyState />;
    }
  };

  return (
    <div className="w-full lg:w-[46%] flex flex-col bg-[#FDFDFD] border-t-2 lg:border-t-0 lg:border-l-2 border-[#141414] overflow-hidden">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 bg-[#F8F4EC] border-b-2 border-[#141414] flex items-center justify-between text-xs font-mono font-bold">
        <span className="text-[#66625B] tracking-wider uppercase">AUDIT // REPORT</span>
        <span className="text-[#141414] uppercase tracking-wide">Roast Report</span>
        <span className="w-8"></span>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col">{renderContent()}</div>
    </div>
  );
}
