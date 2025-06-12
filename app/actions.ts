"use server";

import { revalidatePath } from "next/cache";

type UploadMethod = "link" | "email";

interface UploadResult {
  success: boolean;
  message: string;
  fileId?: string;
  fileUrl?: string;
}

export async function uploadFile(formData: FormData): Promise<UploadResult> {
  try {
    // Simulate a delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const file = formData.get("file") as File;
    const method = formData.get("method") as UploadMethod;
    const email = formData.get("email") as string;
    const lockToUser = formData.get("lockToUser") as string;

    // Validate file
    if (!file || file.size === 0) {
      return {
        success: false,
        message: "Please select a file to upload",
      };
    }

    // Check file size (10MB limit for demo)
    if (file.size > 10 * 1024 * 1024) {
      return {
        success: false,
        message: "File size exceeds 10MB limit",
      };
    }

    // Validate email if method is email
    if (method === "email" && (!email || !email.includes("@"))) {
      return {
        success: false,
        message: "Please enter a valid email address",
      };
    }

    // In a real app, you would upload the file to storage here
    // For demo purposes, we'll simulate a successful upload

    const fileId = Math.random().toString(36).substring(2, 15);
    const fileUrl = `/files/${fileId}`;

    // Revalidate the path to update the UI
    revalidatePath("/upload");

    return {
      success: true,
      message:
        method === "link"
          ? "File uploaded successfully! Link has been created."
          : `File uploaded successfully! Email sent to ${email}.`,
      fileId,
      fileUrl,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      message: "An error occurred while uploading the file. Please try again.",
    };
  }
}
