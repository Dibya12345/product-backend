const errorMiddleware = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.status(statusCode || 500).json({
    success: false,
    errors: [
      {
        msg: message,
      },
    ],
  });
};

export default errorMiddleware;
