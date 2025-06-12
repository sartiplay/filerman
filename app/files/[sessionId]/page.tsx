"use client";
import type {
  File as PrismaFile,
  FileSession,
  FileSessionType,
} from "@prisma/client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download,
  File,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  FileSpreadsheet,
  FileIcon as FilePresentation,
  Lock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Files,
  PackageOpen,
} from "lucide-react";

// Types for our component state
interface SessionWithFiles extends FileSession {
  files: PrismaFile[];
  user: {
    email: string;
  };
  allowList: {
    id: string;
    email: string;
  }[];
}

export default function SessionPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [session, setSession] = useState<SessionWithFiles | null | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<Record<string, boolean>>(
    {}
  );
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  // Simulated user from Clerk
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(
    null
  );

  useEffect(() => {
    // Simulate getting the current user from Clerk
    // In a real app, this would use Clerk's hooks or API
    setCurrentUser({ email: "user@example.com" });

    async function loadSession() {
      try {
        // In a real app, this would be a Prisma query
        // For demo purposes, we'll simulate fetching the session

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data based on sessionId
        if (sessionId === "demo-session") {
          setSession({
            id: "demo-session",
            userId: "user123",
            type: "LINK" as FileSessionType,
            isLocked: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: {
              email: "uploader@example.com",
            },
            allowList: [],
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
          setSession({
            id: "locked-session",
            userId: "user123",
            type: "LINK" as FileSessionType,
            isLocked: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: {
              email: "uploader@example.com",
            },
            allowList: [
              { id: "allowed1", email: "user@example.com" },
              { id: "allowed2", email: "another@example.com" },
            ],
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
              {
                id: "file4",
                name: "secret.pdf",
                type: "application/pdf",
                size: 1.8 * 1024 * 1024,
                URL: "/storage/locked-session/secret.pdf",
                fileSessionId: "locked-session",
                metadata: null,
              },
            ],
          });
        } else {
          setSession(null);
        }
      } catch (err) {
        setError("Failed to load file information. Please try again.");
        toast("Failed to load file information");
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [sessionId]);

  // Check if the current user has access to the session
  const hasAccess = () => {
    if (!session || !currentUser) return false;

    // If session is not locked, anyone has access
    if (!session.isLocked) return true;

    // If session is locked, check if the current user is in the allowList
    return session.allowList.some(
      (user) => user.email.toLowerCase() === currentUser.email.toLowerCase()
    );
  };

  const handleDownload = (fileId: string) => {
    if (!session) return;

    setIsDownloading((prev) => ({ ...prev, [fileId]: true }));

    // Simulate download delay
    setTimeout(() => {
      // In a real app, this would trigger the actual file download
      const file = session.files.find((f) => f.id === fileId);
      if (file) {
        toast(`${file.name} is being downloaded`);
      }
      setIsDownloading((prev) => ({ ...prev, [fileId]: false }));
    }, 1500);
  };

  const handleDownloadAll = () => {
    if (!session) return;

    setIsDownloadingAll(true);

    // Simulate download delay
    setTimeout(() => {
      toast(
        `${session.files.length} files are being downloaded as a zip archive`
      );
      setIsDownloadingAll(false);
    }, 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) {
      return bytes + " B";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + " KB";
    } else if (bytes < 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    } else {
      return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
    }
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Calculate total size of all files
  const getTotalSize = (): string => {
    if (!session) return "0 B";
    const totalBytes = session.files.reduce(
      (total, file) => total + file.size,
      0
    );
    return formatFileSize(totalBytes);
  };

  // Render loading state
  if (loading) {
    return (
      <section className="w-screen h-screen flex justify-center items-center flex-col">
        <div className="container max-w-3xl py-10 px-4 md:px-6">
          <Card className="w-full">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-32" />
            </CardFooter>
          </Card>
        </div>
      </section>
    );
  }

  // Render not found state
  if (!session) {
    return (
      <section className="w-screen h-screen flex justify-center items-center flex-col">
        <div className="container max-w-3xl py-10 px-4 md:px-6">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Files Not Found</AlertTitle>
            <AlertDescription>
              The files you are looking for do not exist or have been removed.
            </AlertDescription>
          </Alert>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Files Not Found</CardTitle>
              <CardDescription>
                The files you are looking for could not be found. They may have
                been deleted or the link might be incorrect.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you believe this is an error, please contact the person who
                shared these files with you.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
              >
                Return to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    );
  }

  // Render access denied state if the session is locked and the user doesn't have access
  if (session.isLocked && !hasAccess()) {
    return (
      <section className="w-screen h-screen flex justify-center items-center flex-col">
        <div className="container max-w-3xl py-10 px-4 md:px-6">
          <Alert variant="destructive" className="mb-6">
            <Lock className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              These files are locked and only accessible to specific users.
              Please sign in with an authorized email address.
            </AlertDescription>
          </Alert>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to access these files. Please sign in
                with an authorized email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you believe you should have access, please contact the person
                who shared these files with you.
              </p>
              {currentUser && (
                <p className="mt-2 text-sm text-muted-foreground">
                  You are currently signed in as{" "}
                  <span className="font-medium">{currentUser.email}</span>
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
              >
                Return to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    );
  }

  // Render file details and download options
  return (
    <section className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="container max-w-3xl py-10 px-4 md:px-6">
        {session.isLocked && hasAccess() && (
          <Alert className="mb-6">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Access Granted</AlertTitle>
            <AlertDescription>
              You have been verified and can now access these files.
            </AlertDescription>
          </Alert>
        )}

        <Card className="w-full">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <CardTitle>Shared Files</CardTitle>
                <CardDescription>
                  {session.files.length} file
                  {session.files.length !== 1 ? "s" : ""} shared via FilerMan
                </CardDescription>
              </div>
              <Button
                onClick={handleDownloadAll}
                disabled={isDownloadingAll}
                className="w-full sm:w-auto"
              >
                {isDownloadingAll ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Preparing...
                  </>
                ) : (
                  <>
                    <PackageOpen className="mr-2 h-4 w-4" />
                    Download All
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Files className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <p className="font-medium">
                    {session.files.length} file
                    {session.files.length !== 1 ? "s" : ""} • {getTotalSize()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Shared on {formatDate(session.createdAt)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Shared by {session.user.email}
                  </p>
                </div>
              </div>

              <div className="border rounded-lg divide-y divide-border">
                {session.files.map((file) => (
                  <div key={file.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        {renderFileIcon(file.type)}
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)} •{" "}
                            {file.type.split("/")[1].toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDownload(file.id)}
                        disabled={isDownloading[file.id]}
                        size="sm"
                      >
                        {isDownloading[file.id] ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </>
                        )}
                      </Button>
                    </div>

                    {isPreviewable(file.type) && (
                      <div className="mt-4 border rounded-lg p-4 bg-muted/30">
                        <p className="text-sm text-muted-foreground mb-2">
                          Preview
                        </p>
                        <div className="flex justify-center">
                          {file.type.startsWith("image/") ? (
                            <img
                              src="/placeholder.svg?height=200&width=300"
                              alt="File preview"
                              className="max-h-[200px] object-contain rounded"
                            />
                          ) : (
                            <div className="p-6 text-center text-muted-foreground">
                              <FileText className="h-12 w-12 mx-auto mb-2 text-primary/60" />
                              <p>Preview not available</p>
                              <p className="text-sm">
                                Download the file to view its contents
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              Return to Home
            </Button>
            {currentUser && (
              <p className="text-sm text-muted-foreground self-center">
                Signed in as {currentUser.email}
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

function renderFileIcon(fileType: string) {
  const iconClass = "h-10 w-10 text-primary";

  if (fileType.startsWith("image/")) {
    return <ImageIcon className={iconClass} />;
  } else if (fileType.startsWith("video/")) {
    return <Video className={iconClass} />;
  } else if (fileType.startsWith("audio/")) {
    return <Music className={iconClass} />;
  } else if (fileType === "application/pdf") {
    return <FileText className={iconClass} />;
  } else if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType === "application/msword"
  ) {
    return <FileText className={iconClass} />;
  } else if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    fileType === "application/vnd.ms-excel"
  ) {
    return <FileSpreadsheet className={iconClass} />;
  } else if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    fileType === "application/vnd.ms-powerpoint"
  ) {
    return <FilePresentation className={iconClass} />;
  } else if (
    fileType === "application/zip" ||
    fileType === "application/x-zip-compressed"
  ) {
    return <Archive className={iconClass} />;
  } else {
    return <File className={iconClass} />;
  }
}

function isPreviewable(fileType: string): boolean {
  return fileType.startsWith("image/") || fileType === "application/pdf";
}
