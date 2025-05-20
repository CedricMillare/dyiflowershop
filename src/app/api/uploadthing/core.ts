import { createUploadthing, type FileRouter } from "uploadthing/next";
<<<<<<< HEAD
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { image, images } from "~/server/db/schema";
=======
>>>>>>> bccc1bd1e75696105f1abf238816f01f066158b6

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
<<<<<<< HEAD
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth();

      // Check if the user is authenticated
      if (!user) throw new UploadThingError("Unauthorized");

      // Is user verified to upload? (optional)
      const fullUserData = await (
        await clerkClient()
      ).users.getUser(user.userId);

      if (fullUserData?.privateMetadata?.["can-upload"] !== true)
        throw new UploadThingError("User Does Not Have Upload Permission");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      await db.insert(image).values({
        name: file.name,
        url: file.ufsUrl,
        userId: metadata.userId,
      })

      await db.insert(images).values({
        name: file.name,
        url: file.ufsUrl,
        userId: metadata.userId,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
=======
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ file }) => {
      console.log("Upload complete for", file.name);
      return { url: file.url };
>>>>>>> bccc1bd1e75696105f1abf238816f01f066158b6
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
