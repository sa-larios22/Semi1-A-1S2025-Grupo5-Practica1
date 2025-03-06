import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan@example.com",
      password: "supersegura",
      birthDate: new Date("1990-01-01"),
    },
  });
  console.log(user);
}

main().catch(console.error);
