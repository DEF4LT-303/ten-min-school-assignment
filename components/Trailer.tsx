'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

type MediaItem = {
  name: string;
  resource_type: string;
  resource_value: string;
  thumbnail_url: string;
};

type TrailerProps = {
  media: MediaItem[];
};

export default function Trailer({ media }: TrailerProps) {
  const gallery = media.filter((item) => item.name === 'preview_gallery');

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {gallery.map((item, index) => (
            <CarouselItem key={index}>
              <div className="rounded-sm shadow-md overflow-hidden">
                {item.resource_type === 'video' ? (
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      src={`https://www.youtube.com/embed/${item.resource_value}`}
                      title={`Video ${index}`}
                      className="w-full h-full rounded-sm"
                      allowFullScreen
                    />
                  </AspectRatio>
                ) : (
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={item.resource_value}
                      alt={`Image ${index}`}
                      fill
                      className="object-cover rounded-sm"
                      priority={index === 0}
                    />
                  </AspectRatio>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1" />
        <CarouselNext className="right-1" />
      </Carousel>
    </div>
  );
}
