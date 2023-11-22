/*
  Warnings:

  - Made the column `subnet` on table `Subnet` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subnet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subnet" TEXT NOT NULL,
    "description" TEXT,
    "serverId" INTEGER NOT NULL,
    CONSTRAINT "Subnet_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subnet" ("description", "id", "serverId", "subnet") SELECT "description", "id", "serverId", "subnet" FROM "Subnet";
DROP TABLE "Subnet";
ALTER TABLE "new_Subnet" RENAME TO "Subnet";
CREATE UNIQUE INDEX "Subnet_subnet_key" ON "Subnet"("subnet");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
