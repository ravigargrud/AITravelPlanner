import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (localFile) => {
    try {
        if (!localFile) return null;

        const result = await cloudinary.uploader.upload(localFile, {
            resource_type: "auto",
        });
        console.log(result);
        fs.unlinkSync(localFile);
        return result;
    }
    catch (error) {
        console.log("Error uploading to Cloudinary", error);
        fs.unlinkSync(localFile);
    }
}

export default uploadToCloudinary;