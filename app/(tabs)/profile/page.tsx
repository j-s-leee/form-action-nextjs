import db from "@/lib/db";
import getSession from "@/lib/session";
import { BoltIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-full max-w-screen-md">
        <div className="rounded-md shadow stats stats-vertical w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <HeartIcon className="size-8 stroke-2" />
            </div>
            <div className="stat-title">Total Likes</div>
            <div className="stat-value text-primary">25.6K</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <BoltIcon className="size-8 stroke-2" />
            </div>
            <div className="stat-title">Page Views</div>
            <div className="stat-value text-secondary">2.6M</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <Image src="/pangin.png" width={64} height={64} alt="Logo" />
                </div>
              </div>
            </div>
            <div className="stat-value">{user?.username}</div>
            <div className="stat-title">{user?.email}</div>
            <div className="stat-desc text-secondary">{user?.bio || "bio"}</div>
          </div>
        </div>
        <form action={logOut} className="flex flex-col gap-3 w-full">
          <button className="btn btn-neutral">Log Out</button>
        </form>
      </div>
    </div>
  );
}
