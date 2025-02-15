"use client";

import { getPagedTweets } from "@/app/(tabs)/home/actions";
import { TweetsProps } from "@/app/(tabs)/home/page";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
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
    <div className="flex flex-col gap-4 w-full">
      {tweets.map((tweet) => (
        <Link href={`/tweets/${tweet.id}`} key={tweet.id} className="w-full">
          <div className="card card-compact card-bordered w-full bg-base-100">
            <div className="card-body">
              <h2 className="card-title">{tweet.user.username}</h2>
              <p>{tweet.tweet}</p>

              <div className="card-actions justify-end">
                <div className="btn btn-sm gap-2">
                  <HandThumbUpIcon className="w-4" />
                  <span>{tweet._count.Like}</span>
                </div>
                <button className="btn btn-sm">
                  <ChatBubbleBottomCenterIcon className="w-4" />
                  {tweet._count.Response}
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <div className="join grid grid-cols-2">
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
