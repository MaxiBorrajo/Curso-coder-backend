import buyService from "../services/Buys.service";

async function buyProduct(req, res, next) {
  try {
    const purchase = await buyService.create(req.body);

    res.status(200).json({ message: purchase });
  } catch (error) {
    next(error);
  }
}

async function getHistoryBuysOfCurrentUser(req, res, next) {
  try {
    const { id } = req.user._id;
    const { page } = req.query;

    const history = await buyService.getHistoryOfBuys(id, 10, page);

    res.status(200).json({ message: history });
  } catch (error) {
    next(error);
  }
}

async function productIsBought(req, res, next) {
  try {
    const { id } = req.user._id;
    const { idProduct } = req.params;

    const productBought = await buyService.productAlreadyBuy(id, idProduct);

    res.status(200).json({ message: productBought });
  } catch (error) {
    next(error);
  }
}

export { getHistoryBuysOfCurrentUser, productIsBought, buyProduct };
