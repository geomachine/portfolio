'use client';

import { useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2, Loader2 } from 'lucide-react';
import { ConfirmDialog, Btn } from '@/components/admin/ui';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch('/api/contacts').then(r => r.json()).then(j => {
      setMessages(j.data || []);
      setLoading(false);
    });
  }, []);

  const markRead = async (id) => {
    await fetch(`/api/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    });
    setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
  };

  const handleDelete = async () => {
    setDeleting(true);
    await fetch(`/api/contacts/${deleteId}`, { method: 'DELETE' });
    setMessages(prev => prev.filter(m => m._id !== deleteId));
    setDeleteId(null);
    setDeleting(false);
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-signature font-bold text-foreground">Messages</h1>
        <p className="text-sm text-muted">{messages.length} total · {unread} unread</p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted"><Loader2 size={24} className="animate-spin mx-auto mb-2" /> Loading...</div>
      ) : messages.length === 0 ? (
        <div className="py-16 text-center text-muted border-2 border-card-border border-dashed">No messages yet.</div>
      ) : (
        <div className="space-y-3">
          {messages.map(msg => (
            <div
              key={msg._id}
              className={`bg-card border-2 border-card-border sketch-border transition-all duration-200 ${!msg.read ? 'border-foreground' : ''}`}
            >
              <div
                className="flex items-start justify-between gap-4 px-5 py-4 cursor-pointer hover:bg-primary-light transition-colors"
                onClick={() => {
                  setExpanded(expanded === msg._id ? null : msg._id);
                  if (!msg.read) markRead(msg._id);
                }}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 shrink-0 text-muted">
                    {msg.read ? <MailOpen size={16} /> : <Mail size={16} className="text-foreground" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-bold ${!msg.read ? 'text-foreground' : 'text-muted'}`}>{msg.fullname}</span>
                      <span className="text-xs text-muted">{msg.email}</span>
                      {!msg.read && <span className="text-[10px] font-bold uppercase tracking-widest bg-foreground text-background px-2 py-0.5">New</span>}
                    </div>
                    <p className="text-xs text-muted mt-0.5 truncate">{msg.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted hidden sm:block">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteId(msg._id); }}
                    className="text-muted hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {expanded === msg._id && (
                <div className="px-5 pb-5 border-t border-card-border pt-4">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                    <span>From: {msg.fullname} &lt;{msg.email}&gt;</span>
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="mt-3">
                    <a
                      href={`mailto:${msg.email}?subject=Re: Your message`}
                      className="text-xs font-bold text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                      Reply via email →
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
