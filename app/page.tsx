import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Mail, Share2, Upload } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full flex justify-center items-center flex-col py-12 md:py-24 lg:py-32 border-b border-border">
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Simple. Secure. Fast.
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                Share files with anyone, anywhere
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                FilerMan makes it easy to upload, share, and manage your files.
                Create shareable links or send files directly to email
                addresses.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link href="/upload">
                    Start uploading <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <img
                  src="/placeholder.svg?height=350&width=600"
                  alt="FilerMan dashboard preview"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full flex justify-center items-center flex-col py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                Everything you need to share files
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                FilerMan provides all the tools you need to securely share your
                files with anyone, anywhere.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 pt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Easy Upload</h3>
              <p className="text-sm text-muted-foreground text-center">
                Drag and drop files or select them from your device.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Shareable Links
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Generate links to share your files with anyone.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Email Delivery
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Send files directly to email addresses.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Secure Access
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Lock files to specific users for enhanced security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full flex justify-center items-center flex-col py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                Ready to start sharing?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users who trust FilerMan for their file
                sharing needs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="/upload">
                  Upload now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex justify-center items-center flex-col py-6 border-t border-border mt-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} FilerMan. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground"
                href="/terms"
              >
                Terms
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground"
                href="/privacy"
              >
                Privacy
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground"
                href="/contact"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
