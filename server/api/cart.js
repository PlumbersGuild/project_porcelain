const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

router.post("/new", async (req, res, next) => {
	const { productId, qty } = req.body;
	const { userId } = req.user;

	try {
		// product -> cartItem -> order
		const foundOrder = await prismaClient.Order.findFirst({
			where: {
				id: userId,
			},
		});

		if (foundOrder) {
			const foundProduct =
				await prismaClient.product.findFirst({
					where: {
						id: productId,
					},
				});

			if (!foundProduct) {
				res.status(404).json({
					message: "Could not find product",
				});
			}

			const createdCartItem =
				await prismaClient.cartItem.create({
					data: {
						productId,
						orderId: foundOrder.id,
						qty,
						price: foundProduct.price,
					},
				});
			res.status(201).json(createdCartItem);
		} else {
			res.status(404).json({
				message: "Could not find order",
			});
		}
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

router.put("/update", async (req, res, next) => {
	const { productId, qty } = req.body;
	const { userId } = req.user;

	try {
		const foundOrder = await prismaClient.Order.findFirst({
			where: {
				userId: userId,
				isFulfilled: false,
			},
		});

		if (foundOrder) {
			const updateCartItem =
				await prismaClient.cartItem.update({
					where: {
						orderId_productId: {
							orderId: foundOrder.id,
							productId,
						},
					},
					data: {
						qty,
					},
				});

			if (!updateCartItem) {
				res.status(400).json({
					message: "Could not update cart item",
				});
			}
			res.status(200).json(updateCartItem);
		} else {
			res.status(404).json({
				message: "Could not find order",
			});
		}
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

router.delete("/delete", async (req, res, next) => {
	const { productId } = req.body;
	const { userId } = req.user;

	try {
		const foundOrder = await prismaClient.Order.findFirst({
			where: {
				userId: userId,
				isFulfilled: false,
			},
		});

		if (!foundOrder) {
			res.status(400).json({
				message: "Cannot delete b/c cannot locate order",
			});
		}

		const foundCartItem =
			await prismaClient.cartItem.findFirst({
				where: {
					productId,
				},
			});

		const deletedCartItem =
			await prismaClient.cartItem.delete({
				where: {
					orderId_productId: {
						orderId: foundCartItem.orderId,
						productId: foundCartItem.productId,
					},
				},
			});

		if (!deletedCartItem) {
			res
				.status(400)
				.json({ message: "Could not delete cart item" });
		}
		res.status(200).json(deletedCartItem);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

module.exports = router;
