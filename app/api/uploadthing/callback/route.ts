// This is the UploadThing callback url endopint.
export const POST = async (req: Request) => {
  console.log("[UploadThing Callback] POST request received");
  const body = await req.json();

  console.log("[UploadThing Callback] Request body:");
  console.log("\n\n\n --------- \n\n\n");
  console.log(body);

  console.log("\n\n\n --------- \n\n\n");

  if (!body) {
    console.error("[UploadThing Callback] No body provided in request");
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "Files uploaded successfully",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
