"use server";

import { revalidatePath } from "next/cache";
import { db as prisma } from "@/lib/db";
import { User } from "@prisma/client";

interface AuthResult {
  success: boolean;
  message: string;
}

export async function authenticateForSession(
  formData: FormData
): Promise<AuthResult> {
  try {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const sessionId = formData.get("sessionId") as string;
    const email = formData.get("email") as string;

    // Validate email
    if (!email || !email.includes("@")) {
      return {
        success: false,
        message: "Please enter a valid email address",
      };
    }

    // Find the session
    const session = await prisma.fileSession.findUnique({
      where: { id: sessionId },
      include: {
        allowList: true,
      },
    });

    if (!session) {
      return {
        success: false,
        message: "Session not found",
      };
    }

    // Check if the session is locked and if the user is in the allow list
    if (session.isLocked) {
      const isAllowed = session.allowList.some(
        (user: User) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (!isAllowed) {
        return {
          success: false,
          message: "You don't have permission to access these files",
        };
      }
    }

    // In a real app, you would set a cookie or session here
    // For demo purposes, we'll just return success

    // Revalidate the path to update the UI
    revalidatePath(`/files/${sessionId}`);

    return {
      success: true,
      message: "Authentication successful",
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      success: false,
      message: "An error occurred during authentication. Please try again.",
    };
  }
}
