-- CreateTable
CREATE TABLE IF NOT EXISTS "StackAudit" (
    "id" TEXT NOT NULL,
    "stackName" TEXT,
    "stackType" TEXT NOT NULL,
    "stackYaml" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "valid" BOOLEAN NOT NULL,
    "resultJson" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StackAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "CodeAudit" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "codeContent" TEXT NOT NULL,
    "qualityScore" INTEGER NOT NULL,
    "securityScore" INTEGER NOT NULL,
    "performanceScore" INTEGER NOT NULL,
    "avgScore" INTEGER NOT NULL,
    "issues" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeAudit_pkey" PRIMARY KEY ("id")
);
