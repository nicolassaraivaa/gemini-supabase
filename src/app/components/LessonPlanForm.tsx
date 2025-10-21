"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  lessonPlanFormSchema,
  LessonPlanFormValues,
} from "@/schema/lessonPlanSchema";

type FormValues = LessonPlanFormValues;

export default function LessonPlanForm() {
  const handleSubmit = (values: FormValues) => {
    console.log("Form submitted", values);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(lessonPlanFormSchema),
    defaultValues: {
      available_resources: "",
      material: "",
      duration: 60,
      series: "",
      teme: "",
    },
  });

  return (
    <Card className="h-full border-none bg-white/95 shadow-2xl backdrop-blur">
      <CardHeader className="space-y-1 border-b border-blue-100 px-4 pt-4 pb-4 md:px-6 md:pt-6 md:pb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-700 shadow-lg md:h-12 md:w-12 md:rounded-2xl">
            <BookOpen className="h-5 w-5 text-white md:h-6 md:w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 md:text-2xl">
              Defina Seu Plano de Aula
            </CardTitle>
            <p className="mt-0.5 text-xs text-gray-500 md:mt-1 md:text-sm">
              Preencha os campos e deixe a IA criar seu plano
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pt-4 pb-4 md:px-6 md:pt-8 md:pb-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 md:space-y-6"
          >
            {/* TEMA DA AULA */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="teme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 md:text-sm">
                      Tema da Aula <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Sistema Solar e suas características"
                        className="h-10 border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500/20 md:h-12 md:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* SÉRIE OU ANO */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="series"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 md:text-sm">
                      Série ou Ano <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 5º Ano do Ensino Fundamental"
                        className="h-10 border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500/20 md:h-12 md:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* COMPONENTE CURRICULAR */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 md:text-sm">
                      Matéria escolar <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Ciências"
                        className="h-10 border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500/20 md:h-12 md:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* DURAÇÃO ESTIMADA */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 md:text-sm">
                      Duração Estimada (minutos){" "}
                      <span className="text-red-500">*</span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 60"
                        className="h-10 border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500/20 md:h-12 md:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* RECURSOS DISPONÍVEIS */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="available_resources"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-gray-700 md:text-sm">
                      Recursos Disponíveis
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Massinha, Lousa, Projeção, Computadores, etc."
                        className="min-h-[80px] resize-none border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500/20 md:min-h-[100px] md:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-linear-to-r from-blue-600 to-blue-700 text-sm font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/40 md:h-14 md:text-base"
            >
              <Sparkles className="mr-2 h-4 w-4 md:mr-3 md:h-5 md:w-5" />
              <span className="hidden sm:inline">Gerar Plano com IA</span>
              <span className="sm:hidden">Gerar com IA</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
