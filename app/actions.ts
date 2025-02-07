"use server";

import { PAGE_SIZE } from "@/lib/constants";
import db from "@/lib/db";

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
