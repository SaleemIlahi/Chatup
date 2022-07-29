exports.errorHandler = (err, req, res, next) => {
  const codeStatus = err.status || 500;
  const codeMsg = err.message || "Internal Serval Error";

  res.status(codeStatus).json({
    success: false,
    status: codeStatus,
    message: codeMsg,
  });
};
