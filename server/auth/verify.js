const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

const verify = async (req, res, next) => {
	const token = req.headers?.authorization;
	// if (!token) {
	//   res.status(400).json({ message: "Invalid credentials. Not authorized" });
	// }

	if (!token) {
		res.status(404).json({ token: "guest" });
		return;
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
};

module.exports = verify;
