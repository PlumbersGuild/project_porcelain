const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

router.post("/new", async (req, res, next) => {
	const { productId, qty, price } = req.body;
	const { userId } = req.user;

	try {
		// product -> cartItem -> order
		const findOrder = await prismaClient.Order.findFirst({
			where: {
				id: userId,
			},
		});

		if (findOrder) {
			console.log(`findOrder: `, findOrder);
			const createdCartItem =
				await prismaClient.cartItem.create({
					data: {
						productId,
						orderId: findOrder.id,
						qty,
						price,
					},
				});
			res.status(201).json({ createdCartItem });
		}
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

module.exports = router;
