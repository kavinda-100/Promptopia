"use client";

import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Heder = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex w-full mb-16 justify-between items-center h-[70px] shadow-sm px-5">
      {/* logo */}
      <Link href="/" className="flex gap-2 items-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promtopia"
          width={30}
          height={30}
          className="cursor-pointer object-contain"
        />
        <h1 className="text-2xl font-bold cursor-pointer">Promtopia</h1>
      </Link>
      {/* mode toggle and auth */}
      <div className="lg:flex gap-2 justify-center items-center hidden">
        {/* mode toggle */}
        <ModeToggle />
        {/* auth */}
        <div className=" flex gap-2">
          <Button onClick={() => signIn("google")}>Sign in</Button>
          <Button onClick={() => signOut()} variant={"outline"}>
            Sign out
          </Button>
        </div>
      </div>
      <div className="lg:hidden">
        <MobileAuth />
      </div>
    </header>
  );
};

export default Heder;

// for mobile view
// {
//   open,
//   setOpen,
// }: {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }
const MobileAuth = () => {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        {/* mode toggle */}
        <ModeToggle />
        {/* auth */}
        <div className=" flex flex-col gap-3 mt-5">
          <Button onClick={() => signIn("google")}>Sign in</Button>
          <Button onClick={() => signOut()} variant={"outline"}>
            Sign out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
