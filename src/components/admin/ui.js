'use client';

// Shared admin UI primitives — table, modal, field, confirm dialog

import { X, Trash2, Pencil, Loader2 } from 'lucide-react';

/* ── Field ─────────────────────────────────────────────────── */
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

/* ── Input ─────────────────────────────────────────────────── */
export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full bg-background border-2 border-card-border px-3 py-2 text-sm text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted ${className}`}
      {...props}
    />
  );
}

/* ── Textarea ──────────────────────────────────────────────── */
export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full bg-background border-2 border-card-border px-3 py-2 text-sm text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted resize-none ${className}`}
      {...props}
    />
  );
}

/* ── Button ────────────────────────────────────────────────── */
export function Btn({ variant = 'primary', className = '', children, ...props }) {
  const base = 'inline-flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all duration-200 disabled:opacity-50 sketch-border';
  const variants = {
    primary: 'bg-foreground text-background hover:opacity-80',
    ghost:   'bg-transparent text-muted hover:text-foreground border-card-border',
    danger:  'bg-red-600 text-white hover:bg-red-700 border-red-600',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

/* ── Modal ─────────────────────────────────────────────────── */
export function Modal({ open, onClose, title, children, wide = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className={`bg-card border-2 border-card-border sketch-border w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto animate-[fadeIn_0.2s_ease_forwards]`}>
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-card-border">
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

/* ── ConfirmDialog ─────────────────────────────────────────── */
export function ConfirmDialog({ open, onClose, onConfirm, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-card border-2 border-card-border sketch-border w-full max-w-sm p-6">
        <h3 className="font-signature font-bold text-xl text-foreground mb-2">Are you sure?</h3>
        <p className="text-sm text-muted mb-6">This action cannot be undone.</p>
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

/* ── Table ─────────────────────────────────────────────────── */
export function Table({ columns, data, onEdit, onDelete, loading, emptyText = 'No data found.' }) {
  if (loading) return (
    <div className="py-16 text-center text-muted text-sm">
      <Loader2 size={24} className="animate-spin mx-auto mb-2" /> Loading...
    </div>
  );
  if (!data?.length) return (
    <div className="py-16 text-center text-muted text-sm border-2 border-card-border border-dashed">{emptyText}</div>
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-2 border-card-border">
        <thead>
          <tr className="border-b-2 border-card-border bg-primary-light">
            {columns.map((col, i) => (
              <th key={i} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted">{col.header}</th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ri) => (
            <tr key={ri} className="border-b border-card-border hover:bg-primary-light transition-colors">
              {columns.map((col, ci) => (
                <td key={ci} className="px-4 py-3 text-foreground">
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                      <button onClick={() => onEdit(row)} className="text-muted hover:text-foreground transition-colors p-1">
                        <Pencil size={15} />
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)} className="text-muted hover:text-red-500 transition-colors p-1">
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
