import AddTweet from "@/components/add-tweet";
import Tweets from "@/components/tweets";
import { PAGE_SIZE } from "@/lib/constants";
import db from "@/lib/db";
import { FireIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getTweets(page?: number) {
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
          Response: true,
        },
      },
    },
    take: PAGE_SIZE,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type TweetsProps = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Homepage() {
  const tweets = await getTweets();
  return (
    <div className="flex flex-col gap-10 p-10 max-w-screen-sm mx-auto">
      <div className="flex flex-col gap-2 *:font-medium items-center">
        <FireIcon className="size-16 text-red-400" />
        <Link href="/profile">PROFILE</Link>
        <AddTweet />
        <Tweets initialTweets={tweets} />
      </div>
    </div>
  );
}
