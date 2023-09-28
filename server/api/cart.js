const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

router.post("/add", async (req, res, next) => {
	const { id, title, subtitle, price, image, category } =
		req.body;
	const user = req.user;

	try {
		// const foundUser = await prismaClient.user.findFirst({
		// 	where: {
		// 		id,
		// 	},
		// });

		const foundProduct =
			await prismaClient.product.findFirst({
				where: {
					id,
				},
			});

		console.log(foundProduct);
		console.log(user);

		// await prismaClient.cartItems.create({
		// 	userId: foundUser.id,
		// 	user: foundUser,
		// 	productId,
		// });
	} catch (error) {}
});

module.exports = router;
