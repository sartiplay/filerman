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
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "30px",
                    height: "30px",
                  },
                },
                variables: {
                  colorBackground: "#262626",
                  colorText: "#e5e5e5",
                  colorTextOnPrimaryBackground: "#e5e5e5",
                  colorPrimary: "#3b82f6",
                  colorTextSecondary: "#e5e5e5",
                  colorInputBackground: "#262626",
                  colorInputText: "#e5e5e5",
                  colorNeutral: "#e5e5e5",
                  colorDanger: "red",
                },
              }}
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
