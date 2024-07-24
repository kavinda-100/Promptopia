import Feed from "@/components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex-col text-center">
      <h1 className="text-center text-pretty text-2xl md:text-2xl lg:text-4xl font-serif">
        Discover & share
      </h1>
      <br className="max-md:hidden" />
      <span className="text-pretty text-2xl md:text-2xl lg:text-4xl font-serif">
        AI-Powered Prompts
      </span>
      <p className=" text-pretty mt-2 ">
        Promtopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts.
      </p>

      {/* feed section */}
      <div className="mt-10">
        <Feed />
      </div>
    </section>
  );
}
