'use client';

import { useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2, Loader2, CheckCheck } from 'lucide-react';
import { ConfirmDialog, Btn, SearchInput, Badge, useToast } from '@/components/admin/ui';

const FILTERS = [
  { label: 'All',    value: '' },
  { label: 'Unread', value: 'false' },
  { label: 'Read',   value: 'true' },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [q, setQ] = useState('');
  const [readFilter, setReadFilter] = useState('');
  const toast = useToast();

  const load = (query = q, read = readFilter) => {
    setLoading(true);
    const params = new URLSearchParams({ ...(query && { q: query }), ...(read !== '' && { read }) });
    fetch(`/api/contacts?${params}`).then(r => r.json()).then(j => {
      setMessages(j.data || []);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const handleSearch = (val) => { setQ(val); load(val, readFilter); };
  const handleFilter = (val) => { setReadFilter(val); load(q, val); };

  const markRead = async (id) => {
    await fetch(`/api/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    });
    setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
  };

  const markAllRead = async () => {
    const unread = messages.filter(m => !m.read);
    await Promise.all(unread.map(m => fetch(`/api/contacts/${m._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    })));
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
    toast.show('All messages marked as read.');
  };

  const handleDelete = async () => {
    setDeleting(true);
    await fetch(`/api/contacts/${deleteId}`, { method: 'DELETE' });
    setMessages(prev => prev.filter(m => m._id !== deleteId));
    setDeleteId(null); setDeleting(false);
    toast.show('Message deleted.');
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      {toast.ToastEl}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-signature font-bold text-foreground">Messages</h1>
          <p className="text-sm text-muted">{messages.length} total · {unread} unread</p>
        </div>
        {unread > 0 && (
          <Btn variant="ghost" onClick={markAllRead}>
            <CheckCheck size={15} /> Mark all read
          </Btn>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchInput value={q} onChange={handleSearch} placeholder="Search by name, email, message..." className="flex-1 max-w-sm" />
        <div className="flex gap-1">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => handleFilter(f.value)}
              className={`px-3 py-2 text-xs font-bold border-2 transition-colors ${
                readFilter === f.value ? 'bg-foreground text-background border-foreground' : 'text-muted border-card-border hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted"><Loader2 size={24} className="animate-spin mx-auto mb-2" /></div>
      ) : messages.length === 0 ? (
        <div className="py-16 text-center text-muted border-2 border-card-border border-dashed text-sm">
          {q || readFilter ? 'No messages match your filter.' : 'No messages yet.'}
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map(msg => (
            <div
              key={msg._id}
              className={`bg-card border-2 border-dashed transition-all duration-200 ${!msg.read ? 'border-foreground' : 'border-card-border'}`}
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
                      {!msg.read && <Badge variant="new">New</Badge>}
                    </div>
                    <p className="text-xs text-muted mt-0.5 truncate max-w-xs sm:max-w-md">{msg.message}</p>
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
                <div className="px-5 pb-5 border-t border-dashed border-card-border pt-4">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted">
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
