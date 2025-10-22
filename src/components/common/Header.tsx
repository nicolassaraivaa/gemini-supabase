import { ChevronDown, GraduationCap, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/config/supabase";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface HeaderProps {
  name: string | null;
  email: string | null;
}

const Header = ({ name, email }: HeaderProps) => {
  const route = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-blue-800 shadow-lg md:h-12 md:w-12 md:rounded-2xl">
              <GraduationCap className="h-6 w-6 text-white md:h-7 md:w-7" />
            </div>
            <div>
              <h1 className="bg-linear-to-r from-blue-700 to-blue-900 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
                EducaGenius
              </h1>
              <p className="hidden text-xs text-gray-600 sm:block md:text-sm">
                Planos de Aula com Inteligência Artificial
              </p>
            </div>
          </div>
          <div>
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger className="outline-0" asChild>
                <Button
                  className="flex h-fit items-center gap-1.5 border-none px-0 py-1.5 font-medium focus-visible:border-0 focus-visible:ring-0 has-[>svg]:px-1.5"
                  variant={"ghost"}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-200">
                      {name?.split(" ")[0]?.[0]}
                      {name?.split(" ")[1]?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-5">
                <div className="flex flex-row-reverse items-start px-2">
                  <div className="flex items-center justify-center">
                    <div>
                      <DropdownMenuLabel className="pb-0">
                        Olá, {name}!
                      </DropdownMenuLabel>
                      <DropdownMenuLabel className="pt-0 text-[0.8rem] font-normal text-gray-500">
                        {email}
                      </DropdownMenuLabel>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="px-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      supabase.auth.signOut();
                      route.push("/authentication");
                      toast.success("Você foi deslogado!");
                    }}
                    className="flex w-full items-center justify-start px-0 text-sm font-normal text-red-400 hover:bg-red-100 hover:text-red-400"
                  >
                    <LogOutIcon
                      size={10}
                      className="text-red-400 hover:text-red-500"
                    />{" "}
                    Sair
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
