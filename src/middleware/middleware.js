const jsonMiddleware = require("express").json;
const logger = require("morgan");
const {sanitizer} = require("./sanitizer");
const {request} = require("./request");
const {cors} = require("./cors");
const {helmet} = require("./helmet");
const middlewares = [
    logger("common"),
    cors(),
    helmet(),
    jsonMiddleware(),
    sanitizer,
    request
];

exports.middlewares = middlewares;