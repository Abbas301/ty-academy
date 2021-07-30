const jwt = require('jsonwebtoken');

function auth(req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(400).send('Access Denied.. No token Provided')
    }
    try {
        const decoded = jwt.verify(token,'jwtPrivateKey');
    req.user = decoded;
    next();
    } catch(err) {
    next(err);
    }
}

module.exports = auth;