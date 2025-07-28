import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from './ui/card';

interface AboutItem {
  id: string;
  title: string;
  description: string;
}

interface Props {
  aboutItems: AboutItem[];
}

const CourseAboutSection = ({ aboutItems }: Props) => {
  return (
    <Card className="w-full max-w-4xl mx-auto border-secondary shadow-md">
      <CardContent className="p-6">
        <Accordion type="multiple" className="space-y-4">
          {aboutItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-dashed border-secondary"
            >
              <AccordionTrigger className="text-md text-foreground px-4 py-3 cursor-pointer">
                <div dangerouslySetInnerHTML={{ __html: item.title }} />
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CourseAboutSection;
