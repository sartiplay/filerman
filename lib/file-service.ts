export interface FileData {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  downloadUrl: string;
  isLocked: boolean;
  allowedUser?: string;
  expiresAt?: Date;
}

// This is a mock service that would be replaced with actual database/storage calls
export async function getFileById(fileId: string): Promise<FileData | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // For demo purposes, we'll return mock data for specific IDs and null for others
  if (fileId === "demo-pdf") {
    return {
      id: "demo-pdf",
      name: "sample-document.pdf",
      size: 2.4 * 1024 * 1024, // 2.4 MB
      type: "application/pdf",
      uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      downloadUrl: "/sample-document.pdf",
      isLocked: false,
    };
  } else if (fileId === "demo-image") {
    return {
      id: "demo-image",
      name: "sample-image.jpg",
      size: 1.2 * 1024 * 1024, // 1.2 MB
      type: "image/jpeg",
      uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      downloadUrl: "/sample-image.jpg",
      isLocked: true,
      allowedUser: "user@example.com",
    };
  } else if (fileId === "demo-doc") {
    return {
      id: "demo-doc",
      name: "project-proposal.docx",
      size: 3.7 * 1024 * 1024, // 3.7 MB
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      downloadUrl: "/project-proposal.docx",
      isLocked: false,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Expires in 3 days
    };
  } else if (fileId === "expired") {
    return {
      id: "expired",
      name: "expired-file.zip",
      size: 15.8 * 1024 * 1024, // 15.8 MB
      type: "application/zip",
      uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      downloadUrl: "/expired-file.zip",
      isLocked: false,
      expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Expired 1 day ago
    };
  }

  // Return null for any other ID to simulate "not found"
  return null;
}

export function getFileIcon(fileType: string): string {
  if (fileType.startsWith("image/")) {
    return "image";
  } else if (fileType.startsWith("video/")) {
    return "video";
  } else if (fileType.startsWith("audio/")) {
    return "audio";
  } else if (fileType === "application/pdf") {
    return "file-text";
  } else if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType === "application/msword"
  ) {
    return "file-text";
  } else if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    fileType === "application/vnd.ms-excel"
  ) {
    return "file-spreadsheet";
  } else if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    fileType === "application/vnd.ms-powerpoint"
  ) {
    return "file-presentation";
  } else if (
    fileType === "application/zip" ||
    fileType === "application/x-zip-compressed"
  ) {
    return "archive";
  } else {
    return "file";
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return bytes + " B";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function isExpired(expiresAt?: Date): boolean {
  if (!expiresAt) return false;
  return expiresAt.getTime() < Date.now();
}
