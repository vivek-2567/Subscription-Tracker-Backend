const errorMiddleware = (err, req, res, next) => {
	// Set default status code and message
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';

	// Send JSON response
	res.status(statusCode).json({
		success: false,
		message: message
	});
}

export default errorMiddleware