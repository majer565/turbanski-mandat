import { Driver } from "@prisma/client";

export type DriverWithoutId = Omit<Driver, "id">;
