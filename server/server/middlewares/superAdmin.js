exports.superAdmin = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== 'superAdmin') return res.status(403).send({ message: 'Not Allowed', status: 403 });
  return next();
};
