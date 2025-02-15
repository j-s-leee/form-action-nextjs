import z from "zod";

export const tweetSchema = z.object({
  tweet: z.string({ required_error: "tweet is required" }),
});

export type TweetType = z.infer<typeof tweetSchema>;

export const responseSchema = z
  .string({ required_error: "response is required" })
  .min(1, "response is required");
