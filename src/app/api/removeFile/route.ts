import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const filename = await request.json();
    console.log("REMOVE_FILE:: ", filename);
    const storageDir = '/app/ticket_storage';
    await unlink(path.join(storageDir, filename));

    return NextResponse.json(filename);
  } catch (e) {
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
