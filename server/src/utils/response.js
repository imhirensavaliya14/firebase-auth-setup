const sendResponse = (res, statusCode, success, message, data = null) => {
    const response = {
        success,
        message,
        data
    };
    return res.status(statusCode).json(response);
};

const successResponse = (res, message, data = null) => {
    return sendResponse(res, 200, true, message, data);
};

const errorResponse = (res, statusCode, message) => {
    return sendResponse(res, statusCode, false, message);
};

module.exports = {
    successResponse,
    errorResponse
};