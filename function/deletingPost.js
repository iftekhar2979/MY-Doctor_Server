async function deletingPost(collection, id, res, statusCode) {
    try {
      const savePostingData = await collection.findByIdAndDelete(id);
      res.status(200).send({
        message: 'profile deleted Successfully',
        idDeleted: true,
        savePostingData,
      });
    } catch (error) {
      if (error) statusCode = 404;
      console.log(error);
      return res.status(statusCode).send({ error: error.message });
    }
  }
  module.exports = deletingPost;