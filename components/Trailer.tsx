'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

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
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false, // no infinite loop
    slides: { perView: 1, spacing: 16 },
    mode: 'snap',
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const gallery = media.filter((item) => item.name === 'preview_gallery');

  const handlePrev = () => instanceRef.current?.prev();
  const handleNext = () => instanceRef.current?.next();

  return (
    <div className="relative w-full mx-auto">
      <div ref={sliderRef} className="keen-slider w-full">
        {gallery.map((item, index) => (
          <div key={index} className="keen-slider__slide p-4">
            {item.resource_type === 'video' ? (
              <div className="aspect-video w-full overflow-hidden rounded-xl shadow-md">
                <iframe
                  src={`https://www.youtube.com/embed/${item.resource_value}`}
                  title={`Video ${index}`}
                  className="w-full h-full rounded-xl"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-md">
                <Image
                  src={item.resource_value}
                  alt={`Image ${index}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        disabled={currentSlide === 0}
        className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-black p-2 rounded-full shadow hover:scale-105 transition z-10 ${
          currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <ChevronLeft />
      </button>

      <button
        onClick={handleNext}
        disabled={currentSlide === gallery.length - 1}
        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-black p-2 rounded-full shadow hover:scale-105 transition z-10 ${
          currentSlide === gallery.length - 1
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
