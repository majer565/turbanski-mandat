"use client";

import { ListPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const DataTableNewRow = () => {
  return (
    <Link href="/dodaj">
      <Button variant="ghost" size="sm" className="ml-auto hidden h-8 lg:flex">
        <ListPlus className="h-4 w-4 mr-1 text-primary" />
        <span>Dodaj</span>
      </Button>
    </Link>
  );
};

export default DataTableNewRow;
