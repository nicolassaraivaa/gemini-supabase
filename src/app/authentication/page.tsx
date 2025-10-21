"use client";

import { GraduationCap, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { supabase } from "@/config/createClientSupabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            className="h-12 w-12 animate-spin text-blue-600"
            aria-hidden
          />
          <p className="text-sm text-gray-600">Carregando...</p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center p-8 max-sm:mt-10 max-sm:justify-start lg:w-1/2">
        <div className="mb-10 flex flex-col items-center max-sm:mb-8">
          <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-blue-800 shadow-lg md:h-12 md:w-12 md:rounded-2xl">
            <GraduationCap className="h-8 w-8 text-white md:h-7 md:w-7" />
          </div>{" "}
          <p className="text-muted-foreground mt-5 max-w-2/3 text-center text-sm max-sm:max-w-[80%]">
            Olá, seja bem-vindo! Faça login ou crie sua conta e faça parte do
            EducaGenius!
          </p>
        </div>

        <div className="w-full max-w-md">
          <Tabs defaultValue="sign-in" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Entrar</TabsTrigger>
              <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in" className="mt-3">
              <SignInForm />
            </TabsContent>
            <TabsContent value="sign-up" className="mt-3">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
