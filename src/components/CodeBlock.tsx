// Reusable code display. `children` is the raw code string shown verbatim.
interface CodeBlockProps {
  children: string;
  title?: string;
}

function CodeBlock({ children, title }: CodeBlockProps) {
  return (
    <div className="code-block">
      {title && <div className="code-block__title">{title}</div>}
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;
