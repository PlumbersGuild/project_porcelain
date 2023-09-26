const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

router.get("/", async (req, res) => {
	console.log(req);
	try {
		const allBooks = await prismaClient.product.findMany();
		res.status(200).json(allBooks);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const foundBook = await prismaClient.product.findUnique(
			{
				where: {
					id: Number(id),
				},
			}
		);

		if (!foundBook) {
			res.status(404).json({
				message: "Could not find book by specified id",
			});
		}
		res.status(200).json(foundBook);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

module.exports = router;
