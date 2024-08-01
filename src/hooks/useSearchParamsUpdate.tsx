"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Param {
  id: string;
  param: string;
}

export default function useSearchParamsUpdate() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateSearchParams = (paramsArray: Param[]) => {
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

  const updateFilterSearchParams = (filterParamsArray: Param[]) => {
    const params = new URLSearchParams(searchParams);
    const filterParamsSet = new Set(filterParamsArray.map((fp) => fp.id));

    filterParamsArray.forEach(({ id, param }) => {
      if (param.length === 0 || (param.length === 1 && param[0] === "")) params.delete(id);
      else params.set(id, param);
    });

    Array.from(params.keys()).forEach((key) => {
      if (!filterParamsSet.has(key)) {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  return { updateSearchParams, updateFilterSearchParams };
}
