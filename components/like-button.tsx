"use client";

import { dislikeTweet, likeTweet } from "@/app/tweets/actions";
import { HandThumbUpIcon as ThumbUpSolid } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as ThumbUpOutline } from "@heroicons/react/24/outline";
import { useOptimistic, useTransition } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    {
      isLiked,
      likeCount,
    },
    (prevState, payload) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );

  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
    startTransition(async () => {
      reducerFn(undefined);
    });
    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };

  return (
    <button onClick={onClick} className="btn btn-sm">
      {state.isLiked ? (
        <ThumbUpSolid className="w-4" />
      ) : (
        <ThumbUpOutline className="w-4" />
      )}
      {state.isLiked ? (
        <span>{state.likeCount}</span>
      ) : (
        <span>{state.likeCount}</span>
      )}
    </button>
  );
}
