import multer from "multer";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
  secure: true,
});

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single("image");

async function uploadImageToCloudinary(file) {
  try {
    const uploaded_image = await cloudinary.v2.uploader.upload(file, {
      resource_type: "auto",
      transformation: [
        {
          width: 300,
          height: 300,
          aspect_ratio: "1:1",
          crop: "fill_pad",
          gravity: "auto",
        },
      ],
    });

    const uploadedImageInfo = {
      public_id: uploaded_image.public_id,
      url: uploaded_image.secure_url,
    };

    return uploadedImageInfo;
  } catch (error) {
    throw error;
  }
}

async function deleteImageInCloud(publicId) {
  //check
  try {
    const deletedImage = await cloudinary.v2.uploader.destroy(publicId);

    return deletedImage;
  } catch (error) {
    throw error;
  }
}

async function processImage(req, res, next) {
  try {
    if (!req.file) {
      return next();
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");

    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const cloudInfo = await uploadImageToCloudinary(dataURI);

    req.file.publicId = cloudInfo.public_id;

    req.file.url = cloudInfo.url;

    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  multerUploads,
  processImage,
  deleteImageInCloud,
  uploadImageToCloudinary,
};
