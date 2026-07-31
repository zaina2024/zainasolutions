import type { Transition } from "motion/react";

export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

export const VIEWPORT_ONCE = { once: true, amount: 0.35 } as const;
