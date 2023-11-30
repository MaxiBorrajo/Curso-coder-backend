import photoProductService from "../services/ProductPhoto.service.js";
import { customResponse } from "../utils.js";

async function addPhotoToProduct(req, res, next) {
  try {
    const file = {
      publicId: req.file.publicId,
      urlProductPhoto: req.file.url,
    };

    const photoProduct = { ...req.body, ...file };

    const result = await photoProductService.create(photoProduct);

    return customResponse(res, 201, result);
  } catch (error) {
    next(error);
  }
}

async function getPhotosOfProduct(req, res, next) {
  try {
    const { pid } = req.params;

    const result = await photoProductService.getAll({
      idProduct: pid,
    });

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function deletePhotoProduct(req, res, next) {
  try {
    const { ppid } = req.params;

    const result = await photoProductService.deleteById(ppid);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

export { addPhotoToProduct, deletePhotoProduct, getPhotosOfProduct };
