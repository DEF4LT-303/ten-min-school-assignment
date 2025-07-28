import CoursePreviewCard from '@/components/CourseChecklist';
import CourseExclusiveFeatures from '@/components/CourseExclusive';
import CourseFeatures from '@/components/CourseFeatures';
import CoursePointers from '@/components/CoursePointers';
import InstructorCard from '@/components/Instructors';
import CourseContent from '@/components/Title';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Instructor = {
  name: string;
  short_description: string;
  image: string;
  slug: string;
  description: string;
  has_instructor_page: boolean;
};

type CourseSection = {
  type: string;
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: [];
};

type Course = {
  title: string;
  description: string;
  media: [];
  checklist: [];
  cta_text: {
    name: string;
    value: string;
  };
  sections: CourseSection[];
  seoTitle: string;
  seoDescription: string;
  image: string;
};

async function getCourseData(lang: string): Promise<Course | null> {
  if (!['en', 'bn'].includes(lang)) return null;

  try {
    const res = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`,
      {
        headers: {
          'X-TENMS-SOURCE-PLATFORM': 'web',
          Accept: 'application/json',
        },
        next: { revalidate: 3600 },
      },
    );

    const data = await res.json();

    return data.data;
  } catch (err) {
    console.error('API Error:', err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const course = await getCourseData(params.lang);

  if (!course) return {};

  return {
    title: course.seoTitle,
    description: course.seoDescription,
    openGraph: {
      title: course.seoTitle,
      description: course.seoDescription,
      images: [course.image],
    },
  };
}

export default async function IELTSPage({
  params,
}: {
  params: { lang: string };
}) {
  const course = await getCourseData(params.lang);

  if (!course) return notFound();

  const instructorSection = course.sections.find(
    (section) => section.type === 'instructors',
  );

  const features = course.sections.find(
    (section) => section.type === 'features',
  );

  const pointers = course.sections.find(
    (section) => section.type === 'pointers',
  );

  const courseExclusive = course.sections.find(
    (section) => section.type === 'feature_explanations',
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row justify-center items-start my-8 gap-20">
        <div className="flex flex-col w-full">
          <CourseContent
            title={course.title}
            description={course.description}
          />

          {instructorSection && instructorSection.values.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-primary">
                {instructorSection.name}
              </h2>
              <div className="flex flex-col gap-6">
                {instructorSection.values.map((instructor: Instructor) => (
                  <InstructorCard
                    key={instructor.slug}
                    instructor={instructor}
                  />
                ))}

                <h2 className="text-2xl font-bold text-primary mt-4">
                  {features && features.name}
                </h2>
                {features && <CourseFeatures features={features.values} />}

                <h2 className="text-2xl font-bold text-primary mt-4">
                  {pointers && pointers.name}
                </h2>
                {pointers && pointers.values.length > 0 && (
                  <CoursePointers
                    title={pointers.name}
                    pointers={pointers.values}
                  />
                )}

                <h2 className="text-2xl font-bold text-primary mt-4">
                  {courseExclusive && courseExclusive.name}
                </h2>
                {courseExclusive && courseExclusive.values.length > 0 && (
                  <CourseExclusiveFeatures features={courseExclusive.values} />
                )}
              </div>
            </div>
          )}
        </div>

        <CoursePreviewCard
          media={course.media}
          cta={course.cta_text}
          checklist={course.checklist}
        />
      </div>
    </div>
  );
}
