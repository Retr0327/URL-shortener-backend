/*
  Warnings:

  - A unique constraint covering the columns `[full_url]` on the table `short_urls` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[short_url]` on the table `short_urls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "short_urls_full_url_key" ON "short_urls"("full_url");

-- CreateIndex
CREATE UNIQUE INDEX "short_urls_short_url_key" ON "short_urls"("short_url");
