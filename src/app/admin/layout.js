import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="pt-16 max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
