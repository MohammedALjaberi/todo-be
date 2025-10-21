import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

// Handle connection errors
prisma.$connect().catch((error) => {
  console.error("Failed to connect to database:", error);
});

export default prisma;
