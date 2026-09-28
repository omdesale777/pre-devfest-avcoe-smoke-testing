"use client";

import React, { useRef, useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const languageLabel =
    LANGUAGES.find((l) => l.id === language)?.label ?? language;

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  // Sync scroll between textarea and gutter
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Cursor tracking
  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const pos = target.selectionStart;
    const textBefore = target.value.slice(0, pos);
    const lineArr = textBefore.split("\n");
    const currentLine = lineArr.length;
    const currentCol = (lineArr[lineArr.length - 1]?.length ?? 0) + 1;
    setCursor({ line: currentLine, col: currentCol });
  };

  // Tab key indents by 4 spaces
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);
    }
  };

  const handleClear = () => {
    onChange("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full lg:w-[54%] flex flex-col bg-[#171717] overflow-hidden select-none">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 bg-[#242424] border-b-2 border-[#141414] flex items-center justify-between text-xs font-mono">
        <span className="text-[#8E8B85] tracking-wider uppercase font-bold">
          INPUT // SRC
        </span>
        <span className="text-[#F7F3EA] font-bold uppercase tracking-wider">
          Your Code
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[#EDB13E] hover:underline font-bold text-[11px] uppercase tracking-wider"
          >
            SAMPLE BUG
          </button>
          <span className="text-[#555]">|</span>
          <button
            type="button"
            onClick={handleClear}
            className="text-[#8E8B85] hover:text-[#D9503F] font-bold text-[11px] uppercase tracking-wider"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="relative flex-1 flex min-h-[380px] bg-[#171717]">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 bg-[#1C1C1C] border-r border-[#2C2C2C] select-none overflow-hidden py-3 font-mono text-xs text-[#66625B] text-right pr-2.5 leading-[1.625rem]"
        >
          {lineNumbers.map((num) => {
            const isError = errorLine === num;
            return (
              <div
                key={num}
                className={`transition-colors ${
                  isError
                    ? "text-[#D9503F] bg-[#3B1917] font-bold border-r-2 border-[#D9503F] -mr-2.5 pr-2"
                    : ""
                }`}
              >
                {String(num).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onSelect={handleSelect}
            onKeyUp={handleSelect}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            placeholder="// Paste your code here..."
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="w-full h-full p-3 font-mono text-xs leading-[1.625rem] text-[#F7F3EA] bg-transparent focus:outline-none resize-none whitespace-pre overflow-auto select-text selection:bg-[#EDB13E] selection:text-[#141414]"
            style={{ tabSize: 4 }}
          />
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="h-7 px-4 bg-[#1F1F1F] border-t border-[#2C2C2C] flex items-center justify-between font-mono text-[11px] text-[#8E8B85]">
        <div>
          Ln {cursor.line}, Col {cursor.col} ·{" "}
          <span className="text-[#EDB13E] font-semibold">{languageLabel}</span>
        </div>
        <div className="hidden sm:block">UTF-8 · Tab Size: 4</div>
      </div>
    </div>
  );
}
