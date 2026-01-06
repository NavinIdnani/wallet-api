import { Stack, Redirect } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function RootLayout() {

  return (
    <>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }} />
      </SignedIn>

      <SignedOut>
        <Redirect href="/sign-in" />
      </SignedOut>
    </>
  );
}
