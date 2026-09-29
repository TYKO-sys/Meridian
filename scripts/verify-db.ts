import { db } from '../src/lib/db'

async function main() {
  const rows = await db.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
    select: { id: true, name: true, email: true, message: true, createdAt: true },
  })
  console.log(JSON.stringify(rows, null, 2))
  await (db as unknown as { $disconnect: () => Promise<void> }).$disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
