export function Footer() {
  return (
    <footer className="w-full max-w-[1200px] mx-auto px-4 pb-24 lg:pb-10">
      <div className="border-t-2 border-dashed border-card-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted font-bold tracking-widest uppercase">
          © {new Date().getFullYear()} Iqbal Hossain. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs text-muted font-bold tracking-widest uppercase">
          <a href="https://github.com/geomachine" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-200">GitHub</a>
          <span className="text-card-border">·</span>
          <a href="https://linkedin.com/in/geomachine" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-200">LinkedIn</a>
          <span className="text-card-border">·</span>
          <a href="https://nesohq.org" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-200">NesoHQ</a>
        </div>
      </div>
    </footer>
  );
}
