import { prisma } from "@/lib/db";
import ChurchList from "@/components/ChurchList";

export default async function Home() {
  const churches = await prisma.church.findMany({
    include: { confessionSchedules: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">
            Confissões em Manaus
          </h1>
          <p className="mt-2 text-blue-100 text-lg">
            Encontre uma igreja para se confessar
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <ChurchList churches={churches} />
      </main>

      <footer className="text-center py-6 text-sm text-gray-400">
        Confissões em Manaus &mdash; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
