const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new product (only accessible to admin users)
router.post('/products/new', async (req, res, next) => {
	try {
	  const { user } = req;
  
	  // Check if the user is an admin
	  const isAdmin = await prisma.user.findUnique({
		where: { id: user.id },
		select: { isAdmin: true },
    });
    
    console.log(`isAdmin?: `, isAdmin);
  
	  if (!isAdmin) {
		return res.status(403).json({ error: 'Only admins can create products' });
	  }
  
	  const { title, subtitle, price, image, category } = req.body;
	  const newProduct = await prisma.product.create({
		data: {
		  title,
          subtitle,
		  price,
          image,
          category
		},
	  });
	  res.status(201).json(newProduct);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Error creating product' });
	}
});

// Edit a product by ID (only accessible to admin users)
router.put('/products/:id', async (req, res) => {
	try {
	  const { user } = req;
  
	  // Check if the user is an admin
	  const isAdmin = await prisma.user.findUnique({
		where: { id: user.id },
		select: { isAdmin: true },
	  });
  
	  if (!isAdmin) {
		return res.status(403).json({ error: 'Only admins can edit products' });
	  }
  
	  const { id } = req.params;
	  const { title, price } = req.body;
	  const updatedProduct = await prisma.product.update({
		where: { id: parseInt(id) },
		data: {
		  title,
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
	  const { user } = req;
  
	  // Check if the user is an admin
	  const isAdmin = await prisma.user.findUnique({
		where: { id: user.id },
		select: { isAdmin: true },
	  });
  
	  if (!isAdmin) {
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