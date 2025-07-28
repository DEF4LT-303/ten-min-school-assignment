import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

type Feature = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
};

type Props = {
  features: Feature[];
};

export default function CourseFeatures({ features }: Props) {
  return (
    <Card className="shadow-md mb-8 border border-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="p-6 flex flex-row items-center text-center hover:shadow-lg transition-shadow border hover:border-primary"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                height={40}
                width={40}
                objectFit="contain"
              />
              <div className="flex flex-col items-start gap-2 w-full">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </CardContent>
                <CardContent className="p-0">
                  <p className="text-sm text-muted-foreground text-start">
                    {feature.subtitle}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}
