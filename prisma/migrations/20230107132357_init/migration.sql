/*
  Warnings:

  - Added the required column `chatId` to the `MessageNotification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `messagenotification` ADD COLUMN `chatId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `MessageNotification` ADD CONSTRAINT `MessageNotification_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
