'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, User, Briefcase, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogs: 0, messages: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/blogs').then(r => r.json()),
      fetch('/api/contacts').then(r => r.json()),
    ]).then(([blogs, contacts]) => {
      setStats({
        blogs: blogs.data?.length ?? 0,
        messages: contacts.data?.length ?? 0,
        unread: contacts.data?.filter(c => !c.read).length ?? 0,
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'About', desc: 'Edit bio, contact info, services', href: '/admin/about', icon: User },
    { label: 'Resume', desc: 'Manage experience, projects, skills', href: '/admin/resume', icon: Briefcase },
    { label: 'Blogs', desc: `${stats.blogs} posts`, href: '/admin/blogs', icon: FileText },
    { label: 'Messages', desc: `${stats.messages} total · ${stats.unread ?? 0} unread`, href: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="text-3xl font-signature font-bold text-foreground mb-2">Dashboard</h1>
      <p className="text-sm text-muted mb-8">Manage your portfolio content from here.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <Link
            key={card.href} href={card.href}
            className="bg-card border-2 border-card-border sketch-border p-6 hover:bg-primary-light hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group"
          >
            <card.icon size={24} className="text-muted mb-4 group-hover:text-foreground transition-colors" />
            <h3 className="font-signature font-bold text-xl text-foreground mb-1">{card.label}</h3>
            <p className="text-xs text-muted">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
