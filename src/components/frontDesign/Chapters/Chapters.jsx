import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EditChapter from "../EditChapter/EditChapter";

const Page = ({ chapter, refetch }) => {
  const url = usePathname();
  console.log(url);

  return (
    <div className="card pb-4 card-compact w-[80vw] md:w-60 bg-base-100 shadow-xl">
      <Link href={`${url}/${chapter?.slug}`}>
        <figure className="h-40">
          <Image
            src={chapter?.thumbnail}
            alt="Title"
            width={500}
            height={500}
            class="transition-transform duration-300 transform hover:scale-105"
          />
        </figure>
        <div class="card-actions justify-around p-3">
          <h2 class="card-title">{chapter.title}</h2>
          {/* <p>{chapter.paper}</p> */}
        </div>
      </Link>
      <EditChapter refetch={refetch} data={chapter}/>
    </div>
  );
};

export default Page;
