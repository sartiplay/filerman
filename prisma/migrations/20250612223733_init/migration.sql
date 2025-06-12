-- CreateEnum
CREATE TYPE "FileSessionType" AS ENUM ('EMAIL', 'LINK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "metadata" JSONB,
    "fileSessionId" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "FileSessionType" NOT NULL DEFAULT 'LINK',
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FileSessionAllowList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FileSessionAllowList_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "File_URL_key" ON "File"("URL");

-- CreateIndex
CREATE INDEX "_FileSessionAllowList_B_index" ON "_FileSessionAllowList"("B");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_fileSessionId_fkey" FOREIGN KEY ("fileSessionId") REFERENCES "FileSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileSession" ADD CONSTRAINT "FileSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileSessionAllowList" ADD CONSTRAINT "_FileSessionAllowList_A_fkey" FOREIGN KEY ("A") REFERENCES "FileSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileSessionAllowList" ADD CONSTRAINT "_FileSessionAllowList_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
