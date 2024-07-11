import { prisma } from "../prisma";
import {
  tugas3Poin,
  tugas4Poin,
  tugas5Poin,
  tugas6Poin,
} from "@/mock-data/tasks";
import { Prisma } from "@prisma/client";
import moment from "moment-timezone";

const TIMEZONE = "Asia/Jakarta"; // Set the timezone to Jakarta

const getStartAndEndOfDay = () => {
  const startOfToday = moment().tz(TIMEZONE).startOf("day").toDate();
  const endOfToday = moment().tz(TIMEZONE).endOf("day").toDate();
  return { startOfToday, endOfToday };
};

const getStartAndEndOfWeek = () => {
  const startOfWeek = moment().tz(TIMEZONE).startOf("week").toDate();
  const endOfWeek = moment().tz(TIMEZONE).endOf("week").toDate();
  return { startOfWeek, endOfWeek };
};

const selectTaskFields = {
  id: true,
  taskName: true,
  taskPoints: true,
  taskDescription: true,
  taskStatus: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
};

async function getUserTasksForToday(userId: string) {
  const { startOfToday, endOfToday } = getStartAndEndOfDay();

  try {
    const res = await prisma.dailyTask.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: selectTaskFields,
    });

    if (res.length > 0) {
      return res;
    } else {
      // Create dummy data for today
      const tasksToCreate = [
        tugas3Poin,
        tugas4Poin,
        tugas5Poin,
        tugas6Poin,
      ].map((tugas) => {
        const randomIndex = Math.floor(Math.random() * 3);
        const { taskName, taskPoints, taskDescription } = tugas[randomIndex];
        return { taskName, taskPoints, taskDescription, userId };
      });

      await prisma.dailyTask.createMany({
        data: tasksToCreate,
      });

      // Retrieve and return the newly created tasks
      const newTasks = await prisma.dailyTask.findMany({
        where: {
          userId,
          createdAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },

        select: selectTaskFields,
      });

      return newTasks;
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Failed to fetch tasks: " + error.message);
    } else {
      throw new Error("An unexpected error occurred: " + error);
    }
  }
}

async function getWeeklyHistory(userId: string) {
  const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();
  let pointsMade = 0;
  let taskCompleted = 0;
  let taskFailed = 0;

  try {
    const res = await prisma.dailyTask.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
      orderBy: [
        { taskStatus: "asc" }, // Sort by taskStatus (completed first)
        { createdAt: "desc" },
      ],
      select: selectTaskFields,
    });

    res.forEach((task) => {
      if (task.taskStatus) {
        taskCompleted += 1;
        pointsMade += task.taskPoints;
      } else {
        taskFailed += 1;
      }
    });

    return res.length > 0
      ? { res, taskCompleted, pointsMade, taskFailed }
      : { res: [], taskCompleted: 0, pointsMade: 0, taskFailed: 0 };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Failed to fetch tasks: " + error.message);
    } else {
      throw new Error("An unexpected error occurred: " + error);
    }
  }
}

export { getUserTasksForToday, getWeeklyHistory };
