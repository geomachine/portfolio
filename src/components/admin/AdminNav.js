'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'About', href: '/admin/about' },
  { label: 'Resume', href: '/admin/resume' },
  { label: 'Blogs', href: '/admin/blogs' },
  { label: 'Messages', href: '/admin/messages' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const isActive = (href) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const isLoginPage = pathname === '/admin/login';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b-2 border-card-border h-16 flex items-center px-6">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-6">
            <span className="font-signature font-bold text-xl text-foreground">Portfolio Admin</span>
            {!isLoginPage && (
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map(item => (
                  <Link
                    key={item.href} href={item.href}
                    className={`px-3 py-1.5 text-sm font-bold transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-foreground text-background'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isLoginPage && (
              <button
                onClick={handleLogout} disabled={loggingOut}
                className="hidden md:flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-colors"
              >
                <LogOut size={15} /> {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
            )}
            {!isLoginPage && (
              <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {!isLoginPage && open && (
        <div className="fixed inset-0 z-40 bg-background pt-16 md:hidden">
          <nav className="flex flex-col p-6 gap-2">
            {navItems.map(item => (
              <Link
                key={item.href} href={item.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-sm font-bold border-2 border-card-border transition-colors ${
                  isActive(item.href) ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-3 text-sm font-bold text-red-500 border-2 border-red-500/30 flex items-center gap-2"
            >
              <LogOut size={15} /> Logout
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
