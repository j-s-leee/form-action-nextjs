import Button from "@/components/button";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { FireIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col gap-10 py-8 px-32">
      <div className="flex flex-col gap-2 *:font-medium items-center">
        <FireIcon className="size-16 text-red-400" />
        <div className="p-5 gap-5 flex flex-col justify-center">
          <div className="flex gap-3 justify-center">{user?.username}</div>
          <div className="flex gap-3 justify-center">{user?.email}</div>
        </div>
        <form action={logOut} className="flex flex-col gap-3 w-full">
          <Button text="Log Out" />
        </form>
      </div>
    </div>
  );
}
