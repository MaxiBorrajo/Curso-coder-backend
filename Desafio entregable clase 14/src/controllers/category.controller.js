import categorizedService from "../services/Categorized.service";
import categoryService from "../services/Category.service";

async function getCategories(req, res, next) {
  try {
    const categories = await categoryService.getAll();

    res.status(200).json({ message: categories });
  } catch (error) {
    next(error);
  }
}

async function addProductToCategory(req, res, next) {
  try {
    const addedProductToCategory = await categorizedService.create(req.body);

    res.status(200).json({ message: addedProductToCategory });
  } catch (error) {
    next(error);
  }
}

async function deleteProductFromCategory(req, res, next) {
  try {
    const { ctid, pid } = req.params;
    const deletedProductFromCategory =
      await categorizedService.deleteProductFromCategory(pid, ctid);

    res.status(200).json({ message: deletedProductFromCategory });
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const createdCategory = await categoryService.create(req.body);

    res.status(200).json({ message: createdCategory });
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const { ctid } = req.params;

    const deletedCategory = await categoryService.deleteById(ctid);

    res.status(200).json({ message: deletedCategory });
  } catch (error) {
    next(error);
  }
}

async function getProductsByCategory(req, res, next) {
  try {
    const { page, sort } = req.query;
    const { ctid } = req.params;

    const products = await categoryService.getProductsByCategory(
      ctid,
      10,
      page,
      sort
    );

    res.status(200).json({ message: products });
  } catch (error) {
    next(error);
  }
}

export {
  addProductToCategory,
  createCategory,
  deleteCategory,
  deleteProductFromCategory,
  getCategories,
  getProductsByCategory,
};
