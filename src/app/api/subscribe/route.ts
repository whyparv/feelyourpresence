import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import crypto from "crypto";

// Generate a unique hash for the public URL (change this to regenerate URL)
const PUBLIC_DATA_HASH = crypto
  .createHash("sha256")
  .update("feelyourpresence-subscribers-2024")
  .digest("hex")
  .substring(0, 16);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Define the path for storing emails (publicly accessible)
    const publicDataDir = path.join(process.cwd(), "public", "data-exports");
    const filePath = path.join(publicDataDir, `subscribers-${PUBLIC_DATA_HASH}.txt`);

    // Create data directory if it doesn't exist
    if (!existsSync(publicDataDir)) {
      await mkdir(publicDataDir, { recursive: true });
    }

    // Read existing emails to check for duplicates
    let existingEmails = "";
    if (existsSync(filePath)) {
      existingEmails = await readFile(filePath, "utf-8");
    }

    // Check if email already exists
    if (existingEmails.includes(email)) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }

    // Append new email with timestamp
    const timestamp = new Date().toISOString();
    const newEntry = `${email} | ${timestamp}\n`;

    await writeFile(filePath, existingEmails + newEntry, "utf-8");

    // Also save subscriber count and last updated time in a JSON file
    const subscribers = existingEmails.split("\n").filter((line) => line.trim());
    const statsFilePath = path.join(publicDataDir, `stats-${PUBLIC_DATA_HASH}.json`);

    await writeFile(
      statsFilePath,
      JSON.stringify(
        {
          totalSubscribers: subscribers.length + 1,
          lastUpdated: timestamp,
          publicUrl: `/data-exports/subscribers-${PUBLIC_DATA_HASH}.txt`,
        },
        null,
        2
      ),
      "utf-8"
    );

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed!",
        dataUrl: `/data-exports/subscribers-${PUBLIC_DATA_HASH}.txt`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve the public data URL
export async function GET() {
  return NextResponse.json({
    subscribersUrl: `/data-exports/subscribers-${PUBLIC_DATA_HASH}.txt`,
    statsUrl: `/data-exports/stats-${PUBLIC_DATA_HASH}.json`,
  });
}
