'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md border-2 border-card-border sketch-border bg-card p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-signature font-bold text-foreground mb-1">Admin Portal</h1>
          <p className="text-sm text-muted">Sign in to manage your portfolio content.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-background border-2 border-card-border pl-9 pr-4 py-3 text-sm text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full bg-background border-2 border-card-border pl-9 pr-4 py-3 text-sm text-foreground outline-none focus:border-foreground transition-colors placeholder:text-muted"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-2">{error}</p>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full bg-foreground text-background py-3 font-signature font-bold text-lg flex items-center justify-center gap-2 hover:opacity-80 transition-opacity disabled:opacity-50 sketch-border"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
