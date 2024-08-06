"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ListPlus } from "lucide-react";

const DataTableNewRow = () => {
  return (
    <Link href="/dodaj">
      <Button variant="ghost" size="sm" className="ml-auto hidden h-8 lg:flex">
        <ListPlus className="h-4 w-4 mr-1" />
        <span>Dodaj</span>
      </Button>
    </Link>
  );
};

export default DataTableNewRow;
