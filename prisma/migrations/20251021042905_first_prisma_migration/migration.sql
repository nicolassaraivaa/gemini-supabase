-- CreateTable
CREATE TABLE "public"."class_" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "teme" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "material" TEXT NOT NULL,
    "available_resources" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plano_json" JSONB NOT NULL,

    CONSTRAINT "class__pkey" PRIMARY KEY ("id")
);
