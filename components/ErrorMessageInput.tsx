import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="bg-[#FFFDF9] border-b-2 border-[#141414] p-3 sm:px-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#66625B] flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D9503F]"></span>
          ATTACH TERMINAL TRACEBACK / COMPILER ERROR (OPTIONAL)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-xs font-bold text-[#66625B] hover:text-[#141414] px-2 py-0.5 rounded border border-[#141414] hover:bg-[#E6E6E2] transition-colors"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. TypeError: unsupported operand type(s) for +=: 'int' and 'list' at line 4..."
        className="w-full bg-white border-2 border-[#141414] rounded-lg p-2.5 font-mono text-xs text-[#141414] focus:outline-none focus:ring-2 focus:ring-[#EDB13E] resize-y"
      />
    </div>
  );
}
