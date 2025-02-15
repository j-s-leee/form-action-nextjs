"use client";

import { addResponse } from "@/app/tweets/[id]/actions";
import { Response } from "@/app/tweets/[id]/page";
import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/outline";

import { useOptimistic, useState } from "react";

interface ResponseFormProps {
  responses: Response;
  tweetId: number;
}

export default function ResponseForm({
  responses,
  tweetId,
}: ResponseFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [optimisticResponses, addOptimisticResponse] = useOptimistic<
    Response,
    string
  >(responses, (prevState, newResponse) => [
    ...prevState,
    {
      id: 0,
      content: newResponse,
      created_at: new Date(),
      user: {
        id: 0,
        username: "",
      },
    },
  ]);

  const formAction = async (formData: FormData) => {
    setError(null);
    const newResponse = formData.get("response") as string;
    addOptimisticResponse(newResponse);
    const errorResponse = await addResponse(tweetId, newResponse);

    if (errorResponse?.formErrors) {
      console.log(errorResponse);
      setError(errorResponse.formErrors[0]);
    }
  };
  return (
    <div className="w-full flex flex-col gap-1">
      <form action={formAction} className="w-full flex items-center join">
        <input
          type="text"
          name="response"
          className="input input-bordered flex-1 join-item"
          placeholder="Type here..."
        />
        <button type="submit" className="btn btn-neutral join-item">
          <ArrowTurnDownLeftIcon className="w-6" />
        </button>
      </form>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
