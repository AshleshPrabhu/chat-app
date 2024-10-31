import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Modify the upload function to accept a buffer
const uploadOnCloudinary = async (fileBuffer, fileName) => {
    try {
        if (!fileBuffer) return null;

        // Upload file buffer to Cloudinary
        const response = await cloudinary.uploader.upload_stream({
            resource_type: "auto",
            public_id: fileName // Optional: you can set a public ID for the uploaded file
        }, (error, result) => {
            if (error) {
                console.error("Upload error:", error);
                return null;
            }
            console.log("File uploaded successfully", result);
            return result;
        });

        // Create a readable stream from the buffer and pipe it to Cloudinary
        const stream = require('stream');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileBuffer);
        bufferStream.pipe(response);

        return response.secure_url; // Return the URL of the uploaded file
    } catch (error) {
        console.error("Upload error:", error);
        return null;
    }
};

export { uploadOnCloudinary };