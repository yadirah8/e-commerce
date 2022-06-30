const Joi = require("joi");

const register = Joi.object({
  username: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
  isAdmin: Joi.bool(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
});

module.exports = { register, login };
