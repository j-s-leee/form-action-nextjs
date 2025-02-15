import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <ThemeToggle />
          <h1 className="text-5xl font-bold pt-6">안녕하세요</h1>
          <p className="py-6">캐럿마켓 클론 챌린지를 하며 만들었어요.</p>
          <Link href="/log-in" className="btn btn-primary">
            구경하기
          </Link>
        </div>
      </div>
    </div>
  );
}
