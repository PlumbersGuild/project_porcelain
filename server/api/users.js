const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const verify = require("../auth/verify");

// Get all users (only accessible by admins)
router.get("/", verify, async (req, res, next) => {
	const { user } = req;

	try {
		const isAdmin = await prisma.user.findUnique({
			where: { id: user.userId },
		});

		if (!isAdmin) {
			return res
				.status(403)
				.json({ error: "Only admins can edit products" });
		}

		const allUsers = await prisma.user.findMany();
		res.status(200).json(allUsers);
	} catch (error) {
		next(error);
	}
});

// Get a user by id (only accessible by admins)
router.get("/:id", verify, async (req, res, next) => {
	const { user } = req;

	try {
		const isAdmin = await prisma.user.findUnique({
			where: { id: user.userId },
		});

		if (!isAdmin) {
			return res
				.status(403)
				.json({ error: "Only admins can edit products" });
		}

		const singleUser = await prisma.user.findUnique({
			where: {
				id: +req.params.id,
			},
		});
		res.status(200).json(singleUser);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
