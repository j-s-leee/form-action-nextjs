import { FireIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./theme-toggle";

export default function Nav() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <FireIcon className="size-10 text-red-400" />
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">carrot challenge</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <ThemeToggle />
        </button>
      </div>
    </div>
  );
}
