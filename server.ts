import dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma";

// Load environment variables
dotenv.config();

const prisma = new PrismaClient({
  log: ["error", "warn", "info"],
  datasources: {
    db: {
      url: process.env.NEXT_PUBLIC_DATABASE_URL,
    },
  },
});

async function main() {
  try {
    console.log("🔍 Testing MongoDB Connection...\n");

    // Test connection
    await prisma.$connect();
    console.log("✅ Successfully connected to MongoDB!\n");

    // Create a sample task
    console.log("📝 Creating a sample task...");
    const newTask = await prisma.task.create({
      data: {
        title: "Test Task from server.ts",
        description: "This is a test task to verify database connection",
        status: "TODO",
      },
    });
    console.log("✅ Created new task:", newTask);

    // Fetch all tasks
    console.log("\n📋 Fetching all tasks...");
    const allTasks = await prisma.task.findMany();
    console.log(`✅ Found ${allTasks.length} tasks:`, allTasks);

    console.log("\n✅ All operations completed successfully!");
  } catch (error: any) {
    console.error("\n❌ Error occurred:");
    console.error("Message:", error.message);
    console.error("Code:", error.code);

    if (error.message.includes("Server selection timeout")) {
      console.error("\n🔧 Connection Issue Detected!");
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
    console.log("\n🔌 Disconnected from database.");
  }
}

main();
