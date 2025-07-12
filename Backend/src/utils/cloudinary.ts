import { env } from "@/validators/env";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_secret: env.CLOUDINARY_API_SECRET,
  api_key: env.CLOUDINARY_API_KEY,
});

export const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) {
      throw new Error("No file path provided");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    return null;
  }
};
