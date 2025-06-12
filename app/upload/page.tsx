"use client";

import type React from "react";

import { useState, useRef } from "react";

import { useFileDrop } from "@/hooks/use-file-drop";
import { uploadFile } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Loader2,
  Upload,
  File,
  Link,
  Mail,
  Check,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [method, setMethod] = useState<"link" | "email">("link");
  const [email, setEmail] = useState("");
  const [lockToUser, setLockToUser] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    fileUrl?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useFileDrop();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleFilesDrop = (files: FileList) => {
    if (files.length > 0) {
      setFile(files[0]);
      setResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast("Error: Please select a file to upload");
      return;
    }

    if (method === "email" && (!email || !email.includes("@"))) {
      toast("Error: Please enter a valid email address");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("file", file);

      const response = await uploadFile(formData);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.success) {
        setResult({
          success: true,
          message: response.message,
          fileUrl: response.fileUrl,
        });

        toast("File uploaded successfully!");

        // Reset form after successful upload
        if (formRef.current) {
          formRef.current.reset();
        }

        // Don't reset the file immediately for better UX
        setTimeout(() => {
          setFile(null);
          setUploadProgress(0);
        }, 3000);
      } else {
        setResult({
          success: false,
          message: response.message,
        });

        toast("Error: " + response.message);
      }
    } catch (error) {
      clearInterval(progressInterval);

      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });

      toast("Error: An unexpected error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setMethod("link");
    setEmail("");
    setLockToUser("");
    setIsLocked(false);
    setResult(null);
    setUploadProgress(0);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <section className="flex justify-center items-center flex-col w-screen h-screen">
      <div className="container max-w-3xl py-10 px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            Upload File
          </h1>
          <p className="mt-2 text-muted-foreground md:text-xl">
            Share your files securely with anyone, anywhere
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upload a file</CardTitle>
            <CardDescription>
              Drag and drop your file or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }
                ${file ? "bg-primary/5 border-primary/50" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, handleFilesDrop)}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading}
                />

                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-3">
                      <File className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    {!isUploading && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                      >
                        Change file
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium text-foreground">
                      Drag and drop your file here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Maximum file size: 10MB
                    </p>
                  </div>
                )}
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploading...</span>
                    <span className="text-muted-foreground">
                      {uploadProgress}%
                    </span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {/* Result Alert */}
              {result && (
                <Alert variant={result.success ? "default" : "destructive"}>
                  {result.success ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {result.success ? "Success" : "Error"}
                  </AlertTitle>
                  <AlertDescription>
                    {result.message}
                    {result.success && result.fileUrl && method === "link" && (
                      <div className="mt-2">
                        <p className="font-medium">Share this link:</p>
                        <div className="flex mt-1">
                          <Input
                            value={`${window.location.origin}${result.fileUrl}`}
                            readOnly
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            className="ml-2"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${window.location.origin}${result.fileUrl}`
                              );
                              toast("Link copied to clipboard!");
                            }}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* Sharing Options */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Sharing Options
                  </h3>
                  <RadioGroup
                    defaultValue="link"
                    value={method}
                    onValueChange={(value) =>
                      setMethod(value as "link" | "email")
                    }
                    className="flex flex-col space-y-2"
                    name="method"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="link" id="link" />
                      <Label htmlFor="link" className="flex items-center">
                        <Link className="mr-2 h-4 w-4" />
                        Create shareable link
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Send via email
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {method === "email" && (
                  <div className="space-y-2">
                    <Label htmlFor="email-input">Recipient Email</Label>
                    <Input
                      id="email-input"
                      name="email"
                      type="email"
                      placeholder="recipient@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required={method === "email"}
                    />
                  </div>
                )}

                {/* Security Options */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lock-to-user"
                      checked={isLocked}
                      onCheckedChange={(checked) => setIsLocked(!!checked)}
                    />
                    <Label
                      htmlFor="lock-to-user"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Lock file to specific user
                    </Label>
                  </div>

                  {isLocked && (
                    <div className="pl-6 pt-2">
                      <Label htmlFor="user-email" className="text-sm">
                        User Email
                      </Label>
                      <Input
                        id="user-email"
                        name="lockToUser"
                        type="email"
                        placeholder="user@example.com"
                        className="mt-1"
                        value={lockToUser}
                        onChange={(e) => setLockToUser(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Only this user will be able to access the file
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isUploading}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={!file || isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>Upload File</>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
