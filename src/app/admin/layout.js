import AdminNav from '@/components/admin/AdminNav';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-background paper-pattern">
      <AdminNav />
      <main className="md:ml-56 pt-14 md:pt-0 min-h-screen flex flex-col">
        <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
