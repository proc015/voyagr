-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_activityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tripId_fkey";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "picture_src" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "end_date" DROP NOT NULL,
ALTER COLUMN "picture_src" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "display_name" DROP NOT NULL,
ALTER COLUMN "display_pic_src" DROP NOT NULL,
ALTER COLUMN "tripId" DROP NOT NULL,
ALTER COLUMN "activityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("trip_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activity_id") ON DELETE SET NULL ON UPDATE CASCADE;
