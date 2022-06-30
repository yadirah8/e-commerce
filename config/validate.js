const envalid = require("envalid");

const validateEnv = () => {
  envalid.cleanEnv(process.env, {
    NODE_ENV: envalid.str({ choices: ["local", "staging", "production"] }),
    DATABASE_URL: envalid.str(),
    DATABASE_NAME: envalid.str(),
    PORT: envalid.port({ default: 8081 }),
    JWT_SECRETS: envalid.str(),
    STRIPE_KEY: envalid.str(),
  });
};

module.exports = validateEnv;
