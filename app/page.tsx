import { FireIcon } from "@heroicons/react/24/outline";

export default function Homepage() {
  return (
    <div className="flex flex-col gap-10 py-8 px-32">
      <div className="flex flex-col gap-2 *:font-medium items-center">
        <FireIcon className="size-16 text-red-400" />
      </div>
    </div>
  );
}
