import { FireIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Homepage() {
  return (
    <div>
      <FireIcon />
      <Link href="/log-in">Log In</Link>
      <Link href="/create-account">Create Account</Link>
    </div>
  );
}
