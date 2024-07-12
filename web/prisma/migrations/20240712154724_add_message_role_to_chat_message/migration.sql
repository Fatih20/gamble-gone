/*
  Warnings:

  - Added the required column `role` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChatRoleType" AS ENUM ('user', 'ai');

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "role" "ChatRoleType" NOT NULL;
