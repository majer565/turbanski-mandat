"use client";

import { signin } from "@/actions/signin";
import { LoaderCircle } from "lucide-react";
import { useFormState } from "react-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export type LoginFormState =
  | {
      errors?: {
        email?: string;
        password?: string;
      };
      message?: string;
    }
  | undefined;

const LoginForm = () => {
  const [state, formAction, pending] = useFormState<LoginFormState, FormData>(signin, undefined);

  return (
    <div className="mx-auto my-auto w-1/4">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Turbańscy</CardTitle>
          <CardDescription>Portal wewnętrzny</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" placeholder="Wprowadź email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Hasło</Label>
              <Input type="password" id="password" name="password" placeholder="Wprowadź hasło" />
            </div>
            {state?.errors?.email && <p className="text-destructive text-sm">{state.errors.email}</p>}
            {state?.errors?.password && <p className="text-destructive text-sm">{state.errors.password}</p>}
            <Button className="w-1/3" disabled={pending} type="submit">
              {pending ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Zatwierdź"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
