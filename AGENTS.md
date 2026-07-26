# AGENTS.md — ConfissoesManaus

Website for finding churches and confession schedules in Manaus, AM.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** SQLite via Prisma ORM (`prisma/dev.db`)
- **Data:** 33 real churches across Manaus neighborhoods (seeded from Archdiocese of Manaus)
- **Language:** All UI text in Brazilian Portuguese

## Commands

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Serve production build
npm run lint       # ESLint check
npx prisma db seed # Re-seed database with real church data
npx prisma studio  # Browse data in browser
npx prisma migrate dev --name <description> # Create migration after schema changes
```

No test framework installed yet.

## Database

SQLite database at `prisma/dev.db`. Schema in `prisma/schema.prisma`.

### Seed data

33 churches from the Archdiocese of Manaus with 50 confession schedules across neighborhoods:
Centro, Parque 10 de Novembro, Adrianópolis, Ponta Negra, Aparecida, Praça 14 de Janeiro,
Flores, Cidade Nova, Glória, Dom Pedro, Compensa, Santa Luzia, Educandos, Planalto,
São Jorge, Colônia Antônio Aleixo, Redenção, Petrópolis, Japiim, Parque das Laranjeiras,
Betânia, Morro da Liberdade, Colônia Oliveira Machado, Alvorada, São Raimundo.

To re-seed:
```bash
rm -f prisma/dev.db
npx prisma migrate dev --name init
npx prisma db seed
```

## Project Structure

```
prisma/
├── schema.prisma          # Database schema (Church, ConfessionSchedule)
├── seed.ts                # Seeds DB with 33 real churches
├── migrations/            # Prisma migrations
└── dev.db                 # SQLite database file

src/
├── app/
│   ├── api/churches/route.ts   # GET /api/churches
│   ├── church/[id]/page.tsx    # Church detail page
│   ├── layout.tsx              # Root layout (pt-BR, metadata)
│   └── page.tsx                # Homepage — church listing
├── data/
│   └── churches.ts             # Sample church data (legacy, not used by pages)
└── types/
    └── church.ts               # Church, ConfessionSchedule interfaces
```

## Key Files

- `prisma/schema.prisma` — Database model definitions.
- `prisma/seed.ts` — Seed script with real church data.
- `src/app/page.tsx` — Homepage with church cards.
- `src/app/church/[id]/page.tsx` — Detail page with full schedule and phone link.

## Architecture Notes

- Pages are statically generated at build time (`generateStaticParams` for church details).
- Database seeded with real data from Archdiocese of Manaus.
- Latitude/longitude fields exist in the model for future "nearby me" feature.

## Conventions

- Mobile-first design.
- Warm, clean UI — whites, soft grays, blue/gold accents.
- Church names use proper Brazilian Portuguese formatting.
- Phone numbers in Brazilian format: (92) XXXXX-XXXX.
