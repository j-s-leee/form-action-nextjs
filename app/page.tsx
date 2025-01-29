"use client";

import Button from "@/components/button";

import { loginAction } from "./actions";
import Input from "@/components/input";
import { useActionState } from "react";

export default function Home() {
  const [state, dispatch] = useActionState(loginAction, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
            clipRule="evenodd"
          />
        </svg>
        <form action={dispatch} className="flex flex-col gap-3">
          <Input
            name="email"
            required
            type="email"
            placeholder="Email"
            errors={state?.errors?.fieldErrors.email}
          />
          <Input
            name="username"
            required
            type="text"
            placeholder="Username"
            errors={state?.errors?.fieldErrors.username}
          />
          <Input
            name="password"
            required
            type="password"
            placeholder="Password"
            errors={state?.errors?.fieldErrors.password}
          />
          <Button text="Log in" />
          {state?.success && <span className="">{state.message}</span>}
        </form>
      </div>
    </div>
  );
}
