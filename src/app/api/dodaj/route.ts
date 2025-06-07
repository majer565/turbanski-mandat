import { writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { logger } from "../../../lib/logger/client";
import { LoggerRequest } from "../../../lib/logger/Logger";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("ticketFile");

    if (!file) {
      throw new Error("Can't find uploaded file");
    }

    let buffer: Uint8Array;

    if (typeof (file as any).arrayBuffer === "function") {
      const arrayBuffer = await (file as any).arrayBuffer();
      buffer = new Uint8Array(arrayBuffer);
    } else if (typeof file === "string") {
      buffer = new TextEncoder().encode(file);
    } else {
      throw new Error("Unsupported file format");
    }

    const storageDir = "/app/ticket_storage";
    const filename = "mandat-" + nanoid() + ".pdf";
    await writeFile(path.join(storageDir, filename), buffer);

    return NextResponse.json(filename);
  } catch (e) {
    logger.error("Can't save file:: " + e, LoggerRequest.POST);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
