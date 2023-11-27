-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_tripId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "tripId" DROP NOT NULL,
ALTER COLUMN "activityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "start_lat_lon" SET DATA TYPE DECIMAL(65,30)[],
ALTER COLUMN "dest_lat_lon" SET DATA TYPE DECIMAL(65,30)[];

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("trip_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activity_id") ON DELETE SET NULL ON UPDATE CASCADE;
