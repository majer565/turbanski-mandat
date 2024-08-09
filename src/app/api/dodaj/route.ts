import { writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

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

    const filename = "mandat-" + nanoid() + ".pdf";
    await writeFile(path.join(process.cwd(), "public/ticket_files/" + filename), buffer);

    return NextResponse.json(filename);
  } catch (e) {
    return NextResponse.json({ message: "Failed", status: 500 });
  }
}
