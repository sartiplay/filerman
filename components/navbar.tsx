import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Heading from "./heading";

export default function Navbar() {
  return (
    <>
      <nav className="sticky top-0 left-0 w-screen h-[60px] py-3 bg-primary z-[1000] grid grid-cols-3 place-items-center">
        <Heading className="text-3xl">Filerman</Heading>
        <div className=""></div>
        <div className="">
          <SignedIn>
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/profile"
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <p className="font-bold cursor-pointer text-2xl">Sign In</p>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </>
  );
}
