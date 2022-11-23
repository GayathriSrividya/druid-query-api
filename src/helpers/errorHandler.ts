
const globalErrorHandler = (err: any, request: any, response: any) => {
    const { statusCode = 500, message } = err;
    return response.json({ message })
}

export {
    globalErrorHandler
};