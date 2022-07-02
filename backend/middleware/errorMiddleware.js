const errorHandler = (err, req, res, next) => {
    // check for bad status codes, if it's a good status code then we want to send
  // a bad status code i.e. 2xx should not be sent as error response
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
    res.status(statusCode)
    res.json({
        message: err.message, 
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {errorHandler}