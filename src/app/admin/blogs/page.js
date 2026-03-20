'use client';

import { useEffect, useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Table, Modal, ConfirmDialog, Btn, Field, Input, Textarea } from '@/components/admin/ui';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  title:    z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
  excerpt:  z.string().min(1, 'Required'),
  content:  z.string().min(1, 'Required'),
  tags:     z.string().optional(),
});

function BlogModal({ open, onClose, selected, onSaved }) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (open) {
      reset(selected ? {
        title: selected.title,
        category: selected.category,
        excerpt: selected.excerpt,
        content: selected.content,
        tags: selected.tags?.join(', ') || '',
      } : { title: '', category: 'General', excerpt: '', content: '', tags: '' });
      setApiError('');
    }
  }, [open, selected, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError('');
    const payload = { ...data, tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
    try {
      const res = await fetch(selected ? `/api/blogs/${selected._id}` : '/api/blogs', {
        method: selected ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) { setApiError(json.error || 'Failed'); return; }
      onSaved(json.data, !!selected);
      onClose();
    } catch { setApiError('Something went wrong'); }
    finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={selected ? 'Edit Blog' : 'New Blog Post'} wide>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Title" error={errors.title?.message} required>
          <Input {...register('title')} placeholder="Post title" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category" error={errors.category?.message} required>
            <Input {...register('category')} placeholder="e.g. Engineering" />
          </Field>
          <Field label="Tags" error={errors.tags?.message}>
            <Input {...register('tags')} placeholder="tag1, tag2, tag3" />
          </Field>
        </div>
        <Field label="Excerpt" error={errors.excerpt?.message} required>
          <Textarea {...register('excerpt')} rows={2} placeholder="Short summary shown on the blog list" />
        </Field>
        <Field label="Content (Markdown / HTML)" error={errors.content?.message} required>
          <Textarea {...register('content')} rows={10} placeholder="Full blog content..." />
        </Field>
        {apiError && <p className="text-xs text-red-500 bg-red-500/10 px-3 py-2">{apiError}</p>}
        <div className="flex justify-end gap-3 pt-2 border-t border-card-border">
          <Btn variant="ghost" type="button" onClick={onClose} disabled={loading}>Cancel</Btn>
          <Btn type="submit" disabled={loading}>
            {loading && <Loader2 size={14} className="animate-spin" />}
            {selected ? 'Update' : 'Create'}
          </Btn>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/blogs').then(r => r.json()).then(j => {
      setBlogs(j.data || []);
      setLoading(false);
    });
  }, []);

  const handleSaved = (blog, isEdit) => {
    setBlogs(prev => isEdit ? prev.map(b => b._id === blog._id ? blog : b) : [blog, ...prev]);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await fetch(`/api/blogs/${deleteId}`, { method: 'DELETE' });
    setBlogs(prev => prev.filter(b => b._id !== deleteId));
    setDeleteId(null);
    setDeleting(false);
  };

  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Category', key: 'category' },
    { header: 'Tags', key: 'tags', render: (v) => v?.join(', ') || '—' },
    { header: 'Date', key: 'createdAt', render: (v) => v ? new Date(v).toLocaleDateString() : '—' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-signature font-bold text-foreground">Blogs</h1>
          <p className="text-sm text-muted">{blogs.length} posts</p>
        </div>
        <Btn onClick={() => { setSelected(null); setModalOpen(true); }}>
          <Plus size={15} /> New Post
        </Btn>
      </div>

      <div className="bg-card border-2 border-card-border sketch-border">
        <Table
          columns={columns} data={blogs} loading={loading}
          onEdit={(b) => { setSelected(b); setModalOpen(true); }}
          onDelete={(b) => setDeleteId(b._id)}
          emptyText="No blog posts yet. Create your first one."
        />
      </div>

      <BlogModal open={modalOpen} onClose={() => setModalOpen(false)} selected={selected} onSaved={handleSaved} />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
