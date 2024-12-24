/*
  Warnings:

  - A unique constraint covering the columns `[product_id,user_id]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id,user_id]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Orders_product_id_user_id_key" ON "Orders"("product_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_product_id_user_id_key" ON "Reviews"("product_id", "user_id");
