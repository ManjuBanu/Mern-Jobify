const notFoundMiddleware = (req, res) => res.status(404).send('Route does not exixt');

export default notFoundMiddleware;