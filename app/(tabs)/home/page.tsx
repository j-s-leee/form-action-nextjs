import AddTweet from "@/components/add-tweet";
import Tweets from "@/components/tweets";
import { PAGE_SIZE } from "@/lib/constants";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-full max-w-screen-md">
        <AddTweet />
        <Tweets initialTweets={tweets} />
      </div>
    </div>
  );
}
