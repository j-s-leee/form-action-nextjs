import db from "@/lib/db";
import { FireIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";
import { REPLServer } from "repl";

async function getTweetDetail(id: number) {
  const tweet = db.tweet.findUnique({
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
    where: {
      id,
    },
  });
  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const tweetId = Number(id);
  if (isNaN(tweetId)) return notFound();

  const tweet = await getTweetDetail(tweetId);
  return (
    <div className="flex flex-col gap-10 p-10 max-w-screen-sm mx-auto">
      <div className="flex flex-col gap-2 *:font-medium items-center">
        <FireIcon className="size-16 text-red-400" />
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>{tweet?.tweet}</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="card card-bordered w-full bg-base-100">
            <div className="card-body">
              <h2 className="card-title">{tweet?.user.username}</h2>
              <p>{tweet?.tweet}</p>
              <div className="card-actions justify-end">
                <div className="badge">{tweet?._count.Like}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="card card-bordered w-full px-10 py-4">reply...</div>
          <div className="card card-bordered w-full px-10 py-4">reply...</div>
          <div className="card card-bordered w-full px-10 py-4">reply...</div>
        </div>
      </div>
    </div>
  );
}
