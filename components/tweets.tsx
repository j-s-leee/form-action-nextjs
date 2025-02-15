"use client";

import { getPagedTweets } from "@/app/(tabs)/home/actions";
import { TweetsProps } from "@/app/(tabs)/home/page";
import { formatToTimeAgo } from "@/utils/format";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Tweets({
  initialTweets,
}: {
  initialTweets: TweetsProps;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchTweets() {
      const newTweets = await getPagedTweets(page);
      setTweets(newTweets);
    }

    fetchTweets();
  }, [page]);

  return (
    <div className="w-full flex flex-col gap-2">
      <ul className="list bg-base-100 rounded-box shadow-md ">
        {tweets.map((tweet) => (
          <Link href={`/tweets/${tweet.id}`} key={tweet.id}>
            <li className="list-row">
              <div>
                <UserCircleIcon className="size-10" />
              </div>
              <div>
                <div>{tweet.user.username}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {formatToTimeAgo(tweet.created_at.toString())}
                </div>
              </div>
              <p className="list-col-wrap text-xs ">{tweet.tweet}</p>
              <button className="btn btn-square btn-ghost">
                <HandThumbUpIcon className="size-4 stroke-2" />
                <span>{tweet._count.Like}</span>
              </button>
              <button className="btn btn-square btn-ghost">
                <ChatBubbleBottomCenterIcon className="size-4 stroke-2" />
                <span>{tweet._count.Response}</span>
              </button>
            </li>
          </Link>
        ))}
      </ul>
      <div className="join grid grid-cols-2 justify-center">
        <button
          className="join-item btn btn-outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous page
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
