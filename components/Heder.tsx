"use client";

import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlignRight } from "lucide-react";

const Heder = () => {
  const isUserLoggedIn = true;
  // get session
  const [providers, setProviders] = useState<any>(null);

  // get providers
  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    fetchProviders();
  }, []);
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
        <h1 className="text-2xl font-bold cursor-pointer text-foreground">
          Promtopia
        </h1>
      </Link>
      {/* mode toggle and auth */}
      <div className="lg:flex gap-2 justify-center items-center hidden">
        {/* mode toggle */}
        <ModeToggle />
        {/* auth */}
        <div className=" flex gap-2">
          {/* if user log in */}
          {isUserLoggedIn ? (
            <>
              <Link href={"create-post"}>
                <Button>Create Post</Button>
              </Link>
              <Button onClick={() => signOut()} variant={"outline"}>
                Sign out
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              {/* if not user log in */}
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <Button
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                  >
                    Sign in with {provider.name}
                  </Button>
                ))}
              <Button onClick={() => signIn("google")}>Sign in</Button>
            </>
          )}
        </div>
      </div>
      <div className="lg:hidden">
        <MobileAuth
          isUserLoggedIn={isUserLoggedIn}
          avatarUrl="https://github.com/shadcn.png"
          providers={providers}
        />
      </div>
    </header>
  );
};

export default Heder;

const MobileAuth = ({
  isUserLoggedIn,
  avatarUrl,
  providers,
}: {
  isUserLoggedIn: boolean;
  avatarUrl: string;
  providers?: any;
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignRight />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mt-6">
          {isUserLoggedIn ? (
            <div className="flex justify-between items-center">
              {/* mode toggle */}
              <ModeToggle />
              {/* avatar */}
              <Avatar>
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <>
              {/* mode toggle */}
              <ModeToggle />
            </>
          )}
        </SheetHeader>
        {/* auth */}
        <div className=" flex flex-col gap-3 mt-5">
          {/* if user log in */}
          {isUserLoggedIn ? (
            <>
              <Link href={"create-post"}>
                <Button className="w-full">Create Post</Button>
              </Link>
              <Button onClick={() => signOut()} variant={"outline"}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              {/* if not user log in */}
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <Button
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                    className="w-full"
                  >
                    Sign in with {provider.name}
                  </Button>
                ))}
              <Button onClick={() => signIn("google")}>Sign in</Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
