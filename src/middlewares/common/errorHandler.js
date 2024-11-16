const createError = require("http-errors");

//404 not found handler
function notFoundHandler(req, re, next){
    next(createError(404, "Your request content was not found"));
}



module.exports = {
    notFoundHandler,
}