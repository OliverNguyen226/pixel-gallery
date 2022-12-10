/*
  Warnings:

  - Added the required column `title` to the `PixelArt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PixelArt" ADD COLUMN     "title" TEXT NOT NULL;
