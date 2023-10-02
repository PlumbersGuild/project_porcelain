const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
  	
  const token = req.headers.authorization;
	if (!token) {
    res.status(400).json({ message: "Invalid credentials. Not authorized" });
  }

	try {
    const user = jwt.verify(token, process.env.JWT);
    req.user = user;
    next();
    return;
	} catch (error) {
		console.error(error);
    res.status(400).send({ message: "NOT AUTHORIZED!" });
    return;
  }
}

module.exports = verify;
