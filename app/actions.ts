"use server";
import { z } from "zod";

const checkPassword = async (password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return password === "12345";
};

const formSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().refine(checkPassword, "Wrong password"),
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
