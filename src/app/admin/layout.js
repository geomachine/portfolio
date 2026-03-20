import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      {/* md: offset for sidebar (w-56), mobile: offset for top bar (h-14) */}
      <main className="md:ml-56 pt-14 md:pt-0 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
