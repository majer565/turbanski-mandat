"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useSearchParamsUpdate() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = (id: string, param: string) => {
    const params = new URLSearchParams(searchParams);
    if (param) {
      params.set(id, param);
    } else {
      params.delete(id);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return { updateSearchParams };
}