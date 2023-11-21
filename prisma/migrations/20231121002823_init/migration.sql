-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT,
    "email" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT
);

-- CreateTable
CREATE TABLE "Server" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "description" TEXT,
    "username" TEXT,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "Subnet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subnet" TEXT,
    "description" TEXT,
    "serverId" INTEGER NOT NULL,
    CONSTRAINT "Subnet_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "hostname" TEXT,
    "description" TEXT,
    "subnetId" INTEGER NOT NULL,
    CONSTRAINT "Device_subnetId_fkey" FOREIGN KEY ("subnetId") REFERENCES "Subnet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Server_name_key" ON "Server"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subnet_subnet_key" ON "Subnet"("subnet");

-- CreateIndex
CREATE UNIQUE INDEX "Device_address_key" ON "Device"("address");
