import dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma";

dotenv.config();

const prisma = new PrismaClient({
  log: ["error", "warn", "info"],
});

async function main() {
  try {
    console.log("Testing MongoDB Connection...\n");

    await prisma.$connect();
    console.log("Successfully connected to MongoDB!\n");

    console.log("Creating a sample task...");
    const newTask = await prisma.task.create({
      data: {
        title: "Test Task from server.ts",
        description: "This is a test task to verify database connection",
        status: "TODO",
      },
    });
    console.log("Created new task:", newTask);

    console.log("\nFetching all tasks...");
    const allTasks = await prisma.task.findMany();
    console.log(`Found ${allTasks.length} tasks:`, allTasks);

    console.log("\nAll operations completed successfully!");
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("\nError occurred:");
    console.error("Message:", message);

    if (message.includes("Server selection timeout")) {
      console.error("\nConnection Issue Detected!");
      console.error("Please check:");
      console.error("1. MongoDB Atlas Network Access - whitelist your IP");
      console.error("2. Cluster is running (not paused)");
      console.error("3. DATABASE_URL in .env is correct");
      console.error(
        "4. Try updating connection string with: ?retryWrites=true&w=majority&tls=true"
      );
    }
  } finally {
    await prisma.$disconnect();
    console.log("\nDisconnected from database.");
  }
}

main();
