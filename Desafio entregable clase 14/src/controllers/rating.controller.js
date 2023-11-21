import ratingService from "../services/Rating.service";

async function rateProduct(req, res, next) {
  try {
    const ratedProduct = await ratingService.create(req.body);

    res.status(200).json({ message: ratedProduct });
  } catch (error) {
    next(error);
  }
}

async function updateRate(req, res, next) {
  try {
    const { rid } = req.params;

    const ratedProduct = await ratingService.updateById(rid, req.body);

    res.status(200).json({ message: ratedProduct });
  } catch (error) {
    next(error);
  }
}

async function getRatingOfProduct(req, res, next) {
  try {
    const { pid } = req.params;

    const ratedProduct = await ratingService.getPromedyOfRatingProduct(pid);

    res.status(200).json({ message: ratedProduct });
  } catch (error) {
    next(error);
  }
}

async function productsOrderByRating(req, res, next) {
  try {
    const { page, sort } = req.query;

    const ratedProducts = await ratingService.getProductsOrderByRating(
      10,
      page,
      sort
    );

    ratedProducts.status =
      ratedProducts.payload.length > 0 ? "success" : "error";

    delete ratedProducts.totalDocs;
    delete ratedProducts.limit;
    delete ratedProducts.pagingCounter;

    ratedProducts.prevLink = ratedProducts.hasPrevPage
      ? `http://localhost:8080/api/products?page=${ratedProducts.prevPage}&sort=${sort}`
      : null;
    ratedProducts.nextLink = ratedProducts.hasNextPage
      ? `http://localhost:8080/api/products?page=${ratedProducts.nextPage}&sort=${sort}`
      : null;

    res.status(200).json({ message: ratedProducts });
  } catch (error) {
    next(error);
  }
}

export { getRatingOfProduct, updateRate, rateProduct, productsOrderByRating, };
