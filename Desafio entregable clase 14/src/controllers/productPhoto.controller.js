import photoProductService from "../services/ProductPhoto.service.js";

async function addPhotoToProduct(req, res, next) {
  try {
    const file = {
      publicId: req.file.publicId,
      urlProductPhoto: req.file.url,
    };
    
    const photoProduct = { ...req.body, ...file };

    const photoProductCreated = await photoProductService.create(photoProduct);

    res.status(201).json({ message: photoProductCreated });
  } catch (error) {
    next(error);
  }
}

async function getPhotosOfProduct(req, res, next) {
  try {
    const { pid } = req.params;

    const photoProducts = await photoProductService.getAll({
      idProduct: pid,
    });

    res.status(201).json({ message: photoProducts });
  } catch (error) {
    next(error);
  }
}

async function deletePhotoProduct(req, res, next) {
  try {
    const { ppid } = req.params;

    const photoProductDeleted = await photoProductService.deleteById(ppid);

    res.status(201).json({ message: photoProductDeleted });
  } catch (error) {
    next(error);
  }
}

export { addPhotoToProduct, deletePhotoProduct, getPhotosOfProduct };
