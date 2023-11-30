import commentService from "../services/Comment.service.js";
import { customResponse } from "../utils.js";

async function deleteComment(req, res, next) {
  try {
    const { cid } = req.params;

    const result = await commentService.deleteById(cid);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function postComment(req, res, next) {
  try {
    const comment = {
      ...req.body,
      idUser: req.user._id,
    };

    const result = await commentService.create(comment);

    return customResponse(res, 201, result);
  } catch (error) {
    next(error);
  }
}

async function updateComment(req, res, next) {
  try {
    const { cid } = req.params;

    const result = await commentService.updateById(cid, req.body);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function getCommentOfCurrentUser(req, res, next) {
  try {
    const uid = req.user._id;

    const { pid } = req.params;

    const result = await commentService.getByFilter({
      idUser: uid,
      idProduct: pid,
    });

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

async function getCommentsOfProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const { limit } = req.query;

    const result = await commentService.getCommentsOfProduct(pid, limit);

    return customResponse(res, 200, result);
  } catch (error) {
    next(error);
  }
}

export {
  deleteComment,
  getCommentOfCurrentUser,
  getCommentsOfProduct,
  postComment,
  updateComment,
};
