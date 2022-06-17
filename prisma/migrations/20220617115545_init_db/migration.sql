-- CreateTable
CREATE TABLE "short_urls" (
    "id" SERIAL NOT NULL,
    "full_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "total_click" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expire" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "short_urls_pkey" PRIMARY KEY ("id")
);
