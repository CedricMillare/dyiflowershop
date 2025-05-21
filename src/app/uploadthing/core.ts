import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema"; // Ensure this matches your actual table export

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await auth();

      if (!user || !user.userId) {
        throw new UploadThingError("Unauthorized");
      }

      const fullUserData = await clerkClient.users.getUser(user.userId);

      if (fullUserData?.privateMetadata?.["can-upload"] !== true) {
        throw new UploadThingError("User does not have upload permission");
      }

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);

      await db.insert(images).values({
        name: file.name,
        url: file.ufsUrl,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId }; // ✅ Return is now inside the callback
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
