import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionId = params.sessionId;

    // In a real app, we would fetch from the database
    // For demo purposes, we'll return mock data
    if (sessionId === "demo-session") {
      return NextResponse.json({
        id: "demo-session",
        userId: "user123",
        type: "LINK",
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        files: [
          {
            id: "file1",
            name: "document.pdf",
            type: "application/pdf",
            size: 2.4 * 1024 * 1024,
            URL: "/storage/demo-session/document.pdf",
            fileSessionId: "demo-session",
            metadata: null,
          },
          {
            id: "file2",
            name: "image.jpg",
            type: "image/jpeg",
            size: 1.2 * 1024 * 1024,
            URL: "/storage/demo-session/image.jpg",
            fileSessionId: "demo-session",
            metadata: null,
          },
        ],
      });
    } else if (sessionId === "locked-session") {
      return NextResponse.json({
        id: "locked-session",
        userId: "user123",
        type: "LINK",
        isLocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        files: [
          {
            id: "file3",
            name: "confidential.docx",
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            size: 3.7 * 1024 * 1024,
            URL: "/storage/locked-session/confidential.docx",
            fileSessionId: "locked-session",
            metadata: null,
          },
        ],
      });
    }

    // If session not found
    return new NextResponse(null, { status: 404 });
  } catch (error) {
    console.error("Error fetching session:", error);
    return new NextResponse(null, { status: 500 });
  }
}
