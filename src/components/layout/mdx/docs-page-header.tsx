interface DocsPageHeaderProps {
  heading: string;
  text?: string;
}

export function DocsPageHeader({ heading, text }: DocsPageHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-2 px-4 pb-8 md:px-8">
      <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
      {text && <p className="text-muted-foreground text-lg">{text}</p>}
    </div>
  );
}
