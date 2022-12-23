const {
  testing,
  auth,
  profile,
  category,
  transaction,
} = require("../controllers");

const PREFIX = "/api/v1";

module.exports = function (app) {
  app.use(`${PREFIX}/testing`, testing);
  app.use(`${PREFIX}/auth`, auth);
  app.use(`${PREFIX}/profile`, profile);
  app.use(`${PREFIX}/category`, category);
  app.use(`${PREFIX}/transaction`, transaction);
};
