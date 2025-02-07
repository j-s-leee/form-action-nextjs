"use client";

import Button from "@/components/button";

import { loginAction } from "./actions";
import Input from "@/components/input";
import { useActionState } from "react";
import { AtSymbolIcon, FireIcon, KeyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
  const [state, dispatch] = useActionState(loginAction, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-32">
      <div className="flex flex-col gap-2 *:font-medium items-center">
        <FireIcon className="size-16 text-red-400" />
        <form action={dispatch} className="flex flex-col gap-3 w-full">
          <Input
            name="email"
            required
            type="email"
            placeholder="Email"
            icon={<AtSymbolIcon className="text-gray-500" />}
            errors={state?.fieldErrors.email}
          />
          <Input
            name="password"
            required
            type="password"
            placeholder="Password"
            icon={<KeyIcon />}
            errors={state?.fieldErrors.password}
          />
          <Button text="Log in" />
        </form>
        <Link href="/create-account">Create Account</Link>
      </div>
    </div>
  );
}
