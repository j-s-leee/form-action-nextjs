"use client";

import Button from "@/components/button";

import { loginAction } from "./actions";
import Input from "@/components/input";
import { useActionState } from "react";
import { AtSymbolIcon, FireIcon, KeyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LoginInput from "@/components/login-input";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  const [state, dispatch] = useActionState(loginAction, null);
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex flex-col items-center text-center lg:text-left">
          <ThemeToggle />
          <h1 className="text-5xl font-bold pt-6">로그인 해봐요!</h1>
          <p className="py-6">
            메일은 발송되지 않으니 이메일 형식만 맞춰주세요. 비밀번호는
            암호화되어 저장됩니다.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form action={dispatch} className="card-body">
            <LoginInput
              name="email"
              required
              type="email"
              placeholder="Email"
              errors={state?.fieldErrors.email}
            />
            <LoginInput
              name="password"
              required
              type="password"
              placeholder="Password"
              errors={state?.fieldErrors.password}
            />
            <label className="label">
              <Link
                href="/create-account"
                className="label-text-alt link link-hover"
              >
                Create Account
              </Link>
            </label>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
