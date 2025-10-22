import { Type } from "@google/genai";

export type LessonFormInput = {
  teme: string;
  series: string;
  material: string;
  duration: number;
  available_resources?: string;
  userId: string;
};

export type LessonPlanOutput = {
  introducao_ludica: string;
  objetivo_bncc: string;
  passo_a_passo: Array<{
    etapa: string;
    descricao: string;
    tempo_estimado_minutos: number;
  }>;
  rubrica_avaliacao: Array<{
    criterio: string;
    niveis: Array<{
      nivel: string;
      descricao_evidencia: string;
    }>;
  }>;
};

export type CompleteLessonPlan = {
  id: string;
  user_id: string;
  created_at: Date;
  teme: string;
  series: string;
  material: string;
  duration: number;
  available_resources?: string;
  plano_json: LessonPlanOutput;
};

export const lessonPlanSchemaObj = {
  type: Type.OBJECT,
  properties: {
    introducao_ludica: {
      type: Type.STRING,
      description:
        "Uma introdução criativa e motivadora para iniciar a aula, de forma lúdica.",
    },
    objetivo_bncc: {
      type: Type.STRING,
      description:
        "O objetivo de aprendizagem principal, alinhado à Base Nacional Comum Curricular (BNCC).",
    },
    passo_a_passo: {
      type: Type.ARRAY,
      description:
        "Uma sequência detalhada de etapas para guiar o professor na execução da atividade.",
      items: {
        type: Type.OBJECT,
        properties: {
          etapa: { type: Type.STRING },
          descricao: { type: Type.STRING },
          tempo_estimado_minutos: { type: Type.INTEGER },
        },
        required: ["etapa", "descricao", "tempo_estimado_minutos"],
      },
    },
    rubrica_avaliacao: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          criterio: { type: Type.STRING },
          niveis: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                nivel: { type: Type.STRING },
                descricao_evidencia: { type: Type.STRING },
              },
              required: ["nivel", "descricao_evidencia"],
            },
          },
        },
        required: ["criterio", "niveis"],
      },
    },
  },
  required: [
    "introducao_ludica",
    "objetivo_bncc",
    "passo_a_passo",
    "rubrica_avaliacao",
  ],
};
