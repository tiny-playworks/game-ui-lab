import type { ElementType, ReactNode } from "react";
import { useDocsLocale } from "./locale";

export function Localized({
  zh,
  en,
  as,
  className,
}: {
  zh: ReactNode;
  en: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const { locale } = useDocsLocale();
  const Tag = as ?? "span";

  return <Tag className={className}>{locale === "zh" ? zh : en}</Tag>;
}
