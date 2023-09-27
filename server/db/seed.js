const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

let categories = [
  { name: "mongodb" },
  { name: "sql" },
  { name: "nosql" },
  { name: "javascript" },
  { name: "react" },
];

const fetchData = async (category) => {
  const response = await fetch(
    `https://api.itbook.store/1.0/search/${category}`
  );
  const data = await response.json();
  return data.books;
};

const seedProducts = async () => {
  categories.forEach(async (category) => {
    const books = await fetchData(category.name);
    books.forEach(async (book) => {
      const newPrice = book.price.slice(1);
      await prisma.product.create({
        data: {
          title: book.title,
          subtitle: book.subtitle,
          price: parseInt(newPrice) * 100,
          image: book.image,
          category: category.name,
        },
      });
    });
  });
};

const seedUsers = async () => {
  const salt_rounds = 5;
  let i = 0;

  while (i < 6) {
    const email = faker.internet.email();
    const userName = faker.internet.userName();
    const password = "test";
    const hashedPassword = await bcrypt.hash(password, salt_rounds);

    await prisma.user.create({
      data: {
        username: userName,
        email: email,
        password: hashedPassword,
        isAdmin: false,
      },
    });
    ++i;
  }
};

const seedCart = async () => {
  const users = await prisma.user.findMany();
  const userId = users.map((user) => user.id);
  let i = 0;
  while (i <= 5) {
    const randomProductId = Math.floor(Math.random() * 50) + 1;
    // const randomUserId = Math.floor(Math.random() * 6) + 1
    const randomQty = Math.floor(Math.random() * 5) + 1;
    const products = await prisma.product.findUnique({
      where: {
        id: randomProductId,
      },
    });
    await prisma.cartItems.create({
      data: {
        userId: userId[i],
        productId: randomProductId,
        qty: randomQty,
        price: products.price * randomQty,
      },
    });
    i++;
  }
};

// seedProducts();
// seedUsers();
// seedCart();
