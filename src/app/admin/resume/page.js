'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Btn, Field, Input, Textarea } from '@/components/admin/ui';

const DEFAULT_RESUME = {
  experience: [
    { title: 'Senior Software Engineer & Backend Lead', company: 'Zalmi Technology', period: 'Jan 2026 — Present', points: [''] },
  ],
  infraProjects: [
    { title: 'Private Hybrid Cloud — NesoHQ', period: '2022 — Present', text: '' },
  ],
  skills: [
    { category: 'Languages', tags: ['Golang', 'TypeScript'] },
  ],
};

export default function AdminResumePage() {
  const [data, setData] = useState(DEFAULT_RESUME);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/resume').then(r => r.json()).then(j => {
      if (j.data) setData(j.data);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch('/api/resume', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const setExp = (i, key, val) => {
    const exp = [...data.experience];
    exp[i] = { ...exp[i], [key]: val };
    setData(d => ({ ...d, experience: exp }));
  };

  const setPoint = (ei, pi, val) => {
    const exp = [...data.experience];
    const pts = [...exp[ei].points];
    pts[pi] = val;
    exp[ei] = { ...exp[ei], points: pts };
    setData(d => ({ ...d, experience: exp }));
  };

  const setProj = (i, key, val) => {
    const proj = [...data.infraProjects];
    proj[i] = { ...proj[i], [key]: val };
    setData(d => ({ ...d, infraProjects: proj }));
  };

  const setSkill = (i, key, val) => {
    const skills = [...data.skills];
    skills[i] = { ...skills[i], [key]: val };
    setData(d => ({ ...d, skills }));
  };

  if (loading) return <div className="py-16 text-center text-muted"><Loader2 size={24} className="animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-signature font-bold text-foreground">Resume</h1>
        <Btn onClick={save} disabled={saving}>
          {saving && <Loader2 size={14} className="animate-spin" />}
          {saved ? '✓ Saved' : 'Save Changes'}
        </Btn>
      </div>

      {/* Experience */}
      <section className="bg-card border-2 border-card-border sketch-border p-6 space-y-6">
        <h2 className="font-signature font-bold text-lg text-foreground border-b border-card-border pb-2">Work Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="border border-card-border p-4 space-y-3 relative">
            <button onClick={() => setData(d => ({ ...d, experience: d.experience.filter((_, j) => j !== i) }))} className="absolute top-3 right-3 text-muted hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Job Title"><Input value={exp.title} onChange={e => setExp(i, 'title', e.target.value)} /></Field>
              <Field label="Company"><Input value={exp.company} onChange={e => setExp(i, 'company', e.target.value)} /></Field>
              <Field label="Period"><Input value={exp.period} onChange={e => setExp(i, 'period', e.target.value)} placeholder="Jan 2026 — Present" /></Field>
            </div>
            <Field label="Bullet Points">
              <div className="space-y-2">
                {exp.points.map((pt, pi) => (
                  <div key={pi} className="flex gap-2">
                    <Input value={pt} onChange={e => setPoint(i, pi, e.target.value)} placeholder={`Point ${pi + 1}`} className="flex-1" />
                    <button onClick={() => { const pts = exp.points.filter((_, j) => j !== pi); setExp(i, 'points', pts); }} className="text-muted hover:text-red-500 transition-colors shrink-0"><Trash2 size={14} /></button>
                  </div>
                ))}
                <Btn variant="ghost" onClick={() => setExp(i, 'points', [...exp.points, ''])}><Plus size={12} /> Add Point</Btn>
              </div>
            </Field>
          </div>
        ))}
        <Btn variant="ghost" onClick={() => setData(d => ({ ...d, experience: [...d.experience, { title: '', company: '', period: '', points: [''] }] }))}>
          <Plus size={14} /> Add Experience
        </Btn>
      </section>

      {/* Infra Projects */}
      <section className="bg-card border-2 border-card-border sketch-border p-6 space-y-4">
        <h2 className="font-signature font-bold text-lg text-foreground border-b border-card-border pb-2">Cloud & Infra Projects</h2>
        {data.infraProjects.map((proj, i) => (
          <div key={i} className="border border-card-border p-4 space-y-3 relative">
            <button onClick={() => setData(d => ({ ...d, infraProjects: d.infraProjects.filter((_, j) => j !== i) }))} className="absolute top-3 right-3 text-muted hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title"><Input value={proj.title} onChange={e => setProj(i, 'title', e.target.value)} /></Field>
              <Field label="Period"><Input value={proj.period} onChange={e => setProj(i, 'period', e.target.value)} /></Field>
            </div>
            <Field label="Description"><Textarea value={proj.text} rows={2} onChange={e => setProj(i, 'text', e.target.value)} /></Field>
          </div>
        ))}
        <Btn variant="ghost" onClick={() => setData(d => ({ ...d, infraProjects: [...d.infraProjects, { title: '', period: '', text: '' }] }))}>
          <Plus size={14} /> Add Project
        </Btn>
      </section>

      {/* Skills */}
      <section className="bg-card border-2 border-card-border sketch-border p-6 space-y-4">
        <h2 className="font-signature font-bold text-lg text-foreground border-b border-card-border pb-2">Skills</h2>
        {data.skills.map((group, i) => (
          <div key={i} className="flex gap-3 items-start">
            <Input value={group.category} onChange={e => setSkill(i, 'category', e.target.value)} placeholder="Category" className="w-40 shrink-0" />
            <Input value={group.tags?.join(', ')} onChange={e => setSkill(i, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} placeholder="tag1, tag2, tag3" className="flex-1" />
            <button onClick={() => setData(d => ({ ...d, skills: d.skills.filter((_, j) => j !== i) }))} className="text-muted hover:text-red-500 transition-colors mt-2 shrink-0"><Trash2 size={14} /></button>
          </div>
        ))}
        <Btn variant="ghost" onClick={() => setData(d => ({ ...d, skills: [...d.skills, { category: '', tags: [] }] }))}>
          <Plus size={14} /> Add Skill Group
        </Btn>
      </section>
    </div>
  );
}
