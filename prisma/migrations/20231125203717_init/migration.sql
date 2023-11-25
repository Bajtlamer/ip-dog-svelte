-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "hostname" TEXT,
    "description" TEXT,
    "subnetId" INTEGER NOT NULL,
    CONSTRAINT "Device_subnetId_fkey" FOREIGN KEY ("subnetId") REFERENCES "Subnet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("address", "description", "hostname", "id", "subnetId") SELECT "address", "description", "hostname", "id", "subnetId" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE UNIQUE INDEX "Device_address_key" ON "Device"("address");
CREATE TABLE "new_Subnet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subnet" TEXT NOT NULL,
    "description" TEXT,
    "serverId" INTEGER NOT NULL,
    CONSTRAINT "Subnet_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Subnet" ("description", "id", "serverId", "subnet") SELECT "description", "id", "serverId", "subnet" FROM "Subnet";
DROP TABLE "Subnet";
ALTER TABLE "new_Subnet" RENAME TO "Subnet";
CREATE UNIQUE INDEX "Subnet_subnet_key" ON "Subnet"("subnet");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
