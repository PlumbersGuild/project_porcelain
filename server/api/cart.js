const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

router.post("/add", async (req, res, next) => {
	const { id, qty, price } = req.body;
	const user = req.user;

	try {
		const foundOrder = await prismaClient.order.findFirst({
			where: {
				userId: user.id,
				isFulfilled: false,
			},
		});

		if (foundOrder) {
			const createdCartItem =
				await prismaClient.cartItem.create({
					orderId: foundOrder.id,
					productId: id,
					qty: qty,
					price: price,
				});
			res.status(200).json(createdCartItem);
		} else {
			res.status(401).json({
				message: "Could not find order",
			});
		}
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

module.exports = router;
