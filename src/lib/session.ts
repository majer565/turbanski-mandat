import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";
import { logger } from "./logger/client";
import { LoggerRequest } from "./logger/Logger";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    logger.error("Failed to verify session:: " + error, LoggerRequest.AUTH);
  }
}

export async function createSession(userId: string, userEmail: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, userEmail, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
  });
}

export function deleteSession() {
  cookies().delete("session");
  redirect("/");
}

export async function verifySession() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId || !session?.userEmail) {
    redirect("/");
  }

  return { userId: session.userId, userEmail: session.userEmail };
}

export async function getSession() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  return session;
}
