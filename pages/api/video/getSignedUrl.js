// pages/api/getSignedUrl.js
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    const { videoID } = req.query;

    try {
        const expiresAt = Math.floor(Date.now() / 1000) + 2 * 60 * 60 // URL expires in 2 hour
        const signedUrl = cloudinary.v2.url(`${videoID}.m3u8`, {
            resource_type: 'video',
            secure: true,
            sign_url: true,
            expires_at: expiresAt,
        });
        console.log(signedUrl);
        res.status(200).json({ url: signedUrl });
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate signed URL', error });
    }
}
