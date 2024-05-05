"use client";

import NavBar from "@/components/frontDesign/NavBar/NavBar";
import Chapters from "@/components/frontDesign/Chapters/Chapters";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddChapter from "@/components/frontDesign/AddChapter/AddChapter";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathName = usePathname();

  const categorySlug = pathName.split("/")[2];

  const {
    data: chapters,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/chapters?slug=${categorySlug}`, fetcher);

  console.log(chapters);

  const isAdmin = true;

  return (
    <main className="flex min-h-screen flex-col items-center  ">
      <ToastContainer />
      <div className="flex justify-end">
        {isAdmin && <AddChapter categorySlug={categorySlug} refetch={mutate} />}
      </div>
      {error && (
        <div className="flex justify-center items-center">
          <p className="text-red-500">Failed to fetch the data</p>
        </div>
      )}
      {isLoading && (
        <div className="h-full absolute top-1/2">
          <p className="animate-pulse text-white text-xl">Loading....</p>
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-3">
          {chapters?.map((chapter) => (
            <Chapters key={chapter.slug} chapter={chapter} />
          ))}
        </div>
      )}
      {chapters?.length === 0 && (
        <div className="h-full absolute top-1/2">
          <p className="text-xl text-zinc-400">No Chapters</p>
        </div>
      )}
    </main>
  );
}

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch the data");
  }
  const data = await res.json();
  console.log(data);

  return data.data;
};
