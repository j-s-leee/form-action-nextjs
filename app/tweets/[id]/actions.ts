"use server";

import { responseSchema } from "@/app/(tabs)/home/schema";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";

export const addResponse = async (tweetId: number, content: string) => {
  "use server";

  const result = responseSchema.safeParse(content);

  if (!result.success) {
    return result.error.flatten();
  }
  const session = await getSession();
  try {
    await db.response.create({
      data: {
        content,
        tweetId,
        userId: session.id!,
      },
    });
    revalidatePath(`/tweets/${tweetId}`);
  } catch (e) {}
};
