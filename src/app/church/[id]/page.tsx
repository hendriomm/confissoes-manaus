import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

const dayOrder = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

export async function generateStaticParams() {
  const churches = await prisma.church.findMany({
    select: { id: true },
  });
  return churches.map((church) => ({ id: church.id }));
}

export default async function ChurchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const church = await prisma.church.findUnique({
    where: { id },
    include: { confessionSchedules: true },
  });

  if (!church) {
    notFound();
  }

  const sortedSchedule = [...church.confessionSchedules].sort(
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
  );

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-5 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="text-blue-200 hover:text-white text-sm font-medium transition-colors"
          >
            &larr; Voltar
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">{church.name}</h1>

          <div className="mt-4 space-y-3">
            <div>
              <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Endereço
              </dt>
              <dd className="text-gray-700">{church.address}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Bairro
              </dt>
              <dd className="text-gray-700">{church.neighborhood}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Telefone
              </dt>
              <dd className="text-gray-700">{church.phone}</dd>
            </div>
            {church.priestName && (
              <div>
                <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Pároco
                </dt>
                <dd className="text-gray-700">{church.priestName}</dd>
              </div>
            )}
            {church.notes && (
              <div>
                <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Observações
                </dt>
                <dd className="text-gray-700">{church.notes}</dd>
              </div>
            )}
          </div>

          <a
            href={`tel:${church.phone.replace(/\D/g, "")}`}
            className="mt-6 inline-flex items-center gap-2 bg-green-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Ligar
          </a>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Horários de Confissão
          </h2>
          <ul className="divide-y divide-gray-100">
            {sortedSchedule.map((schedule) => (
              <li
                key={schedule.id}
                className="flex justify-between items-center py-3"
              >
                <span className="font-medium text-gray-700">
                  {schedule.day}
                </span>
                <span className="text-gray-600">
                  {schedule.startTime} &ndash; {schedule.endTime}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
