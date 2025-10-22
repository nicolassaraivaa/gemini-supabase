import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

import prisma from "@/config/prisma";

import {
  LessonFormInput,
  LessonPlanOutput,
  lessonPlanSchemaObj,
} from "./shema";

const createClassPlansWithGemini = async (data: LessonFormInput) => {
  if (!data) {
    return NextResponse.json(
      { error: "Dados de entrada inválidos ou ausentes." },
      { status: 400 },
    );
  }

  const getPrompt = (): string => {
    return `
    Você é um Pedagogo Especialista em planejamento escolar e na Base Nacional Comum Curricular (BNCC) brasileira.

    SUA TAREFA:
    Gere um plano de aula completo e detalhado com base nas informações fornecidas pelo professor.
    O plano deve ser criativo, estruturado e focado em engajamento.

    INFORMAÇÕES FORNECIDAS PELO PROFESSOR:
    - TEMA DA AULA: "${data.teme}"
    - SÉRIE/ANO: "${data.series}"
    - COMPONENTE CURRICULAR: "${data.material}"
    - DURAÇÃO TOTAL ESTIMADA: ${data.duration} minutos.
    - RECURSOS DISPONÍVEIS: ${data.available_resources || "Nenhum recurso extra específico."}

    REQUISITOS OBRIGATÓRIOS DO PLANO (ATENÇÃO!):
    1. Introdução Lúdica: Crie uma atividade ou abordagem criativa para despertar o interesse inicial.
    2. Objetivo BNCC: Indique o código ou a descrição do Objetivo de Aprendizagem mais relevante da BNCC para o tema e a série.
    3. Passo a Passo: Divida a Duração Total Estimada em etapas (Aquecimento, Desenvolvimento e Conclusão), detalhando o tempo em minutos para cada. O total das etapas deve somar aproximadamente a Duração Total Estimada.
    4. Rubrica de Avaliação: Crie 2 a 3 critérios claros com pelo menos 3 níveis de desempenho (Ex: Iniciante, Intermediário, Avançado).

    FORMATO DE SAÍDA:
    A saída deve ser SOMENTE o objeto JSON, estritamente de acordo com o Schema JSON fornecido na requisição.
    Não inclua NENHUM texto, explicação ou nota fora do objeto JSON.
  `.trim();
  };

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    const prompt = getPrompt();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: lessonPlanSchemaObj,
      },
    });

    const jsonText =
      typeof response.text === "string" ? response.text.trim() : "";

    if (!jsonText) {
      console.error("Resposta da IA sem texto válido:", response);
      return NextResponse.json(
        {
          error: "A IA não retornou um texto válido. Tente novamente.",
          rawResponse: response,
        },
        { status: 500 },
      );
    }

    let planoJson: LessonPlanOutput;

    try {
      planoJson = JSON.parse(jsonText) as LessonPlanOutput;
    } catch (e) {
      console.error("Erro no parsing JSON da IA:", jsonText);
      return NextResponse.json(
        {
          error: "A IA retornou um formato inválido. Tente novamente.",
          rawResponse: jsonText,
        },
        { status: 500 },
      );
    }

    const newPlan = await prisma.classPlans.create({
      data: {
        user_id: data.userId,
        teme: data.teme,
        series: data.series,
        duration: data.duration,
        material: data.material,
        available_resources: data.available_resources,
        plano_json: planoJson,
      },
      select: {
        id: true,
        teme: true,
        series: true,
        plano_json: true,
        created_at: true,
        user_id: true,
      },
    });

    return NextResponse.json(newPlan, { status: 200 });
  } catch (error) {
    console.error("Erro geral na API:", error);
    return NextResponse.json(
      {
        error:
          "Falha ao processar o plano de aula. Verifique o servidor e o banco de dados.",
      },
      { status: 500 },
    );
  }
};

export default createClassPlansWithGemini;
