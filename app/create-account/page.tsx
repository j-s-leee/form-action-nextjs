"use client";

import Button from "@/components/button";

import Input from "@/components/input";
import { useActionState } from "react";
import { createAccount } from "./actions";
import {
  AtSymbolIcon,
  CheckBadgeIcon,
  FireIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function CreateAccount() {
  const [state, dispatch] = useActionState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-32">
      <div className="flex flex-col gap-2 *:font-medium items-center">
        <FireIcon />
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
          <Button text="Log in" />

          <span
            className={`flex transition-all duration-700 items-center bg-emerald-500 font-semibold text-sm p-4 rounded-xl ${
              state?.success ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <CheckBadgeIcon />
          </span>
        </form>
      </div>
    </div>
  );
}
