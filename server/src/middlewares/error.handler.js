export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    const status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';

    if (!err.isOperational) {
        console.error('UNEXPECTED ERROR:', err);
    }

    res.status(statusCode).json({
        status: status,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
