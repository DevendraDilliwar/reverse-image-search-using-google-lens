
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>

  );
}
