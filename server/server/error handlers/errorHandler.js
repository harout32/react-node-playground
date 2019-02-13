exports.catchErrors = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      return next(err);
    });
  };
};

exports.notFound = (error, req, res, next) => {
  if (error.status) return next(error);

  // console.log(error);
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
};
exports.apiHandle = (err, req, res, next) => {
  const errorDetails = {
    message: err.message,
    status: err.status,
  };

  // res.status(err.status || 500);
  // // based on accept http header
  // res.format({
  //   'text/html': () => {
  //     res.render('error',errorDetails);
  //   },
  //   'application/json': () => res.json(errorDetails)
  // })
  res.status(err.status || 500).json(errorDetails);
};
