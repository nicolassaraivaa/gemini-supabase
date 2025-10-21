import { z } from "zod";

export const lessonPlanFormSchema = z.object({
  teme: z.string().min(1, "O tema da aula é obrigatório"),
  series: z.string().min(1, "A série ou ano é obrigatório"),
  material: z.string().min(1, "A matéria escolar é obrigatório"),
  duration: z.number().min(1, "A duração estimada é obrigatória"),
  available_resources: z
    .string()
    .min(1, "O campo de recursos disponíveis é obrigatório"),
});

export type LessonPlanFormValues = z.infer<typeof lessonPlanFormSchema>;
