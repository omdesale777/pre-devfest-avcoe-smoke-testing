import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const formattedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between border-b-2 border-[#141414] pb-2.5 mb-4">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#141414] flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-[#EDB13E] rounded-full"></span>
        {formattedNumber} // {title}
      </span>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
