import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log("Prisma connected successfully ✅");
  } catch (error) {
    console.error("🚨 Error connecting to Prisma:", error);
  }
};

export default prisma;
