import LikeButton from "@/components/like-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import {
  ChatBubbleBottomCenterIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import { formatToTimeAgo } from "@/utils/format";
import ResponseForm from "@/components/response-form";

async function getTweetDetail(id: number) {
  try {
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
            Response: true,
          },
        },
      },
      where: {
        id,
      },
    });
    return tweet;
  } catch (e) {
    return null;
  }
}

const getCachedTweet = nextCache(getTweetDetail, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});

async function getLikeStateus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    isLiked: !!isLiked,
    likeCount,
  };
}

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id!;
  const cachedLikeStatus = nextCache(getLikeStateus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedLikeStatus(tweetId, userId);
}

export type Response = Awaited<ReturnType<typeof getResponses>>;

async function getResponses(tweetId: number) {
  const responses = await db.response.findMany({
    where: {
      tweetId,
    },
    select: {
      id: true,
      content: true,
      created_at: true,
      user: {
        select: {
          username: true,
          id: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
  return responses;
}

async function getCachedResponses(tweetId: number) {
  const cachedResponses = nextCache(getResponses, ["tweet-responses"], {
    tags: [`tweet-responses-${tweetId}`],
  });
  return cachedResponses(tweetId);
}

export default async function TweetDetail({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const tweetId = Number(id);
  if (isNaN(tweetId)) return notFound();

  const tweet = await getCachedTweet(tweetId);

  const { isLiked, likeCount } = await getCachedLikeStatus(tweetId);
  const responses = await getCachedResponses(tweetId);

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
                <LikeButton
                  isLiked={isLiked}
                  likeCount={likeCount}
                  tweetId={tweetId}
                />
                <button className="btn">
                  <ChatBubbleBottomCenterIcon className="w-4" />
                  {tweet?._count.Response}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <ResponseForm responses={responses} tweetId={tweetId} />
        <div className="flex flex-col gap-2 w-full">
          {responses &&
            responses.map((response) => (
              <div className="chat chat-start" key={response.id}>
                <div className="chat-header">
                  {response.user.username}
                  <time className="text-xs opacity-50 ml-2">
                    {formatToTimeAgo(response.created_at.toString())}
                  </time>
                </div>
                <div className="chat-bubble">{response.content}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
