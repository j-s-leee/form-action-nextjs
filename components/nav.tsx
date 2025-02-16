import Image from "next/image";
import ThemeToggle from "./theme-toggle";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <Image
            src="/pangin.png"
            alt="Logo"
            width={40}
            height={40}
            className="size-10"
          />
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">carrot challenge</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/home">Tweets</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
        <button className="btn btn-square btn-ghost">
          <ThemeToggle />
        </button>
      </div>
    </div>
  );
}
