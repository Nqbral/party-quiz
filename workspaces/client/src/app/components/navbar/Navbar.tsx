'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="bg-bg-navbar fixed top-0 z-40 flex w-full flex-row items-center justify-between px-6 py-2 shadow-sm shadow-neutral-950 sm:py-3 md:py-4">
      <Link href="/">
        <div className="flex flex-row items-center gap-2">PARTY QUIZ</div>
      </Link>
    </div>
  );
}
