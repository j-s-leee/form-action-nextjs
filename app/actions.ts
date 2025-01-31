"use server";
import { z } from "zod";

const checkPassword = async (password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return password === "12345";
};

const formSchema = z.object({
  email: z.string().email().endsWith("@zod.com", "Only @zod.com emails are allowed"),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z.string().min(10, "Password should be at least 10 characters long.").regex(/[0-9]/, 
    "Password should contains at least one number (0123456789).")
});

export async function loginAction(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
    };
  }
  return {
    success: true,
    message: "Welcome back!",
  };
}
