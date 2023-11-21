import photoProductService from "../services/ProductPhoto.service";

async function addPhotoToProduct(req, res, next) {
  try {
    const photoProduct = { ...req.body, ...req.file };

    const photoProductCreated = await photoProductService.create(photoProduct);

    res.status(201).json({ message: photoProductCreated });
  } catch (error) {
    next(error);
  }
}

async function getPhotosOfProduct(req, res, next) {
  try {
    const { pid } = req.params;

    const photoProducts = await photoProductService.getByFilter({
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
