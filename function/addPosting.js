async function addPosting(collection, postObject, res, statusCode) {
  try {
    const postingData = new collection({ ...postObject });
    const savePostingData = await postingData.save();
    return res.status(statusCode).send(savePostingData);
  } catch (error) {
    if(error.code===11000){
      return res.send('you have already added this email')
    }
    if (error) statusCode = 404;
    console.log(error);
    return res.status(statusCode).send({ error: error.message });
  }
}
module.exports = addPosting;
