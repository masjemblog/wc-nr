const express = require("express");
const serverless = require("serverless-http");
const processRequest = require("./app/process-request.js");
const app = express();
app.disable("x-powered-by");
app.enable("trust proxy");
app.all("*", processRequest);
module.exports = app;
module.exports.handler = serverless(app);
