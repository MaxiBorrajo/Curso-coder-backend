function errorHandlerMiddleware(err, req, res, next) {
  console.error(err)
  const message = {
    Error: err.message
      ? `Something went wrong. Error: ${err.message}`
      : "Unknown error",
  };

  res.status(500).json(message);
}

export default errorHandlerMiddleware; 
