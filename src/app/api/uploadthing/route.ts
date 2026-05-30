import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Mengekspos method GET dan POST untuk infrastruktur UploadThing
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // Opsi tambahan untuk mengatur rahasia jika diperlukan
  // config: { ... }
  
});