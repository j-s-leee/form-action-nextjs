import z from "zod";

export const tweetSchema = z.object({
  tweet: z.string({ required_error: "tweet is required" }),
});

export type TweetType = z.infer<typeof tweetSchema>;
