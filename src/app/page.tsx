import LoginForm from "@/components/form/LoginForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session?.userId) redirect("/home");

  return <LoginForm />;
}
