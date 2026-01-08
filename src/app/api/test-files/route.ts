import { NextResponse } from "next/server";
import { existsSync, readdirSync } from "fs";
import path from "path";

export async function GET() {
  const publicDataDir = path.join(process.cwd(), "public", "data-exports");

  const exists = existsSync(publicDataDir);
  let files: string[] = [];

  if (exists) {
    try {
      files = readdirSync(publicDataDir);
    } catch (error) {
      return NextResponse.json({
        error: "Cannot read directory",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return NextResponse.json({
    directoryExists: exists,
    path: publicDataDir,
    files: files,
    filesCount: files.length,
  });
}
