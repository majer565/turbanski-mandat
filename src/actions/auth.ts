import { createSession, deleteSession } from "@/lib/session";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export async function login(user: User) {
  await createSession(String(user.id));
  redirect("/mandaty");
}

export async function logout() {
  deleteSession();
}
