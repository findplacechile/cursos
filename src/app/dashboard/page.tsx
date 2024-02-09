import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserList } from "../_components/UserList";

export default async function Dashboard() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }
  return (
    <>
      Welcome: {session?.user.name} - {" "}
      <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
      <br />
      <UserList />
    </>
  );
}
