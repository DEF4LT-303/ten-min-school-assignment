import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

type Pointer = {
  id: string;
  text: string;
};

type Props = {
  title: string;
  pointers: Pointer[];
};

export default function CoursePointers({ pointers }: Props) {
  return (
    <Card className="bg-white border-secondary shadow-md">
      <CardContent>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {pointers.map((pointer) => (
            <li key={pointer.id} className="flex items-start gap-3">
              <CheckCircle className="text-primary w-5 h-5 mt-1 shrink-0" />
              <span className="text-foreground leading-relaxed">
                {pointer.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
