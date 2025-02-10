"use server";

import { PAGE_SIZE } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { tweetSchema } from "./schema";
import { redirect } from "next/navigation";

export async function getPagedTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      _count: {
        select: {
          Like: true,
        },
      },
    },
    skip: PAGE_SIZE * (page - 1),
    take: PAGE_SIZE,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export async function addTweet(formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };

  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const newTweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          userId: session.id,
        },
        include: {
          user: true,
          _count: {
            select: { Like: true },
          },
        },
      });
      // return newTweet;
      // TODO revalidate나 useOptimistic으로 변경 필요
      redirect("/");
    }
  }
}
