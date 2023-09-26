const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
	try {
		const allUsers = await prisma.user.findMany();
		res.send(allUsers);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const singleUser = await prisma.user.findUnique({
			where: {
				id: +req.params.id,
			},
		});
		res.send(singleUser);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
