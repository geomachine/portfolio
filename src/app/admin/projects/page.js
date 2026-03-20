'use client';

import { useEffect, useState } from 'react';
import { Plus, Loader2, GripVertical } from 'lucide-react';
import { Table, Modal, ConfirmDialog, Btn, Field, Input, Textarea, Badge, useToast } from '@/components/admin/ui';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const CATEGORIES = ['Web development', 'Web design', 'Applications', 'Open Source', 'Infrastructure'];

const schema = z.object({
  title:    z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
  img:      z.string().optional(),
  link:     z.string().optional(),
  desc:     z.string().optional(),
  order:    z.coerce.number().optional(),
});

function ProjectModal({ open, onClose, selected, onSaved, toast }) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (open) {
      reset(selected
        ? { title: selected.title, category: selected.category, img: selected.img || '', link: selected.link || '', desc: selected.desc || '', order: selected.order ?? 0 }
        : { title: '', category: 'Web development', img: '', link: '', desc: '', order: 0 }
      );
      setApiError('');
    }
  }, [open, selected, reset]);

  const onSubmit = async (data) => {
    setLoading(true); setApiError('');
    try {
      const res = await fetch(selected ? `/api/projects/${selected._id}` : '/api/projects', {
        method: selected ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) { setApiError(json.error || 'Failed'); return; }
      onSaved(json.data, !!selected);
      toast.show(selected ? 'Project updated.' : 'Project created.');
      onClose();
    } catch { setApiError('Something went wrong'); }
    finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={selected ? 'Edit Project' : 'New Project'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Title" error={errors.title?.message} required>
          <Input {...register('title')} placeholder="Project name" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category" error={errors.category?.message} required>
            <select
              {...register('category')}
              className="w-full bg-background border-2 border-dashed border-card-border px-3 py-2 text-sm text-foreground outline-none focus:border-foreground transition-colors"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Display Order">
            <Input {...register('order')} type="number" placeholder="0" />
          </Field>
        </div>
        <Field label="Image">
          <Controller
            name="img"
            control={control}
            render={({ field }) => (
              <ImageUpload value={field.value} onChange={field.onChange} folder="projects" />
            )}
          />
        </Field>
        <Field label="Project Link">
          <Input {...register('link')} placeholder="https://github.com/..." />
        </Field>
        <Field label="Description">
          <Textarea {...register('desc')} rows={3} placeholder="Short description of the project..." />
        </Field>
        {apiError && <p className="text-xs text-red-500 bg-red-500/10 px-3 py-2">{apiError}</p>}
        <div className="flex justify-end gap-3 pt-2 border-t border-dashed border-card-border">
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

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(j => {
      setProjects(j.data || []);
      setLoading(false);
    });
  }, []);

  const handleSaved = (project, isEdit) => {
    if (isEdit) setProjects(prev => prev.map(p => p._id === project._id ? project : p));
    else setProjects(prev => [project, ...prev]);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await fetch(`/api/projects/${deleteId}`, { method: 'DELETE' });
    setProjects(prev => prev.filter(p => p._id !== deleteId));
    setDeleteId(null); setDeleting(false);
    toast.show('Project deleted.');
  };

  const columns = [
    {
      header: 'Project', key: 'title',
      render: (v, row) => (
        <div className="flex items-center gap-3">
          {row.img
            ? <img src={row.img} alt={v} className="w-10 h-8 object-cover border border-card-border shrink-0" />
            : <div className="w-10 h-8 border border-card-border bg-primary-light shrink-0" />
          }
          <span className="font-bold">{v}</span>
        </div>
      ),
    },
    { header: 'Category', key: 'category', render: (v) => <Badge>{v}</Badge> },
    { header: 'Link', key: 'link', render: (v) => v ? <a href={v} target="_blank" rel="noreferrer" className="text-xs underline underline-offset-2 text-muted hover:text-foreground truncate max-w-[160px] block">{v}</a> : '—' },
    { header: 'Order', key: 'order', render: (v) => <span className="text-muted">{v ?? 0}</span> },
  ];

  return (
    <div>
      {toast.ToastEl}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-signature font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <Btn onClick={() => { setSelected(null); setModalOpen(true); }}>
          <Plus size={15} /> New Project
        </Btn>
      </div>

      <div className="bg-card border-2 border-dashed border-card-border">
        <Table
          columns={columns} data={projects} loading={loading}
          onEdit={(p) => { setSelected(p); setModalOpen(true); }}
          onDelete={(p) => setDeleteId(p._id)}
          emptyText="No projects yet. Add your first one."
        />
      </div>

      <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} selected={selected} onSaved={handleSaved} toast={toast} />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
