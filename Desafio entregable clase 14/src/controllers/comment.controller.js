import commentService from "../services/Comment.service.js";

async function deleteComment(req, res, next) {
  try {
    const { cid } = req.params;

    const deletedComment = await commentService.deleteById(cid);

    res.status(200).json({ message: deletedComment });
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
    
    const postedComment = await commentService.create(comment);

    res.status(200).json({ message: postedComment });
  } catch (error) {
    next(error);
  }
}

async function updateComment(req, res, next) {
  try {
    const { cid } = req.params;

    const updatedComment = await commentService.updateById(cid, req.body);

    res.status(200).json({ message: updatedComment });
  } catch (error) {
    next(error);
  }
}

async function getCommentOfCurrentUser(req, res, next) {
  try {
    const uid = req.user._id;
    const { pid } = req.params;

    const comments = await commentService.getByFilter({
      idUser: uid,
      idProduct: pid,
    });

    res.status(200).json({ message: comments });
  } catch (error) {
    next(error);
  }
}

async function getCommentsOfProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const { limit } = req.query;

    const comments = await commentService.getCommentsOfProduct(pid, limit);

    res.status(200).json({ message: comments });
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
