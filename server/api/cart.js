const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();
const verify = require("../auth/verify");

router.get("/", verify, async (req, res, next) => {
  const { userId } = req.user;

  try {
    const foundOrder = await prismaClient.order.findFirst({
      where: {
        userId: userId,
        isFulfilled: false,
      },
      include: {
        CartItem: {
          include: {
            product: true,
          },
        },
      },
    });

    if (foundOrder) {
      res.status(200).json(foundOrder.CartItem);
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.post("/new", verify, async (req, res, next) => {
  const { book, qty } = req.body;
  const { userId } = req.user;

  try {
    // product -> cartItem -> order
    const foundOrder = await prismaClient.Order.findFirst({
      where: {
        userId: userId,
        isFulfilled: false,
      },
    });

    console.log(`\n [DEBUG] foundOrder: `, foundOrder);

    if (foundOrder) {
      const foundProduct = await prismaClient.product.findUnique({
        where: {
          id: book.id,
        },
      });

      console.log(`\n [DEBUG] foundProduct: `, foundProduct);

      if (!foundProduct) {
        res.status(404).json({
          message: "Could not find product",
        });
      }

      const duplicateCartItem = await prismaClient.cartItem.findUnique({
        where: {
          orderId_productId: {
            orderId: foundOrder.id,
            productId: foundProduct.id,
          },
        },
      });

      if (duplicateCartItem) {
        const newQty = duplicateCartItem.qty + qty;
        const updated = await prismaClient.cartItem.update({
          where: {
            orderId_productId: {
              orderId: foundOrder.id,
              productId: foundProduct.id,
            },
          },
          data: {
            qty: newQty,
          },
        });
        const order = await prismaClient.order.findFirst({
          where: {
            userId: userId,
            isFulfilled: false,
          },
          include: {
            CartItem: {
              include: {
                product: true,
              },
            },
          },
        });
        res.status(200).json(order.CartItem);
      } else {
        const createdCartItem = await prismaClient.cartItem.create({
          data: {
            orderId: foundOrder.id,
            qty,
            price: book.price,
            productId: foundProduct.id,
          },
          include: {
            product: true,
          },
        });
        res.status(201).json(createdCartItem);
      }
    } else {
      const createdOrder = prismaClient.Order.create({
        userId,
      });
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// UPDATE productId to book and adjust accordingly

router.put("/update/:id", verify, async (req, res, next) => {
  console.log("BODY", req.body);
  const { userId } = req.user;
  const { id } = req.body;

  try {
    const foundOrder = await prismaClient.Order.findFirst({
      where: {
        userId: userId,
        isFulfilled: false,
      },
    });

    if (foundOrder) {
      const updateCartItem = await prismaClient.cartItem.update({
        where: {
          orderId_productId: {
            orderId: foundOrder.id,
            productId: +req.params.id,
          },
        },
        data: {
          qty: +req.body.body.qty,
        },
        include: {
          product: true,
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

router.delete("/delete/:id", verify, async (req, res, next) => {
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

    const foundCartItem = await prismaClient.cartItem.findFirst({
      where: {
        productId: +req.params.id,
      },
    });

    const deletedCartItem = await prismaClient.cartItem.delete({
      where: {
        orderId_productId: {
          orderId: foundCartItem.orderId,
          productId: foundCartItem.productId,
        },
      },
    });

    if (!deletedCartItem) {
      res.status(400).json({ message: "Could not delete cart item" });
    }
    res.status(200).json(deletedCartItem);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
