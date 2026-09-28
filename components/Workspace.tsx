"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import {
  LanguageId,
  ReportState,
  RoastLevel,
  RoastResult,
} from "@/types/roast";
import { CodeEditor } from "./CodeEditor";
import { ErrorMessageInput } from "./ErrorMessageInput";
import { RoastControls } from "./RoastControls";
import { RoastReport } from "./RoastReport";
import { StatusBar } from "./StatusBar";
import { TopBar } from "./TopBar";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>(SAMPLE.code);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);

  const isRoasting = reportState === "loading";

  // ErrorLine is defined ONLY when results exist AND the editor code matches roastedCode exactly
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError(null);

    try {
      const result = await requestRoast({
        code,
        language,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while communicating with the server.";
      setApiError(message);
      setReportState("error");
    }
  }, [code, language, roastLevel, errorMessage, isRoasting]);

  const handleLoadSample = () => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  };

  const handleApplyFix = (newCode: string) => {
    setCode(newCode);
  };

  // Keyboard shortcut listener for Ctrl+Enter or Cmd+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  return (
    <div className="w-full max-w-[1360px] mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col space-y-4">
      {/* Top DevFest Hero Banner */}
      <section className="text-center space-y-2 py-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F7E3A8] text-[#141414] rounded-full border-2 border-[#141414] shadow-[2px_2px_0px_#141414] font-mono text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#D9503F] animate-pulse"></span>
          <span>CODE BOL RAHA HAI · मला वाचवा!</span>
          <span className="text-[#8E8B85]">|</span>
          <span className="text-[#66625B]">DevFest Nashik 2026</span>
        </div>

        <div className="space-y-1">
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
            Code Roaster{" "}
            <span className="inline-block bg-[#EDB13E] text-[#141414] px-2 py-0.5 rounded-lg border-2 border-[#141414] shadow-[2px_2px_0px_#141414] -rotate-1 text-xl sm:text-2xl ml-1">
              Desi Edition 🌶️
            </span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#66625B]">
            Paste your code. Pick your roast. Get humbled. Get the fix.
          </p>
        </div>
      </section>

      {/* Main Workstation Card */}
      <main className="bg-white border-2 border-[#141414] rounded-2xl shadow-[6px_6px_0px_#141414] flex flex-col overflow-hidden">
        {/* Top Control Bar */}
        <TopBar>
          <RoastControls
            roastLevel={roastLevel}
            onRoastLevelChange={setRoastLevel}
            language={language}
            onLanguageChange={setLanguage}
            onRoast={handleRoast}
            isRoasting={isRoasting}
            errorDrawerOpen={errorDrawerOpen}
            onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
          />
        </TopBar>

        {/* Collapsible Error Drawer */}
        {errorDrawerOpen && (
          <ErrorMessageInput
            value={errorMessage}
            onChange={setErrorMessage}
            onClose={() => setErrorDrawerOpen(false)}
          />
        )}

        {/* Responsive Two-Column Workstation */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-[460px]">
          <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            errorLine={errorLine}
            onLoadSample={handleLoadSample}
          />
          <RoastReport
            state={reportState}
            roastLevel={roastLevel}
            language={language}
            result={roastResult}
            errorMsg={apiError}
            onRetry={handleRoast}
            onApplyFix={handleApplyFix}
          />
        </div>

        {/* Persistent Bottom Status Bar */}
        <StatusBar isRoasting={isRoasting} />
      </main>

      {/* Warli Pattern Accent Ribbon */}
      <div className="py-1 text-center font-mono text-xs text-[#8E8B85] tracking-[0.3em] select-none opacity-60">
        ▲ ▼ ▲ ▼ • • • • ▲ ▼ ▲ ▼ • • • • ▲ ▼ ▲ ▼ • • • • ▲ ▼ ▲ ▼
      </div>
    </div>
  );
}
