const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const verify = require("../auth/verify");
const prismaClient = new PrismaClient();

/**
 * Adds a new order
 */

router.post("/submit", verify, async (req, res, next) => {
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
      const foundOrder = await prismaClient.order.findFirst({
        where: {
          isFulfilled: false,
          userId: foundUser.id,
        },
        include: {
          CartItem: true,
        },
      });

      if (!foundOrder) {
        res.status(404).json({
          message: "Could not find order",
        });
        return;
      }
      const fulfilledOrder = await prismaClient.order.update({
        where: {
          id: foundOrder.id,
        },
        data: {
          isFulfilled: true,
        },
      });

      const newOrder = await prismaClient.order.create({
        data: {
          userId: foundUser.id,
          isFulfilled: false,
        },
      });
      res.status(201).json(newOrder);
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
