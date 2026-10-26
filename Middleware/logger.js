const logger = (req, res, next) => {
    console.log("Request received!");
    console.log("Method:", req.headers.method);
    console.log("URL:", req.headers.originalUrl);
    console.log("Time:", new Date().toLocaleString());

    next();
}

module.exports = logger;
