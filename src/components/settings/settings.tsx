"use client";

import { useTheme } from "next-themes";
import { ButtonGroup, ButtonGroupItem } from "../ui/button-group";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User } from "@prisma/client";

const Settings = ({ userEmail }: { userEmail: string }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid gap-10">
      <div className="grid w-full max-w-xl items-center gap-3">
        <Label htmlFor="email">Email</Label>
        <Input disabled className="bg-transparent" type="email" id="email" placeholder="Email" value={userEmail} />
        <p className="text-sm text-muted-foreground">
          W przypadku konieczności zmiany adresu email skontaktuj się z administratorem
        </p>
      </div>
      <div className="grid w-full max-w-xl items-center gap-3">
        <Label htmlFor="email">Hasło</Label>
        <Input className="bg-transparent" type="password" id="password" disabled value="ASDFGHJKLZXCVBNM" />
        <p className="text-sm text-muted-foreground">
          W przypadku konieczności zmiany hasła skontaktuj się z administratorem
        </p>
      </div>
      <div className="grid w-full max-w-xl items-center gap-3">
        <Label htmlFor="email">Motyw</Label>
        <p className="text-sm text-muted-foreground">Wybierz motyw aplikacji</p>
        <ButtonGroup onValueChange={(v) => setTheme(v)} defaultValue={theme}>
          <ButtonGroupItem label={"Dark"} value={"dark"}>
            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">Ciemny</span>
          </ButtonGroupItem>
          <ButtonGroupItem label={"Light"} value={"light"}>
            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">Jasny</span>
          </ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Settings;
