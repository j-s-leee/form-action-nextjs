import { ArrowDownIcon, FireIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
      <aside>
        <img src="/pangin.png" className="size-16" />
        <p className="font-bold">
          Clone Startups. Learn to Code.
          <br />
          코딩은 진짜를 만들어보는거야!
          <br />
          실제 서비스를 따라 만들면서 코딩을 배우세요.
          <br />
        </p>
        <ArrowDownIcon strokeWidth={2} className="w-6 animate-pulse" />
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://nomadcoders.co/">
            <img
              className="w-9"
              src="https://nomadcoders.co/m.svg"
              alt="nomadcoders.co"
            />
          </a>
        </div>
      </nav>
    </footer>
  );
}
