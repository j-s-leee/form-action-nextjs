"use client";

import { useActionState } from "react";
import { createAccount } from "./actions";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import LoginInput from "@/components/login-input";

export default function CreateAccount() {
  const [state, dispatch] = useActionState(createAccount, null);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex flex-col items-center text-center lg:text-left">
          <ThemeToggle />
          <h1 className="text-5xl font-bold pt-6">가입해봐요!</h1>
          <p className="py-6">
            이메일 형식은 @zod.com으로 끝나도록 맞춰주세요.
            <br />
            형식에 맞지 않은 입력은 입력칸 아래를 참고해 수정해 주세요.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form action={dispatch} className="card-body">
            <LoginInput
              name="email"
              required
              type="email"
              placeholder="Email"
              errors={state?.errors?.fieldErrors.email}
            />
            <LoginInput
              name="username"
              required
              type="text"
              placeholder="Username"
              errors={state?.errors?.fieldErrors.username}
            />
            <LoginInput
              name="password"
              required
              type="password"
              placeholder="Password"
              errors={state?.errors?.fieldErrors.password}
            />
            <LoginInput
              name="confirmPassword"
              required
              type="password"
              placeholder="confirm Password"
              errors={state?.errors?.fieldErrors.confirmPassword}
            />
            <label className="label">
              <Link href="/log-in" className="label-text-alt link link-hover">
                Login
              </Link>
            </label>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Join</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
