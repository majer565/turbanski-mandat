import { writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { logger } from "../../../lib/logger/client";
import { Request } from "../../../lib/logger/Logger";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("ticketFile");

    if (!file) throw new Error("Can't find uploaded file");

    let buffer;

    if (file instanceof File) {
      buffer = Buffer.from(await file.arrayBuffer());
    } else if (typeof file === "string") {
      buffer = Buffer.from(file);
    } else {
      throw new Error("Unsupported FormDataEntryValue type");
    }

    const storageDir = '/app/ticket_storage';
    const filename = "mandat-" + nanoid() + ".pdf";
    await writeFile(path.join(storageDir, filename), buffer);

    return NextResponse.json(filename);
  } catch (e) {
    logger.error("Can't save file:: " + e, Request.POST);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
