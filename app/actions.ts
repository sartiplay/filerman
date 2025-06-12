"use server";

import { revalidatePath } from "next/cache";

interface UploadResult {
  success: boolean;
  message: string;
  sessionId?: string;
  sessionUrl?: string;
}

export async function uploadFiles(formData: FormData): Promise<UploadResult> {
  try {
    // Simulate a delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const files = formData.getAll("file") as File[];
    const method = formData.get("method") as string;
    const email = formData.get("email") as string;
    const isLocked = formData.get("isLocked") === "true";
    const lockToUser = formData.get("lockToUser") as string;
    const userEmail = formData.get("userEmail") as string;

    // Validate files
    if (!files || files.length === 0 || files[0].size === 0) {
      return {
        success: false,
        message: "Please select at least one file to upload",
      };
    }

    // Check file size (10MB limit for demo)
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        return {
          success: false,
          message: `File ${file.name} exceeds 10MB limit`,
        };
      }
    }

    // Validate email if method is email
    if (method === "EMAIL" && (!email || !email.includes("@"))) {
      return {
        success: false,
        message: "Please enter a valid email address",
      };
    }

    // In a real app, we would use Clerk to get the current user
    // and then use Prisma to create the file session

    // For demo purposes, we'll simulate a successful upload
    const sessionId = `session-${Math.random().toString(36).substring(2, 15)}`;

    // Revalidate the path to update the UI
    revalidatePath("/upload");

    return {
      success: true,
      message:
        method === "EMAIL"
          ? `Files uploaded successfully! Email sent to ${email}.`
          : "Files uploaded successfully! Link has been created.",
      sessionId,
      sessionUrl: `/files/${sessionId}`,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      message: "An error occurred while uploading the files. Please try again.",
    };
  }
}
