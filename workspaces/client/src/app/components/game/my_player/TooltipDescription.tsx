import { useEffect, useState } from 'react';

function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
    navigator.userAgent,
  );
}

export default function TooltipDescription({
  children,
  nameCard,
  nbExamples,
  value,
  description,
}: {
  children: React.ReactNode;
  nameCard: string;
  nbExamples: number;
  value: number;
  description: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <div className="group relative">
      {children}
      {!isMobile && (
        <div className="pointer-events-none absolute top-full left-1/2 z-10 w-72 -translate-x-1/2 rounded bg-neutral-800 px-3 py-2 text-center text-white opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex flex-col items-center gap-1">
            <div className="text-sm font-bold">
              {nameCard} x{nbExamples}
            </div>
            <div className="text-xs">Valeur : {value}</div>
            <div className="text-xs">{description}</div>
          </div>
        </div>
      )}
    </div>
  );
}
