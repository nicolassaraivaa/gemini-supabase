import { z } from "zod";

export const lessonPlanFormSchema = z.object({
  teme: z.string().min(1, "O tema da aula é obrigatório"),
  series: z.string().min(1, "A série ou ano é obrigatório"),
  material: z.string().min(1, "A matéria escolar é obrigatório"),
  duration: z
    .number("Digite um numero!")
    .min(15, "A duração minima é de 15 minutos.")
    .max(380, "A duração máxima é de 380 minutos."),
  available_resources: z.string().optional(),
});

export type LessonPlanFormValues = z.infer<typeof lessonPlanFormSchema>;
