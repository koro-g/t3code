import type { RuntimeMode } from "@t3tools/contracts";
import { type LucideIcon, LockIcon, LockOpenIcon, PenLineIcon, SparklesIcon } from "lucide-react";

export const runtimeModeConfig: Record<
  RuntimeMode,
  { label: string; description: string; icon: LucideIcon }
> = {
  "approval-required": {
    label: "Supervisé",
    description: "Demander avant les commandes et modifications de fichiers.",
    icon: LockIcon,
  },
  "auto-accept-edits": {
    label: "Modifs auto-acceptées",
    description: "Approuver automatiquement les modifications, demander avant les autres actions.",
    icon: PenLineIcon,
  },
  auto: {
    label: "Auto",
    description:
      "Les providers compatibles approuvent les actions courantes ; les autres demandent.",
    icon: SparklesIcon,
  },
  "full-access": {
    label: "Accès total",
    description: "Autoriser commandes et modifications sans confirmation.",
    icon: LockOpenIcon,
  },
};

export const runtimeModeOptions = Object.keys(runtimeModeConfig) as RuntimeMode[];
