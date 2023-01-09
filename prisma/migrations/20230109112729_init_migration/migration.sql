-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "image" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Songs" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "albumID" INTEGER NOT NULL,

    CONSTRAINT "Songs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Songs" ADD CONSTRAINT "Songs_albumID_fkey" FOREIGN KEY ("albumID") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
