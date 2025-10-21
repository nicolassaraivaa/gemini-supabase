/* eslint-disable react/no-unescaped-entities */
"use client";

import { BookOpen } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

export default function LessonPlanResult() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Card className="h-full border-none bg-linear-to-br from-gray-50 to-blue-50/30 shadow-2xl">
      <CardContent className="flex h-full flex-col items-center justify-center px-6 py-12 text-center md:px-8 md:py-20">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-blue-200 md:mb-6 md:h-24 md:w-24">
          <BookOpen className="h-10 w-10 text-blue-600 md:h-12 md:w-12" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900 md:mb-3 md:text-2xl">
          Pronto para começar?
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-gray-600 md:text-base">
          Preencha o formulário {isMobile ? "acima" : "ao lado"} e clique em
          "Gerar Plano com IA" para criar um plano de aula personalizado e
          estruturado.
        </p>
      </CardContent>
    </Card>
  );

  //   return (
  //     <Card className="h-full overflow-hidden border-none bg-white shadow-2xl">
  //       <CardHeader className="border-b-4 border-green-500 bg-gradient-to-r from-blue-600 to-blue-700 px-4 pt-4 pb-4 text-white md:px-6 md:pt-6 md:pb-6">
  //         <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4">
  //           <div className="w-full flex-1">
  //             <div className="mb-2 flex items-center gap-2">
  //               <Badge className="bg-green-500 px-2 py-0.5 text-xs font-semibold text-white hover:bg-green-600 md:px-3 md:py-1">
  //                 <CheckCircle className="mr-1 h-3 w-3" />
  //                 Gerado com IA
  //               </Badge>
  //             </div>
  //             <CardTitle className="mb-2 text-lg font-bold break-words md:mb-3 md:text-2xl">
  //               {plan.theme}
  //             </CardTitle>
  //             <div className="flex flex-wrap gap-2 text-xs md:gap-3 md:text-sm">
  //               <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-1 md:gap-2 md:px-3 md:py-1.5">
  //                 <BookOpen className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
  //                 <span className="truncate">{plan.subject}</span>
  //               </div>
  //               <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-1 md:gap-2 md:px-3 md:py-1.5">
  //                 <Clock className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
  //                 <span>{plan.duration} min</span>
  //               </div>
  //               <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-1 md:gap-2 md:px-3 md:py-1.5">
  //                 <span className="truncate">{plan.grade}</span>
  //               </div>
  //             </div>
  //           </div>
  //           <Button
  //             onClick={onSave}
  //             disabled={isSaving}
  //             className="h-10 w-full bg-green-500 text-sm text-white shadow-lg hover:bg-green-600 sm:w-auto md:h-auto md:text-base"
  //           >
  //             <Save className="mr-2 h-4 w-4" />
  //             {isSaving ? "Salvando..." : "Salvar"}
  //           </Button>
  //         </div>
  //       </CardHeader>

  //       <CardContent className="max-h-[calc(100vh-280px)] space-y-6 overflow-y-auto p-4 md:max-h-[calc(100vh-250px)] md:space-y-8 md:p-8">
  //         {plan.objectives && (
  //           <section className="space-y-3">
  //             <div className="mb-3 flex items-center gap-2 md:mb-4 md:gap-3">
  //               <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 md:h-10 md:w-10 md:rounded-xl">
  //                 <Target className="h-4 w-4 text-white md:h-5 md:w-5" />
  //               </div>
  //               <h3 className="text-base font-bold text-gray-900 md:text-xl">
  //                 Objetivos de Aprendizagem
  //               </h3>
  //             </div>
  //             <div className="prose prose-sm max-w-none pl-0 text-sm leading-relaxed text-gray-700 md:pl-13 md:text-base">
  //               <ReactMarkdown>{plan.objectives}</ReactMarkdown>
  //             </div>
  //           </section>
  //         )}

  //         {plan.bncc_skills && (
  //           <section className="space-y-3">
  //             <div className="mb-3 flex items-center gap-2 md:mb-4 md:gap-3">
  //               <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 md:h-10 md:w-10 md:rounded-xl">
  //                 <TrendingUp className="h-4 w-4 text-white md:h-5 md:w-5" />
  //               </div>
  //               <h3 className="text-base font-bold text-gray-900 md:text-xl">
  //                 Competências BNCC
  //               </h3>
  //             </div>
  //             <div className="prose prose-sm max-w-none pl-0 text-sm leading-relaxed text-gray-700 md:pl-13 md:text-base">
  //               <ReactMarkdown>{plan.bncc_skills}</ReactMarkdown>
  //             </div>
  //           </section>
  //         )}

  //         {plan.introduction && (
  //           <section className="space-y-3">
  //             <div className="mb-3 flex items-center gap-2 md:mb-4 md:gap-3">
  //               <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 md:h-10 md:w-10 md:rounded-xl">
  //                 <Lightbulb className="h-4 w-4 text-white md:h-5 md:w-5" />
  //               </div>
  //               <h3 className="text-base font-bold text-gray-900 md:text-xl">
  //                 Introdução
  //               </h3>
  //             </div>
  //             <div className="prose prose-sm max-w-none pl-0 text-sm leading-relaxed text-gray-700 md:pl-13 md:text-base">
  //               <ReactMarkdown>{plan.introduction}</ReactMarkdown>
  //             </div>
  //           </section>
  //         )}

  //         {plan.development && (
  //           <section className="space-y-3">
  //             <div className="mb-3 flex items-center gap-2 md:mb-4 md:gap-3">
  //               <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 md:h-10 md:w-10 md:rounded-xl">
  //                 <BookOpen className="h-4 w-4 text-white md:h-5 md:w-5" />
  //               </div>
  //               <h3 className="text-base font-bold text-gray-900 md:text-xl">
  //                 Desenvolvimento
  //               </h3>
  //             </div>
  //             <div className="prose prose-sm max-w-none pl-0 text-sm leading-relaxed text-gray-700 md:pl-13 md:text-base">
  //               <ReactMarkdown>{plan.development}</ReactMarkdown>
  //             </div>
  //           </section>
  //         )}

  //         {plan.conclusion && (
  //           <section className="space-y-3">
  //             <div className="mb-3 flex items-center gap-2 md:mb-4 md:gap-3">
  //               <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 md:h-10 md:w-10 md:rounded-xl">
  //                 <CheckCircle className="h-4 w-4 text-white md:h-5 md:w-5" />
  //               </div>
  //               <h3 className="text-base font-bold text-gray-900 md:text-xl">
  //                 Conclusão e Avaliação
  //               </h3>
  //             </div>
  //             <div className="prose prose-sm max-w-none pl-0 text-sm leading-relaxed text-gray-700 md:pl-13 md:text-base">
  //               <ReactMarkdown>{plan.conclusion}</ReactMarkdown>
  //             </div>
  //           </section>
  //         )}
  //       </CardContent>
  //     </Card>
  //   );
}
