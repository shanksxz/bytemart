import { createUploadthing, type FileRouter } from "uploadthing/express";
import ApiError from "../utils/api-error";

const f = createUploadthing();

export const uploadRouter: FileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
  // .middleware(({ req }) => {
  //   const user = req.user;
  //   if (!user || user.role !== "admin") {
  //     throw ApiError.forbidden("Only admins can upload images");
  //   }
  //   return { userId: user.id };
  // })
  .onUploadComplete(({ metadata, file }) => {
    // console.log("Upload complete for userId:", metadata.userId);
    return { fileUrl: file.ufsUrl };
  }),
};

export type OurFileRouter = typeof uploadRouter;
