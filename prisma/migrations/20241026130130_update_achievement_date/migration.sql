-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_achievement_dates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "niccaId" TEXT NOT NULL,
    "achievedDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "achievement_dates_niccaId_fkey" FOREIGN KEY ("niccaId") REFERENCES "niccas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_achievement_dates" ("achievedDate", "createdAt", "id", "niccaId", "updatedAt") SELECT "achievedDate", "createdAt", "id", "niccaId", "updatedAt" FROM "achievement_dates";
DROP TABLE "achievement_dates";
ALTER TABLE "new_achievement_dates" RENAME TO "achievement_dates";
CREATE UNIQUE INDEX "achievement_dates_niccaId_achievedDate_key" ON "achievement_dates"("niccaId", "achievedDate");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
