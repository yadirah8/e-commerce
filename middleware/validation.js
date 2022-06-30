const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };
    try {
      // req.body = await schema.validateAsync(req.body, validationOptions);
      req.body = await schema.validateAsync(req.body, validationOptions);
      next();
    } catch (err) {
      const errors = [];

      if (!errors.isEmpty()) {
        err.details.forEach((error) => {
          errors.push(error.message);
        });
        res.status(400).send({ errors: errors });
      }
    }
  };
};

module.exports = validationMiddleware;
