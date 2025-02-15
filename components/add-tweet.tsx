"use client";

import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import Button from "./button";
import Input from "./input";
import { addTweet } from "@/app/(tabs)/home/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { tweetSchema, TweetType } from "@/app/(tabs)/home/schema";

export default function AddTweet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TweetType>({
    resolver: zodResolver(tweetSchema),
  });

  const onSubmit = handleSubmit(async (data: TweetType) => {
    const formData = new FormData();
    formData.append("tweet", data.tweet);
    const errors = await addTweet(formData);
    if (errors) {
    }
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <div className="card card-bordered w-full bg-base-100">
      <form action={onValid} className="flex flex-col gap-5 card-body">
        <Input
          {...register("tweet")}
          required
          type="text"
          placeholder="tweet anything"
          icon={<ChatBubbleBottomCenterIcon />}
          errors={[errors.tweet?.message ?? ""]}
        />
        <Button text="tweet" />
      </form>
    </div>
  );
}
