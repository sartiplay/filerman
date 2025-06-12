import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: `${
      process.env.BASE_URL || "http:localhost:3000"
    }/api/uploadthing/callback`, // The URL to redirect to after upload
  },

  // Apply an (optional) custom config:
  // config: { ... },
});

export const runtime = "nodejs";
