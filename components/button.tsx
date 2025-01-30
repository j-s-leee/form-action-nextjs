"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="h-10 bg-neutral-200 text-xs font-extrabold rounded-full primary-btn disabled:bg-neutral-400 disabled:text-neutral-500 disabled:cursor-not-allowed active:scale-95 transition-transform"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
