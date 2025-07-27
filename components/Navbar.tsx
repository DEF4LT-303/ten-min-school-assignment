'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LangToggle from './LanguageToggle';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // e.g. /course/en
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  useEffect(() => {
    if (pathname.includes('/bn')) setLang('bn');
    else setLang('en');
  }, [pathname]);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'bn' : 'en';
    const newPath = pathname.replace(/\/(en|bn)/, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-blue-500 text-white">
      <h1 className="text-xl font-semibold">10 Minute School</h1>
      <LangToggle />
    </nav>
  );
}
