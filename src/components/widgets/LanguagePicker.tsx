"use client";

import { useScrollDirection } from "~/hooks/useScrollDirection";
import { Globe } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { languages } from "~/i18n/ui";
import { getRouteFromUrl } from "~/i18n/utils";

export function LanguagePicker() {
  const scrollDirection = useScrollDirection();

  let route = "";
  if (typeof window !== "undefined") {
    route = getRouteFromUrl(new URL(window.location.href));
  }

  const handleSelectLanguage = (langCode: string) => {
    window.location.href = `/${langCode}/${route || ""}`;
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-transform duration-300 ${
        scrollDirection === "down"
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Globe className="h-[2rem] w-[2rem]" />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.entries(languages).map(([code, label]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => handleSelectLanguage(code)}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
