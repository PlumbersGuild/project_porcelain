const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

const checkAdminAuthorization = (req, res, next) => {
	// const user = req.user;
	const token = req.headers.authorization;
	if (!token) {
		res.status(400).send({message: "NOT AUTHORIZED!"})
	}

	try {
		const user = jwt.verify(token, process.env.JWT)
		req.user = user
		next()
		return
	} catch (error) {
		console.error(error);
		res.status(400).send({message: "NOT AUTHORIZED!"})
		return
	}

	// const isAdmin = req.isAdmin

	// if (isAdmin !== true) {
	// 	return res.status(401).send("Admin authorization required")
	// }

	// next();
}

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
});

// Create a new product (only accessible to admin users)
router.post('/products', async (req, res) => {
	try {
	  // Check if the user is an admin (you need to implement this logic)
	  if (!req.user.isAdmin) {
		return res.status(403).json({ error: 'Only admins can create products' });
	  }
  
	  const { name, description, price } = req.body;
	  const newProduct = await prisma.product.create({
		data: {
		  name,
		  description,
		  price,
		},
	  });
	  res.json(newProduct);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Error creating product' });
	}
});

// Edit a product by ID (only accessible to admin users)
router.put('/products/:id', async (req, res) => {
	try {
	  // Check if the user is an admin (you need to implement this logic)
	  if (!req.user.isAdmin) {
		return res.status(403).json({ error: 'Only admins can edit products' });
	  }
  
	  const { id } = req.params;
	  const { name, description, price } = req.body;
	  const updatedProduct = await prisma.product.update({
		where: { id: parseInt(id) },
		data: {
		  name,
		  description,
		  price,
		},
	  });
	  res.json(updatedProduct);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Error updating product' });
	}
});

// Delete a product by ID (only accessible to admin users)
router.delete('/products/:id', async (req, res) => {
	try {
	  // Check if the user is an admin (you need to implement this logic)
	  if (!req.user.isAdmin) {
		return res.status(403).json({ error: 'Only admins can delete products' });
	  }
  
	  const { id } = req.params;
	  await prisma.product.delete({
		where: { id: parseInt(id) },
	  });
	  res.json({ message: 'Product deleted successfully' });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Error deleting product' });
	}
  });

module.exports = router;
