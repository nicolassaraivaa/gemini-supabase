import { NextRequest, NextResponse } from "next/server";

import createClassPlansWithGemini from "@/actions/create-classPlans.ts";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const response = await createClassPlansWithGemini(data);
    return response;
  } catch (error) {
    console.error("Erro na API /classPlans:", error);
    return NextResponse.json({ error: "Erro ao criar plano" }, { status: 500 });
  }
}
