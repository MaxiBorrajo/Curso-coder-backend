import ratingService from "../services/Rating.service.js";

async function rateProduct(req, res, next) {
  try {
    const rating = { ...req.body, ...{ idUser: req.user._id } };
    const ratedProduct = await ratingService.create(rating);

    res.status(200).json({ message: ratedProduct });
  } catch (error) {
    next(error);
  }
}

async function getRatingOfProduct(req, res, next) {
  try {
    const { pid } = req.params;

    const ratedProduct = await ratingService.getRatingProduct(pid);

    res.status(200).json({ message: ratedProduct });
  } catch (error) {
    next(error);
  }
}

async function getRatingOfCurrentUser(req, res, next) {
  try {
    const uid = req.user._id;
    const { pid } = req.params;

    const ratedProduct = await ratingService.getByFilter({
      idUser: uid,
      idProduct: pid,
    });

    res.status(200).json({ message: ratedProduct });
  } catch (error) {
    next(error);
  }
}

async function getMostRatedProductsOfLastWeek(req, res, next) {
  try {
    const ratedProducts = await ratingService.getMostValueProductsRecently();

    res.status(200).json({ message: ratedProducts });
  } catch (error) {
    next(error);
  }
}

export {
  getRatingOfProduct,
  rateProduct,
  getRatingOfCurrentUser,
  getMostRatedProductsOfLastWeek,
};
