"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Header from "@/components/common/Header";
import { supabase } from "@/config/supabase";

import LessonPlanForm from "./components/LessonPlanForm";
import LessonPlanResult from "./components/LessonPlanResult";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  const [generating, setGenerating] = useState(false);
  const [iaResult, setIaResult] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userName = session?.user?.user_metadata?.name;
      setName(userName);

      const userEmail = session?.user?.user_metadata?.email;
      setEmail(userEmail);

      const userId = session?.user?.id;
      setId(userId || null);

      if (!session?.access_token) {
        router.push("/authentication");
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50">
      <Header name={name} email={email} />
      <main className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <div>
            <LessonPlanForm
              id={id}
              onGenerating={(v) => setGenerating(v)}
              onResult={(res) => {
                const text =
                  (res && (res.result || res.text || res.content)) ??
                  (typeof res === "string" ? res : JSON.stringify(res));
                setIaResult(String(text));
              }}
            />
          </div>

          <div>
            <LessonPlanResult generating={generating} result={iaResult} />
          </div>
        </div>
      </main>
    </div>
  );
}
