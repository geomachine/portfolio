'use client';

import { X, Trash2, Pencil, Loader2, Search, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Field({ label, error, required, children }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-widest text-muted">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full bg-background border-2 border-dashed border-card-border px-3 py-2 text-sm text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted ${className}`}
      {...props}
    />
  );
}

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full bg-background border-2 border-dashed border-card-border px-3 py-2 text-sm text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted resize-none ${className}`}
      {...props}
    />
  );
}

export function Btn({ variant = 'primary', className = '', children, ...props }) {
  const base = 'inline-flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all duration-200 disabled:opacity-50 border-2';
  const variants = {
    primary: 'bg-foreground text-background border-foreground hover:opacity-80',
    ghost:   'bg-transparent text-muted border-card-border hover:text-foreground hover:border-foreground',
    danger:  'bg-red-600 text-white border-red-600 hover:bg-red-700',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-primary-light text-foreground border-card-border',
    new:     'bg-foreground text-background border-foreground',
    success: 'bg-green-500/10 text-green-600 border-green-500/30',
    danger:  'bg-red-500/10 text-red-500 border-red-500/30',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border ${variants[variant]}`}>
      {children}
    </span>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border-2 border-dashed border-card-border pl-9 pr-3 py-2 text-sm text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted"
      />
    </div>
  );
}

export function Pagination({ page, pages, onPage }) {
  if (pages <= 1) return null;
  const start = Math.max(1, Math.min(pages - 4, page - 2));
  const pageNums = Array.from({ length: Math.min(5, pages) }, (_, i) => start + i);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t-2 border-dashed border-card-border">
      <span className="text-xs text-muted">Page {page} of {pages}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPage(page - 1)} disabled={page <= 1}
          className="p-1.5 text-muted hover:text-foreground disabled:opacity-30 transition-colors border border-card-border"
        >
          <ChevronLeft size={14} />
        </button>
        {pageNums.map(p => (
          <button
            key={p} onClick={() => onPage(p)}
            className={`w-8 h-8 text-xs font-bold border transition-colors ${p === page ? 'bg-foreground text-background border-foreground' : 'text-muted border-card-border hover:text-foreground'}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPage(page + 1)} disabled={page >= pages}
          className="p-1.5 text-muted hover:text-foreground disabled:opacity-30 transition-colors border border-card-border"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 border-2 shadow-lg animate-[fadeIn_0.2s_ease_forwards] ${
      type === 'success' ? 'bg-card border-foreground' : 'bg-card border-red-500'
    }`}>
      {type === 'success'
        ? <CheckCircle size={16} className="text-foreground shrink-0" />
        : <AlertCircle size={16} className="text-red-500 shrink-0" />
      }
      <span className="text-sm font-bold text-foreground">{message}</span>
      <button onClick={onClose} className="text-muted hover:text-foreground ml-2 transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState(null);
  const show = (message, type = 'success') => setToast({ message, type });
  const hide = () => setToast(null);
  const ToastEl = toast ? <Toast message={toast.message} type={toast.type} onClose={hide} /> : null;
  return { show, ToastEl };
}

export function Modal({ open, onClose, title, children, wide = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className={`bg-card border-2 border-dashed border-card-border w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto animate-[fadeIn_0.2s_ease_forwards]`}>
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-dashed border-card-border">
          <h2 className="font-signature font-bold text-xl text-foreground">{title}</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, loading, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-card border-2 border-dashed border-card-border w-full max-w-sm p-6">
        <h3 className="font-signature font-bold text-xl text-foreground mb-2">Are you sure?</h3>
        <p className="text-sm text-muted mb-6">{message || 'This action cannot be undone.'}</p>
        <div className="flex justify-end gap-3">
          <Btn variant="ghost" onClick={onClose} disabled={loading}>Cancel</Btn>
          <Btn variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Delete
          </Btn>
        </div>
      </div>
    </div>
  );
}

export function Table({ columns, data, onEdit, onDelete, loading, emptyText = 'No data found.' }) {
  if (loading) return (
    <div className="py-16 text-center text-muted text-sm">
      <Loader2 size={24} className="animate-spin mx-auto mb-2" /> Loading...
    </div>
  );
  if (!data?.length) return (
    <div className="py-16 text-center text-muted text-sm">{emptyText}</div>
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-dashed border-card-border bg-primary-light">
            {columns.map((col, i) => (
              <th key={i} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted whitespace-nowrap">{col.header}</th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ri) => (
            <tr key={ri} className="border-b border-dashed border-card-border hover:bg-primary-light transition-colors">
              {columns.map((col, ci) => (
                <td key={ci} className="px-4 py-3 text-foreground">
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                      <button onClick={() => onEdit(row)} className="text-muted hover:text-foreground transition-colors p-1" title="Edit">
                        <Pencil size={15} />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)} className="text-muted hover:text-red-500 transition-colors p-1" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
