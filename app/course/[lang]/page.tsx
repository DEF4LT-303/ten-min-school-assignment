import Navbar from '@/components/Navbar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Course = {
  title: string;
  description: string;
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

// ✅ Set dynamic SEO metadata
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

// ✅ Main Page Component
export default async function IELTSPage({
  params,
}: {
  params: { lang: string };
}) {
  const course = await getCourseData(params.lang);
  const lang = params.lang;

  if (!course) return notFound();

  return (
    <>
      <Navbar />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <div
          className="mb-6"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
      </main>
    </>
  );
}
