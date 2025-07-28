'use client';

import Image from 'next/image';
import Link from 'next/link';
import LangToggle from './LanguageToggle';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 shadow-lg bg-primary py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="10 Minute School Logo"
              width={100}
              height={100}
              priority
            />
          </div>
        </Link>
        <LangToggle />
      </div>
    </nav>
  );
}
