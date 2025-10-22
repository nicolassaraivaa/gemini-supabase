"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/config/supabase";

function translateSupabaseError(message?: string) {
  const map: Record<string, string> = {
    "Invalid login credentials":
      "Credenciais inválidas. Verifique seu e-mail e senha.",
    "Invalid email or password": "E-mail ou senha inválidos.",
    "Email not confirmed":
      "E-mail não confirmado. Verifique sua caixa de entrada.",
    "User not found": "Usuário não encontrado.",
    "User already registered": "Este e-mail já está cadastrado.",
    "Password should be at least 8 characters":
      "A senha precisa ter pelo menos 8 caracteres.",
  };

  if (!message) return "Ocorreu um erro. Tente novamente.";
  return map[message] ?? message;
}

const formSchema = z.object({
  email: z.string().email("E-mail inválido. Tente novamente."),
  password: z
    .string("Senha inválida. Tente novamente.")
    .min(8, "A senha precisa ter pelo menos 8 caracteres."),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    try {
      if (
        !supabase ||
        typeof supabase.auth?.signInWithPassword !== "function"
      ) {
        console.error("Supabase client inválido:", supabase);
        toast.error(
          "Erro de configuração do cliente. Tente novamente mais tarde.",
        );
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(translateSupabaseError(error.message));
        return;
      }

      if (data?.user || data?.session) {
        toast.success("Login realizado com sucesso!");
        router.push("/");
        return;
      }

      toast.success("Login efetuado. Redirecionando...");
      router.push("/");
    } catch (err) {
      console.error("Erro no onSubmit (sign in):", err);
      toast.error("Ocorreu um erro inesperado. Tente novamente!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Faça login para continuar</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o seu email"
                        {...field}
                        type="email"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a sua senha"
                        {...field}
                        type="password"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
                Entrar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignInForm;
