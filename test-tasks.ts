import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function testTaskModel() {
  try {
    console.log("🧪 Testing Task Model...\n");

    // 1. Create a new task
    console.log("1. Creating a new task...");
    const newTask = await prisma.task.create({
      data: {
        title: "Complete project documentation",
        description:
          "Write comprehensive documentation for the todo backend API",
        status: "TODO",
      },
    });
    console.log("✅ Created task:", newTask);
    console.log();

    // 2. Create another task with different status
    console.log("2. Creating a task with IN_PROGRESS status...");
    const inProgressTask = await prisma.task.create({
      data: {
        title: "Implement user authentication",
        description: "Add JWT-based authentication system",
        status: "IN_PROGRESS",
      },
    });
    console.log("✅ Created task:", inProgressTask);
    console.log();

    // 3. Fetch all tasks
    console.log("3. Fetching all tasks...");
    const allTasks = await prisma.task.findMany();
    console.log("✅ All tasks:", allTasks);
    console.log();

    // 4. Update a task status
    console.log("4. Updating task status to COMPLETED...");
    const updatedTask = await prisma.task.update({
      where: { id: newTask.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });
    console.log("✅ Updated task:", updatedTask);
    console.log();

    // 5. Find tasks by status
    console.log("5. Finding tasks with TODO status...");
    const todoTasks = await prisma.task.findMany({
      where: { status: "TODO" },
    });
    console.log("✅ TODO tasks:", todoTasks);
    console.log();

    // 6. Find a specific task by ID
    console.log("6. Finding task by ID...");
    const foundTask = await prisma.task.findUnique({
      where: { id: inProgressTask.id },
    });
    console.log("✅ Found task:", foundTask);
    console.log();

    // 7. Count total tasks
    console.log("7. Counting total tasks...");
    const taskCount = await prisma.task.count();
    console.log("✅ Total tasks:", taskCount);
    console.log();

    // 8. Delete a task
    console.log("8. Deleting a task...");
    const deletedTask = await prisma.task.delete({
      where: { id: newTask.id },
    });
    console.log("✅ Deleted task:", deletedTask);
    console.log();

    // 9. Verify deletion
    console.log("9. Verifying deletion - fetching all tasks...");
    const remainingTasks = await prisma.task.findMany();
    console.log("✅ Remaining tasks:", remainingTasks);

    console.log("\n🎉 All Task model tests completed successfully!");
  } catch (error) {
    console.error("❌ Error testing Task model:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testTaskModel();
