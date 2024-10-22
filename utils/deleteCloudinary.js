import { v2 as cloudinary } from 'cloudinary';

const deleteAsset = async ({publicID,type}) => {
  try {
    const result = await cloudinary.uploader.destroy(publicID, {resource_type: type});
    return result;
  } catch (error) {
    console.error('Error deleting asset:', error);
    return error;
  }
};

export default deleteAsset;

// Example usage:
// deleteAsset('your-asset-public-id');
