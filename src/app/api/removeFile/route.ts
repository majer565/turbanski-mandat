import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { logger } from "../../../lib/logger/client";
import { Request } from "../../../lib/logger/Logger";

export async function POST(request: NextRequest) {
  try {
    const filename = await request.json();
    const storageDir = '/app/ticket_storage';
    await unlink(path.join(storageDir, filename));

    logger.info(`File ${filename} removed successfully.`, Request.POST);
    return NextResponse.json(filename);
  } catch (e) {
    logger.error("Can't remove file:: " + e, Request.POST);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
