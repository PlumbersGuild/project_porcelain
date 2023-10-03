const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

/**
 * Gets all the new books
 */
router.get("/", async (req, res, next) => {
	try {
		const allBooks = await prismaClient.product.findMany();
		res.status(200).json(allBooks);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

/**
 * Gets a book by specified ID
 */
router.get("/:id", async (req, res, next) => {
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

router.post("/new", async (req, res, next) => {
	const { title, subtitle, price, image, category } =
		req.body;

	try {
		const newBook = await prismaClient.product.create({
			data: {
				title,
				subtitle,
				price,
				image,
				category,
			},
		});

		if (!newBook) {
			res.status(400).json({
				message: "Could not create a new book",
			});
		}
		res.status(201).json(newBook);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

module.exports = router;
