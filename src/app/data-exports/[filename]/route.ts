import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;

    // Security: Only allow specific file patterns
    if (!filename.match(/^(subscribers|stats)-[a-f0-9]{16}\.(txt|json)$/)) {
      return NextResponse.json(
        { error: "Invalid filename" },
        { status: 400 }
      );
    }

    const publicDataDir = path.join(process.cwd(), "public", "data-exports");
    const filePath = path.join(publicDataDir, filename);

    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    const fileContent = await readFile(filePath, "utf-8");

    // Set appropriate content type
    const contentType = filename.endsWith('.json')
      ? 'application/json'
      : 'text/plain';

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=60, s-maxage=60',
      },
    });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json(
      { error: "Failed to read file" },
      { status: 500 }
    );
  }
}
