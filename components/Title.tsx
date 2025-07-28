type CourseContentProps = {
  title: string;
  description: string;
};

export default function CourseContent({
  title,
  description,
}: CourseContentProps) {
  return (
    <section>
      <h1 className="text-3xl text-primary font-bold mb-4 lg:mt-10">{title}</h1>
      <div
        className="mb-6 text-justify"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  );
}
