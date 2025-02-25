interface titleProps {
  title?: string;
  description?: string;
}

export const Title = ({ title, description }: titleProps) => {
  return (
    <div className="my-8 flex items-center flex-col gap-2 text-center">
      {title && (
        <h1 className="text-2xl sm:text-3xl font-bold uppercase leading-9">
          {title}
        </h1>
      )}
      {description && (
        <p className="text-white text-sm sm:text-base">{description}</p>
      )}
    </div>
  );
};
