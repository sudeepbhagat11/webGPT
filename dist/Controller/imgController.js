import OpenAI from "openai";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export const imgController = async (req, res, next) => {
    const { prompt } = req.body;
    try {
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: "512x512",
        });
        console.log("aiResponse:", aiResponse);
        // const imageUrl = aiResponse.data;
        const imageUrls = aiResponse.data.map((image) => image.url);
        // Assuming you only need the first image URL
        const imageUrl = imageUrls[0];
        const storedImg = await cloudinary.uploader.upload(imageUrl);
        const cloudinaryUrl = cloudinary.url(storedImg.public_id, {
            secure: true,
            transformation: [{ width: 512, height: 512, crop: "fill" }],
        });
        res.status(200).json({
            success: true,
            //   data: imageUrl,
            data: {
                imageUrl: cloudinaryUrl,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: "The image couldn't be generated",
        });
    }
};
//# sourceMappingURL=imgController.js.map