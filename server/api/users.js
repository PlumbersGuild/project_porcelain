const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

router.get("/", async (req, res, next) => {
	try {
		const allUsers = await prisma.user.findMany();
		res.send(allUsers);
	} catch (error) {
		next(error);
	}
});

router.get("/admin-dashboard", async (req, res) => {
	if (req.user) {
		res.send({user: req.user})
		return
	} else {
		res.send({message: "no user"})
		return
	}
	// try {
	// 	const adminUsers = await prisma.user.findUnique({
	// 		where: {
	// 			isAdmin: req.params.isAdmin,
	// 		},
	// 	});
	// 	res.send(adminUsers);
	// } catch (error) {
	// 	console.error("Error fetching admin users:", error);
	// }
	res.status(200).send({Message: "Authorized!"})
})

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
})

module.exports = router;
