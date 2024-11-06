import { createSession, deleteSession } from "@/lib/session";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export async function login(user: User) {
  await createSession(String(user.id), String(user.email));
  redirect("/home");
}

export async function logout() {
  deleteSession();
}
