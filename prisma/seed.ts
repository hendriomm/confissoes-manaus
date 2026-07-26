import { PrismaClient } from '../src/generated/prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.confessionSchedule.deleteMany()
  await prisma.church.deleteMany()

  // Create churches with schedules (real data from Archdiocese of Manaus)
  const churches = [
    {
      name: "Catedral Metropolitana de Manaus – Nossa Senhora da Conceição",
      address: "Praça Osvaldo Cruz, s/n – Centro",
      neighborhood: "Centro",
      phone: "(92) 98158-8119",
      latitude: -3.1351,
      longitude: -60.0254,
      priestName: null,
      notes: "Catedral Metropolitana da Arquidiocese de Manaus. Museu nos fundos. Maior igreja da cidade.",
      confessionSchedules: [
        { day: "Terça-feira", startTime: "10:00", endTime: "11:30" },
        { day: "Quarta-feira", startTime: "10:00", endTime: "11:30" },
        { day: "Quinta-feira", startTime: "10:00", endTime: "11:30" },
        { day: "Sexta-feira", startTime: "10:00", endTime: "11:30" },
      ]
    },
    {
      name: "Paróquia Nossa Senhora das Mercês",
      address: "Rua Virgílio Freire, nº 270 – Conjunto Eldorado",
      neighborhood: "Parque 10 de Novembro",
      phone: "(92) 3016-5087",
      latitude: -3.0825,
      longitude: -60.0185,
      priestName: "Frei Rômulo Costa Albuquerque, OFMConv",
      notes: "Ordem dos Frades Menores Conventuais. Confissão também aos domingos às 11h.",
      confessionSchedules: [
        { day: "Terça-feira", startTime: "16:00", endTime: "18:00" },
        { day: "Quinta-feira", startTime: "16:00", endTime: "18:00" },
        { day: "Domingo", startTime: "11:00", endTime: "11:30" },
      ]
    },
    {
      name: "Paróquia Nossa Senhora de Nazaré",
      address: "Av. Mário Ypiranga, nº 700",
      neighborhood: "Adrianópolis",
      phone: "(92) 3622-1566",
      latitude: -3.1189,
      longitude: -60.0198,
      priestName: null,
      notes: "Paróquia tradicional no Adrianópolis. Chegar cedo para confissão.",
      confessionSchedules: [
        { day: "Segunda-feira", startTime: "18:30", endTime: "19:00" },
        { day: "Terça-feira", startTime: "18:30", endTime: "19:00" },
        { day: "Quarta-feira", startTime: "18:30", endTime: "19:00" },
        { day: "Quinta-feira", startTime: "18:30", endTime: "19:00" },
        { day: "Sexta-feira", startTime: "18:30", endTime: "19:00" },
      ]
    },
    {
      name: "Área Missionária Nossa Senhora da Amazônia",
      address: "Rua Cerina Souto, 357 – Conjunto Alpha Ville",
      neighborhood: "Ponta Negra",
      phone: "(92) 99169-7030",
      latitude: -3.1025,
      longitude: -60.0385,
      priestName: null,
      notes: "Igreja nova em região arborizada. Estacionamento disponível.",
      confessionSchedules: [
        { day: "Sábado", startTime: "16:00", endTime: "17:30" },
      ]
    },
    {
      name: "Santuário São José Operário",
      address: "Rua Visconde de Porto Alegre, nº 820",
      neighborhood: "Centro",
      phone: "(92) 98859-4464",
      latitude: -3.1245,
      longitude: -60.0131,
      priestName: null,
      notes: "Antiga Paróquia São José Operário. Grande devoção ao Sagrado Coração.",
      confessionSchedules: [
        { day: "Segunda-feira", startTime: "17:45", endTime: "18:15" },
        { day: "Terça-feira", startTime: "17:45", endTime: "18:15" },
        { day: "Quarta-feira", startTime: "17:45", endTime: "18:15" },
        { day: "Quinta-feira", startTime: "08:00", endTime: "12:00" },
        { day: "Quinta-feira", startTime: "14:00", endTime: "18:00" },
        { day: "Sexta-feira", startTime: "17:45", endTime: "18:15" },
      ]
    },
    {
      name: "Paróquia São Sebastião, Mártir, São Francisco de Assis",
      address: "Rua Tapajós, nº 54",
      neighborhood: "Centro",
      phone: "(92) 99474-8844",
      latitude: -3.1278,
      longitude: -60.0145,
      priestName: null,
      notes: "Paróquia histórica no Centro. Múltiplas missas diárias.",
      confessionSchedules: [
        { day: "Sábado", startTime: "16:00", endTime: "17:00" },
      ]
    },
    {
      name: "Santuário Nossa Senhora Aparecida",
      address: "Rua Alexandre Amorim, nº 341",
      neighborhood: "Aparecida",
      phone: "(92) 3633-4759",
      latitude: -3.1294,
      longitude: -60.0299,
      priestName: "Pe. Ronaldo Mendonça de Oliveira",
      notes: "Santuário na Zona Sul. Novena terça-feira com missas às 6h, 12h e 19h.",
      confessionSchedules: [
        { day: "Sexta-feira", startTime: "17:00", endTime: "18:00" },
        { day: "Sábado", startTime: "16:00", endTime: "17:00" },
      ]
    },
    {
      name: "Santuário Nossa Senhora de Fátima",
      address: "Avenida Tarumã, s/n – Praça 14 de Janeiro",
      neighborhood: "Praça 14 de Janeiro",
      phone: "(92) 3636-6053",
      latitude: -3.1290,
      longitude: -60.0320,
      priestName: null,
      notes: "Santuário na Praça 14. Novena todo dia 13 às 12h. Grande devoção popular.",
      confessionSchedules: [
        { day: "Sexta-feira", startTime: "17:00", endTime: "18:00" },
        { day: "Sábado", startTime: "16:00", endTime: "17:00" },
      ]
    },
    {
      name: "Paróquia São Raimundo Nonato",
      address: "Praça Ismael Benigno, nº 151 – São Raimundo, CEP 69027-320",
      neighborhood: "São Raimundo",
      phone: "(92) 3671-7452",
      latitude: -3.1016,
      longitude: -60.0211,
      priestName: null,
      notes: "Paróquia histórica na Zona Leste. WhatsApp: (92) 98450-4338.",
      confessionSchedules: [
        { day: "Sábado", startTime: "16:00", endTime: "17:00" }
      ]
    },
    {
      name: "Paróquia Santo Afonso Maria de Ligório",
      address: "Av. Constantino Nery, nº 5785 – Flores, CEP 69058-795",
      neighborhood: "Flores",
      phone: "(92) 99487-1883",
      latitude: -3.0738,
      longitude: -60.0266,
      priestName: null,
      notes: "Instagram: @paroquiasantoafonsomaria. Confissão confirmada.",
      confessionSchedules: [
        { day: "Quinta-feira", startTime: "13:00", endTime: "18:00" },
        { day: "Sábado", startTime: "15:00", endTime: "18:00" }
      ]
    },
    {
      name: "Paróquia São Bento",
      address: "Rua Professor Felix Valois, nº 01 – Cidade Nova I, CEP 69095-010",
      neighborhood: "Cidade Nova",
      phone: "(92) 3347-9179",
      latitude: -3.0296,
      longitude: -59.9845,
      priestName: null,
      notes: "Uma das maiores paróquias de Manaus. Ar-condicionado.",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar secretaria", endTime: "(92) 3347-9179" }
      ]
    },
    {
      name: "Paróquia Nossa Senhora da Glória",
      address: "Rua da Glória, nº 25 – Glória, CEP 69027-620",
      neighborhood: "Glória",
      phone: "(92) 98431-0341",
      latitude: -3.1215,
      longitude: -60.0339,
      priestName: null,
      notes: "Website: paroquiansgloria.com.br",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 98431-0341" }
      ]
    },
    {
      name: "Paróquia Nossa Senhora Rainha dos Apóstolos",
      address: "Rua Washington Luiz, nº 55 – Conjunto Dom Pedro I, CEP 69040-210",
      neighborhood: "Dom Pedro",
      phone: "(92) 3656-5445",
      latitude: -3.0861,
      longitude: -60.0359,
      priestName: "Pe. Celestino Ceretta S.A.C",
      notes: "Website: rainhadosapostolos-am.org.br",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3656-5445" }
      ]
    },
    {
      name: "Paróquia São Vicente de Paulo",
      address: "Rua Santa Rita, nº 833 – Compensa III, CEP 69035-300",
      neighborhood: "Compensa",
      phone: "(92) 3625-7426",
      latitude: -3.1086,
      longitude: -60.0624,
      priestName: null,
      notes: "Secretaria: Ter 14h-17h30, Qua-Sex 14h-19h, Sáb 8h-12h/14h-19h.",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar secretaria", endTime: "(92) 3625-7426" }
      ]
    },
    {
      name: "Paróquia Cristo Libertador",
      address: "Rua Izaurina Braga, nº 344 – Compensa I, CEP 69030-000",
      neighborhood: "Compensa",
      phone: "(92) 3625-2601",
      latitude: -3.1006,
      longitude: -60.0534,
      priestName: null,
      notes: "Comunidades: Imaculado Coração de Maria, Nossa Senhora de Fátima, São João Evangelista.",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3625-2601" }
      ]
    },
    {
      name: "Paróquia Nossa Senhora Mãe da Misericórdia",
      address: "Rua Dom Pedro I, nº 1370 – Compensa 1, CEP 69035-650",
      neighborhood: "Compensa",
      phone: "(92) 3071-7315",
      latitude: -3.1045,
      longitude: -60.0592,
      priestName: null,
      notes: "2 diaconias e 13 comunidades em Compensa II.",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3071-7315" }
      ]
    },
    {
      name: "Paróquia Santa Luzia",
      address: "Rua São Jorge, nº 70 – Santa Luzia, CEP 69074-490",
      neighborhood: "Santa Luzia",
      phone: "(92) 3629-2022",
      latitude: -3.1102,
      longitude: -59.9886,
      priestName: null,
      notes: "Facebook: @paroquiasantaluziamanaus",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3629-2022" }
      ]
    },
    {
      name: "Paróquia Nossa Senhora do Perpétuo Socorro",
      address: "Rua Inocêncio de Araújo, nº 44 – Educandos, CEP 69070-100",
      neighborhood: "Educandos",
      phone: "(92) 3233-9752",
      latitude: -3.1270,
      longitude: -59.9860,
      priestName: null,
      notes: "Facebook: @perpetuosocorroeducandosam",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3233-9752" }
      ]
    },
    {
      name: "Paróquia Santa Cruz",
      address: "Av. Constantinopla, nº 1 – Conjunto Ajuricaba, Planalto, CEP 69043-000",
      neighborhood: "Planalto",
      phone: "(92) 3656-4581",
      latitude: -3.0715,
      longitude: -60.0468,
      priestName: "Pe. Celso Ferreira da Silva",
      notes: "Instagram: @paroquiasantacruz.am",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3656-4581" }
      ]
    },
    {
      name: "Paróquia São Jorge",
      address: "Rua Emília Ruas, nº 311 – São Jorge, CEP 69033-440",
      neighborhood: "São Jorge",
      phone: "(92) 3186-9700",
      latitude: -3.0984,
      longitude: -60.0130,
      priestName: null,
      notes: "Website: paroquiadesaojorge.com.br",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar secretaria", endTime: "(92) 3186-9700" }
      ]
    },
    {
      name: "Paróquia Nossa Senhora de Lourdes",
      address: "Rua Dom Milton Correia Pereira, nº 1091 – Parque 10 de Novembro, CEP 69055-440",
      neighborhood: "Parque 10 de Novembro",
      phone: "(92) 3646-1345",
      latitude: -3.0802,
      longitude: -60.0119,
      priestName: "Pe. Francisco Paulo Pinto",
      notes: "",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3646-1345" }
      ]
    },
    {
      name: "Paróquia Nossa Senhora das Graças",
      address: "Rua Libertador, nº 55 – Nossa Senhora das Graças, CEP 69053-090",
      neighborhood: "Colônia Antônio Aleixo",
      phone: "(92) 3633-8020",
      latitude: -3.0939,
      longitude: -59.8988,
      priestName: "Pe. Mauro Cleto Ferreira da Costa",
      notes: "Colônia Antônio Aleixo.",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3633-8020" }
      ]
    },
    {
      name: "Paróquia Nossa Senhora das Dores",
      address: "Rua Campo Grande, nº 444 – Redenção, CEP 69047-051",
      neighborhood: "Redenção",
      phone: "(92) 3651-1038",
      latitude: -3.0850,
      longitude: -60.0450,
      priestName: null,
      notes: "Facebook: @paroquiadasdores15",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3651-1038" }
      ]
    },
    {
      name: "Paróquia Sant'Ana",
      address: "Rua 14, nº 40 – Conjunto Hiléia I, Redenção, CEP 69049-300",
      neighborhood: "Redenção",
      phone: "(92) 3304-8632",
      latitude: -3.0138,
      longitude: -59.9754,
      priestName: null,
      notes: "",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3304-8632" }
      ]
    },
    {
      name: "Paróquia São José – Belo Horizonte",
      address: "Rua Nossa Senhora da Consolação, nº 17 – Adrianópolis, CEP 69057-520",
      neighborhood: "Adrianópolis",
      phone: "(92) 98400-0044",
      latitude: -3.0838,
      longitude: -60.0024,
      priestName: null,
      notes: "",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 98400-0044" }
      ]
    },
    {
      name: "Paróquia São Pedro Apóstolo",
      address: "Rua Coronel Ferreira de Araújo, s/n – Petrópolis, CEP 69063-000",
      neighborhood: "Petrópolis",
      phone: "(92) 3611-3201",
      latitude: -3.1131,
      longitude: -60.0005,
      priestName: null,
      notes: "28 diaconias. Website: saopedroapostolo.org.br",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3611-3201" }
      ]
    },
    {
      name: "Paróquia Santíssima Trindade",
      address: "Rua Francisco de Miranda, S/N – Conjunto 31 de Março, Japiim I, CEP 69077-140",
      neighborhood: "Japiim",
      phone: "(92) 3308-8400",
      latitude: -3.1178,
      longitude: -59.9775,
      priestName: "Pe. Jardson da Silva Sampaio",
      notes: "Vigário: Pe. Ricardo Pontes de Oliveira.",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3308-8400" }
      ]
    },
    {
      name: "Área Missionária São Lourenço",
      address: "Rua Jequitinhonha, nº 45 – Parque das Laranjeiras, CEP 69054-718",
      neighborhood: "Parque das Laranjeiras",
      phone: "(92) 3308-4718",
      latitude: -3.0980,
      longitude: -60.0020,
      priestName: null,
      notes: "Confissão confirmada.",
      confessionSchedules: [
        { day: "Sábado", startTime: "16:00", endTime: "17:00" }
      ]
    },
    {
      name: "Paróquia Nossa Senhora Consoladora dos Aflitos",
      address: "Rua do Cruzeiro, nº 20 – Betânia, CEP 69073-020",
      neighborhood: "Betânia",
      phone: "(92) 3085-9937",
      latitude: -3.1321,
      longitude: -59.9997,
      priestName: null,
      notes: "Facebook: @NSConsoladora",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3085-9937" }
      ]
    },
    {
      name: "Paróquia Coração Imaculado de Maria",
      address: "Rua São Pedro, nº 820 – Morro da Liberdade, CEP 69074-730",
      neighborhood: "Morro da Liberdade",
      phone: "(92) 3624-1636",
      latitude: -3.1380,
      longitude: -60.0016,
      priestName: null,
      notes: "Facebook: @pcimcoracaoimaculadodemaria",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3624-1636" }
      ]
    },
    {
      name: "Paróquia São Francisco de Chagas",
      address: "Rua Filismino Soares, s/nº – Colônia Oliveira Machado, CEP 69070-620",
      neighborhood: "Colônia Oliveira Machado",
      phone: "(92) 3088-3173",
      latitude: -3.1486,
      longitude: -60.0022,
      priestName: null,
      notes: "Facebook: @ParoquiaSaoFranciscoDasChagas",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3088-3173" }
      ]
    },
    {
      name: "Paróquia Nossa Senhora de Guadalupe",
      address: "Av. Professor Nilton Lins, nº 510 – Flores, CEP 69058-030",
      neighborhood: "Flores",
      phone: "(92) 3877-1123",
      latitude: -3.0605,
      longitude: -60.0020,
      priestName: null,
      notes: "11 comunidades em Flores, Beija-Flor, Parque das Nações.",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3877-1123" }
      ]
    },
    {
      name: "Paróquia Nossa Senhora Aparecida (Alvorada)",
      address: "Av. \"C\", nº 30 – Alvorada I, CEP 69042-040",
      neighborhood: "Alvorada",
      phone: "(92) 3238-6670",
      latitude: -3.0821,
      longitude: -60.0383,
      priestName: null,
      notes: "Comunidades: Nossa Senhora do Rosário, Santo Antônio, São Mateus, São João Bosco.",
      confessionSchedules: [
        { day: "Consultar", startTime: "Ligar paróquia", endTime: "(92) 3238-6670" }
      ]
    },
  ]

  for (const churchData of churches) {
    const { confessionSchedules, ...church } = churchData
    await prisma.church.create({
      data: {
        ...church,
        confessionSchedules: {
          create: confessionSchedules
        }
      }
    })
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
