async function deletingPost(collection, id, res, statusCode) {
    try {
      const savePostingData = await collection.findByIdAndDelete(id);
      return res.status(statusCode).send({isDeleted:true,savePostingData});
    } catch (error) {
      if (error) statusCode = 404;
      console.log(error);
      return res.status(statusCode).send({ error: error.message });
    }
  }
  module.exports = deletingPost;