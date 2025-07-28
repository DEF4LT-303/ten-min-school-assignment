'use client';

import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LangToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  useEffect(() => {
    if (pathname.includes('/bn')) setLang('bn');
    else setLang('en');
  }, [pathname]);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'bn' : 'en';
    const newPath = pathname.replace(/\/(en|bn)/, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <Button
      onClick={toggleLang}
      variant="outline"
      className="gap-2 border-secondary hover:bg-muted transition-all bg-secondary"
    >
      <Languages className="w-4 h-4 text-primary" />
      <span className="text-primary">
        {lang === 'en' ? 'বাংলা' : 'English'}
      </span>
    </Button>
  );
}
