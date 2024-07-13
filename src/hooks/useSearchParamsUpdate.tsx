"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useSearchParamsUpdate() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateSearchParams = (paramsArray: { id: string; param: string }[]) => {
    const params = new URLSearchParams(searchParams);

    paramsArray.forEach(({ id, param }) => {
      if (param) {
        params.set(id, param);
      } else {
        params.delete(id);
      }
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { updateSearchParams };
}
