import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testDb() {
  try {
    const users = await prisma.user.findMany();
    console.log("Usuarios:", users);
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDb();
