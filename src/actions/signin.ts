"use server";

import { LoginFormState } from "@/components/form/LoginForm";
import bcrypt from "bcrypt";
import { prisma } from "../../prisma/client";
import { login } from "./auth";

export async function signin(_state: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const userEmail = formData.get("email") as string;
  const userPassword = formData.get("password") as string;

  if (!userEmail || !userPassword) return { errors: { email: "Nieprawidłowy formularz" } };

  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (!user) return { errors: { email: "Użytkownik o podanym adresie email nie istenieje" } };

  const passwordMatch = await bcrypt.compare(userPassword, user.password);

  if (!passwordMatch) return { errors: { password: "Hasło jest nieprawidłowe" } };

  await login(user);
}
