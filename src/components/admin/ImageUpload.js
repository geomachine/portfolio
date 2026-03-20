'use client';

import { useRef, useState } from 'react';
import { Upload, Link, X, Loader2, ImageIcon } from 'lucide-react';

/**
 * ImageUpload — paste a URL or upload a file.
 * Props:
 *   value    {string}           current image URL
 *   onChange {(url: string) => void}
 *   folder   {string}           storage folder ('blogs' | 'projects')
 */
export function ImageUpload({ value, onChange, folder = 'uploads' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState('');
  const [tab, setTab]             = useState('url'); // 'url' | 'file'
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', folder);
      const res  = await fetch('/api/upload', { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      onChange(json.data.url);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      {/* Tab switcher */}
      <div className="flex border-2 border-dashed border-card-border overflow-hidden">
        {[['url', 'Paste URL', Link], ['file', 'Upload File', Upload]].map(([key, label, Icon]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${
              tab === key ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
            }`}
          >
            <Icon size={12} /> {label}
          </button>
        ))}
      </div>

      {/* URL input */}
      {tab === 'url' && (
        <input
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-background border-2 border-dashed border-card-border px-3 py-2 text-sm text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted"
        />
      )}

      {/* File drop zone */}
      {tab === 'file' && (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="relative border-2 border-dashed border-card-border hover:border-foreground transition-colors cursor-pointer bg-background flex flex-col items-center justify-center gap-2 py-6 text-muted hover:text-foreground"
        >
          {uploading
            ? <Loader2 size={20} className="animate-spin" />
            : <Upload size={20} />
          }
          <span className="text-xs font-bold tracking-widest uppercase">
            {uploading ? 'Uploading…' : 'Drop image or click to browse'}
          </span>
          <span className="text-[10px] opacity-50">JPEG · PNG · WebP · GIF · SVG — max 5 MB</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFile(e.target.files?.[0])}
          />
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X size={11} /> {error}
        </p>
      )}

      {/* Preview */}
      {value && (
        <div className="relative border-2 border-dashed border-card-border overflow-hidden aspect-video bg-primary-light group">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-foreground text-background p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
          >
            <X size={12} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 px-2 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ImageIcon size={10} className="text-muted shrink-0" />
            <span className="text-[10px] text-muted truncate">{value}</span>
          </div>
        </div>
      )}
    </div>
  );
}
