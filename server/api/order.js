const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

/**
 * Adds a new order
 */
router.post("/submit", async (req, res, next) => {
	const { userId } = req.user;

	try {
		const foundUser = await prismaClient.user.findFirst({
			where: {
				id: userId,
			},
		});

		console.log(`foundUser: `, foundUser);

		// product -> cartItem -> order

		if (foundUser) {
			const foundOrder = await prismaClient.order.findFirst(
				{
					where: {
						isFulfilled: false,
						userId: foundUser.id,
					},
					include: {
						CartItem: true,
					},
				}
			);

			if (!foundOrder) {
				res.status(404).json({
					message: "Could not find order",
				});
			}
			foundOrder.isFulfilled = true;
			res.status(201).json(foundOrder);
		}
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

module.exports = router;
