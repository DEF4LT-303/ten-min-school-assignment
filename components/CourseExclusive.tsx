import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

type Feature = {
  checklist: string[];
  file_type: string;
  file_url: string;
  id: string;
  title: string;
  video_thumbnail: string;
};

interface Props {
  features: Feature[];
}

const CourseExclusiveFeatures = ({ features }: Props) => {
  return (
    <div>
      <Card className="bg-white border-secondary shadow-md">
        {features.map((feature, idx) => (
          <div key={feature.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-1">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <ul className="space-y-3">
                    {feature.checklist.map((item, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <CheckCircle className="text-primary mt-1 w-5 h-5 shrink-0" />
                        <span className="text-foreground leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full md:w-48 shrink-0">
                  <Image
                    src={feature.file_url}
                    alt={feature.title}
                    width={192}
                    height={108}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </CardContent>

            {idx < features.length - 1 && (
              <hr className="border-ring mx-5 mt-5" />
            )}
          </div>
        ))}
      </Card>
    </div>
  );
};

export default CourseExclusiveFeatures;
