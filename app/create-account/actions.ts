"use server";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .endsWith("@zod.com", "Only @zod.com emails are allowed"),
    username: z
      .string()
      .min(5, "Username should be at least 5 characters long."),
    password: z
      .string()
      .min(10, "Password should be at least 10 characters long.")
      .regex(
        /[0-9]/,
        "Password should contains at least one number (0123456789)."
      ),
    confirmPassword: z.string().min(10),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPassword, {
    message: "confirm password must be same with password",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
    };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
