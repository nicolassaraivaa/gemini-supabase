/* eslint-disable react/no-unescaped-entities */
"use client";

import { BookOpen, Loader2 } from "lucide-react";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Passo {
  etapa: string;
  descricao: string;
  tempo_estimado_minutos: number;
}

interface Nivel {
  nivel: string;
  descricao_evidencia: string;
}

interface Rubrica {
  criterio: string;
  niveis: Nivel[];
}

interface PlanoJSON {
  objetivo_bncc: string;
  passo_a_passo: Passo[];
  introducao_ludica: string;
  rubrica_avaliacao: Rubrica[];
}

interface ResultData {
  id: string;
  teme: string;
  series: string;
  plano_json: PlanoJSON;
}

interface LessonPlanResultProps {
  generating: boolean;
  result: string | null;
}

export default function LessonPlanResult({
  generating,
  result,
}: LessonPlanResultProps) {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const centered = !result;

  return (
    <Card className="h-full w-full border-none bg-linear-to-br from-gray-50 to-blue-50/30 shadow-2xl">
      <CardContent
        className={
          centered
            ? "flex h-full min-w-0 flex-col items-center justify-center px-4 py-8 text-center md:px-8 md:py-20"
            : "flex h-full min-w-0 flex-col items-start justify-start px-4 py-8 text-left md:px-8 md:py-20"
        }
      >
        {!result && (
          <>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-blue-200 md:mb-6 md:h-24 md:w-24">
              <BookOpen className="h-8 w-8 text-blue-600 md:h-12 md:w-12" />
            </div>

            <h3 className="mb-2 text-xl font-bold text-gray-900 md:mb-3 md:text-2xl">
              {generating ? "Gerando seu plano..." : "Pronto para começar?"}
            </h3>

            {!generating && (
              <p className="max-w-full text-sm leading-relaxed text-gray-600 md:text-base">
                Preencha o formulário {isMobile ? "acima" : "ao lado"} e clique
                em "Gerar Plano com IA" para criar um plano de aula
                personalizado e estruturado.
              </p>
            )}
          </>
        )}

        {generating && !result && (
          <div className="mt-6 flex w-full flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">
              Aguarde enquanto a IA gera o plano...
            </p>
          </div>
        )}

        {result && (
          <div className="mt-6 w-full min-w-0">
            <ScrollArea className="h-[50vh] w-full rounded-md border border-gray-100 bg-white md:h-[70vh]">
              <div className="p-4 text-gray-700">
                {(() => {
                  const data: ResultData =
                    typeof result === "string" ? JSON.parse(result) : result;
                  const plano = data.plano_json;

                  return (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          Tema:
                        </h4>
                        <p>{data.teme}</p>
                        <h4 className="mt-2 text-lg font-bold text-gray-900">
                          Série:
                        </h4>
                        <p>{data.series}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          Introdução Lúdica:
                        </h4>
                        <p>{plano.introducao_ludica}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          Objetivo BNCC:
                        </h4>
                        <p>{plano.objetivo_bncc}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          Passo a Passo:
                        </h4>
                        <ol className="list-inside list-decimal space-y-2">
                          {plano.passo_a_passo.map(
                            (passo: Passo, index: number) => (
                              <li key={index}>
                                <p className="font-semibold">
                                  {passo.etapa} ({passo.tempo_estimado_minutos}{" "}
                                  min)
                                </p>
                                <p>{passo.descricao}</p>
                              </li>
                            ),
                          )}
                        </ol>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          Rubrica de Avaliação:
                        </h4>
                        {plano.rubrica_avaliacao.map(
                          (rubrica: Rubrica, i: number) => (
                            <div key={i} className="mt-2">
                              <p className="font-semibold">
                                {rubrica.criterio}
                              </p>
                              <ul className="ml-4 list-inside list-disc">
                                {rubrica.niveis.map(
                                  (nivel: Nivel, j: number) => (
                                    <li key={j}>
                                      <span className="font-semibold">
                                        {nivel.nivel}:
                                      </span>{" "}
                                      {nivel.descricao_evidencia}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
