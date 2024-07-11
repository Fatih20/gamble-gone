import { prisma } from "../prisma";
import { getZodParsingErrorFields } from "../zod";
import { ValidateUsernameSchema } from "@/schema/auth";
import { Prisma } from "@prisma/client";

async function getUserPoints(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      totalPoints: true,
    },
  });

  return user?.totalPoints ?? 0;
}
async function getUserProfile(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      birthDate: true,
      gamblingStory: true,
      name: true,
      username: true,
      gender: true,
      gamblingDuration: true,
      whyStop: true,
      id: true,
      password: false,
    },
  });
}
const isUsernameAvailable = async (username: string) => {
  const parseResult = ValidateUsernameSchema.safeParse({ username });

  if (!parseResult.success) {
    const errorFields = getZodParsingErrorFields(parseResult);
    return {
      success: false,
      message: "Validasi request body gagal",
      errorFields,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      return {
        success: false,
        message: "Username sudah digunakan",
        fields: [
          {
            field: "username",
            message: "Username sudah digunakan",
          },
        ],
      };
    }

    return { success: true, message: "Username tersedia" };
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        message: e.message,
      };
    } else if (typeof e === "string") {
      return {
        success: false,
        message: e,
      };
    } else {
      return {
        success: false,
        message: "Terjadi kesalahan",
      };
    }
  }
};
export { getUserProfile, isUsernameAvailable, getUserPoints };
