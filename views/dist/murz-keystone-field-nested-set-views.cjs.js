'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./murz-keystone-field-nested-set-views.cjs.prod.js");
} else {
  module.exports = require("./murz-keystone-field-nested-set-views.cjs.dev.js");
}
