"use client";

import Button from "@/components/button";

import Input from "@/components/input";
import { useActionState } from "react";
import { createAccount } from "./actions";
import {
  AtSymbolIcon,
  FireIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CreateAccount() {
  const [state, dispatch] = useActionState(createAccount, null);

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
            icon={<AtSymbolIcon />}
            errors={state?.errors?.fieldErrors.email}
          />
          <Input
            name="username"
            required
            type="text"
            placeholder="Username"
            icon={<UserIcon />}
            errors={state?.errors?.fieldErrors.username}
          />
          <Input
            name="password"
            required
            type="password"
            placeholder="Password"
            icon={<KeyIcon />}
            errors={state?.errors?.fieldErrors.password}
          />
          <Input
            name="confirmPassword"
            required
            type="password"
            placeholder="confirm Password"
            icon={<KeyIcon />}
            errors={state?.errors?.fieldErrors.confirmPassword}
          />
          <Button text="JOIN" />
        </form>
        <Link href="/log-in">Log In</Link>
      </div>
    </div>
  );
}
