import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(_req: Request, { params }: { params: { filename: string } }) {
  try {
    const filename = params.filename;

    const filePath = path.join("/app/ticket_storage/", filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          message:
            "Błąd. Nie znaleziono pliku. Skontaktuj się z administratorem.",
        },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve file" },
      { status: 500 }
    );
  }
}
