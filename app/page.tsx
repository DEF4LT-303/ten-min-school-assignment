'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <div className="max-w-md text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to 10-Min School Assignment
        </h1>
        <p className="text-lg mb-6">
          This is a simple Next.js application demonstrating dynamic routing and
          SEO metadata. Click the button below to navigate to the course page.
        </p>
      </div>
      <Button size="lg" onClick={() => router.push('/course/en')}>
        Go to Course Page
      </Button>
    </main>
  );
}
