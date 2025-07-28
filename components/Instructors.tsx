'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Instructor = {
  name: string;
  short_description: string;
  image: string;
  slug: string;
  description: string;
  has_instructor_page: boolean;
};

export default function InstructorCard({
  instructor,
}: {
  instructor: Instructor;
}) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow border border-secondary">
      <CardContent className="p-4 flex flex-row items-center gap-5">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border">
          <Image
            src={instructor.image}
            alt={instructor.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          {instructor.has_instructor_page ? (
            <Link
              href={`/instructors/${instructor.slug}`}
              className="group inline-flex items-center w-fit font-bold hover:text-primary"
            >
              {instructor.name}
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          ) : (
            <span className="font-bold">{instructor.name}</span>
          )}
          <div
            className="text-justify text-sm"
            dangerouslySetInnerHTML={{ __html: instructor.description }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
