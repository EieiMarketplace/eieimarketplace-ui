"use client";

import { useRouter } from "next/navigation";

export default function TextWithRedirect({
  text,
  url,
}: {
  text: string;
  url: string;
}) {
  const router = useRouter();
  return (
    <span
      onClick={() => {
        router.push(url);
      }}
      className="text-center text-xl font-semibold cursor-pointer hover:underline"
    >
      {text}
    </span>
  );
}
