'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Trailer from './Trailer';

type MediaItem = {
  name: string;
  resource_type: string;
  resource_value: string;
  thumbnail_url: string;
};

type ChecklistItem = {
  id: string;
  text: string;
  icon: string;
  color?: string;
  list_page_visibility: boolean;
};

type CTA = {
  name: string;
  value: string;
};

type Props = {
  media: MediaItem[];
  cta: CTA;
  checklist: ChecklistItem[];
};

export default function CoursePreviewCard({ media, cta, checklist }: Props) {
  return (
    <Card className="w-full max-w-3xl mx-auto border border-secondary">
      <CardContent className="p-6 space-y-6">
        <Trailer media={media} />
        <h2 className="text-2xl font-bold mb-4 text-primary">৳1000</h2>
        <Button
          size="lg"
          className="w-full bg-primary text-white text-lg font-semibold"
          onClick={() => {}}
        >
          {cta.name}
        </Button>

        <p className="text-xl font-bold">এই কোর্সে যা থাকছে</p>

        <ul className="space-y-4 mt-4">
          {checklist.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <Image
                src={item.icon}
                alt=""
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="text-sm md:text-base">{item.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
