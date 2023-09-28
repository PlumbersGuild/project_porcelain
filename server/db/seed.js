const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const books = [
  {
    title: "SQL Queries for Mere Mortals, 4th Edition",
    subtitle: "A Hands-On Guide to Data Manipulation in SQL",
    price: 1813,
    image: "https://itbook.store/img/books/9780134858333.png",
    url: "https://itbook.store/books/9780134858333",
    category: "sql",
  },
  {
    title: "SQL Server 2019 Administration Inside Out",
    subtitle: "",
    price: 4815,
    image: "https://itbook.store/img/books/9780135561089.png",
    url: "https://itbook.store/books/9780135561089",
    category: "sql",
  },
  {
    title: "A Developer's Guide to Data Modeling for SQL Server",
    subtitle: "Covering SQL Server 2005 and 2008",
    price: 615,
    image: "https://itbook.store/img/books/9780321497642.png",
    url: "https://itbook.store/books/9780321497642",
    category: "sql",
  },
  {
    title: "Beginning Microsoft SQL Server 2008 Administration",
    subtitle: "",
    price: 517,
    image: "https://itbook.store/img/books/9780470440919.png",
    url: "https://itbook.store/books/9780470440919",
    category: "sql",
  },
  {
    title: "Professional SQL Server 2008 Internals and Troubleshooting",
    subtitle: "",
    price: 549,
    image: "https://itbook.store/img/books/9780470484289.png",
    url: "https://itbook.store/books/9780470484289",
    category: "sql",
  },
  {
    title: "SQL All-in-One For Dummies, 2nd Edition",
    subtitle: "",
    price: 749,
    image: "https://itbook.store/img/books/9780470929964.png",
    url: "https://itbook.store/books/9780470929964",
    category: "sql",
  },
  {
    title: "Oracle SQL Tuning Pocket Reference",
    subtitle: "",
    price: 676,
    image: "https://itbook.store/img/books/9780596002688.png",
    url: "https://itbook.store/books/9780596002688",
    category: "sql",
  },
  {
    title: "Oracle PL/SQL Language Pocket Reference, 4th Edition",
    subtitle: "A Guide to Oracle's PL/SQL Language Fundamentals",
    price: 598,
    image: "https://itbook.store/img/books/9780596514044.png",
    url: "https://itbook.store/books/9780596514044",
    category: "sql",
  },
  {
    title: "Learning SQL, 2nd Edition",
    subtitle: "Master SQL Fundamentals",
    price: 1450,
    image: "https://itbook.store/img/books/9780596520830.png",
    url: "https://itbook.store/books/9780596520830",
    category: "sql",
  },
  {
    title: "Using SQLite",
    subtitle: "Small. Fast. Reliable. Choose Any Three.",
    price: 2861,
    image: "https://itbook.store/img/books/9780596521189.png",
    url: "https://itbook.store/books/9780596521189",
    category: "sql",
  },
  {
    title: "MongoDB in Action, 2nd Edition",
    subtitle: "Covers MongoDB version 3.0",
    price: 1999,
    image: "https://itbook.store/img/books/9781617291609.png",
    url: "https://itbook.store/books/9781617291609",
    category: "mongodb",
  },
  {
    title: "MongoDB and Python",
    subtitle:
      "Patterns and processes for the popular document-oriented database",
    price: 688,
    image: "https://itbook.store/img/books/9781449310370.png",
    url: "https://itbook.store/books/9781449310370",
    category: "mongodb",
  },
  {
    title: "Building Node Applications with MongoDB and Backbone",
    subtitle: "Rapid Prototyping and Scalable Deployment",
    price: 485,
    image: "https://itbook.store/img/books/9781449337391.png",
    url: "https://itbook.store/books/9781449337391",
    category: "mongodb",
  },
  {
    title: "Practical MongoDB",
    subtitle: "Architecting, Developing, and Administering MongoDB",
    price: 4165,
    image: "https://itbook.store/img/books/9781484206485.png",
    url: "https://itbook.store/books/9781484206485",
    category: "mongodb",
  },
  {
    title: "The Definitive Guide to MongoDB, 3rd Edition",
    subtitle: "A complete guide to dealing with Big Data using MongoDB",
    price: 4999,
    image: "https://itbook.store/img/books/9781484211830.png",
    url: "https://itbook.store/books/9781484211830",
    category: "mongodb",
  },
  {
    title: "MongoDB Performance Tuning",
    subtitle: "Optimizing MongoDB Databases and their Applications",
    price: 3474,
    image: "https://itbook.store/img/books/9781484268780.png",
    url: "https://itbook.store/books/9781484268780",
    category: "mongodb",
  },
  {
    title: "Pentaho Analytics for MongoDB",
    subtitle:
      "Combine Pentaho Analytics and MongoDB to create powerful analysis and reporting solutions",
    price: 1699,
    image: "https://itbook.store/img/books/9781782168355.png",
    url: "https://itbook.store/books/9781782168355",
    category: "mongodb",
  },
  {
    title: "Pentaho Analytics for MongoDB Cookbook",
    subtitle:
      "Over 50 recipes to learn how to use Pentaho Analytics and MongoDB to create powerful analysis and reporting solutions",
    price: 4499,
    image: "https://itbook.store/img/books/9781783553273.png",
    url: "https://itbook.store/books/9781783553273",
    category: "mongodb",
  },
  {
    title: "Web Development with MongoDB and NodeJS, 2nd Edition",
    subtitle:
      "Build an interactive and full-featured web application from scratch using Node.js and MongoDB",
    price: 3999,
    image: "https://itbook.store/img/books/9781785287527.png",
    url: "https://itbook.store/books/9781785287527",
    category: "mongodb",
  },
  {
    title: "MongoDB Cookbook, 2nd Edition",
    subtitle:
      "Harness the latest features of MongoDB 3 with this collection of 80 recipes - from managing cloud platforms to app development, this book is a vital resource",
    price: 4499,
    image: "https://itbook.store/img/books/9781785289989.png",
    url: "https://itbook.store/books/9781785289989",
    category: "mongodb",
  },
  {
    title: "Next Generation Databases: NoSQL, NewSQL, and Big Data",
    subtitle:
      "What every professional needs to know about the future of databases in a world of NoSQL and Big Data",
    price: 3080,
    image: "https://itbook.store/img/books/9781484213308.png",
    url: "https://itbook.store/books/9781484213308",
    category: "nosql",
  },
  {
    title: "Getting Started with NoSQL",
    subtitle: "Your guide to the world and technology of NoSQL",
    price: 1499,
    image: "https://itbook.store/img/books/9781849694988.png",
    url: "https://itbook.store/books/9781849694988",
    category: "nosql",
  },
  {
    title: "Professional NoSQL",
    subtitle: "",
    price: 1098,
    image: "https://itbook.store/img/books/9780470942246.png",
    url: "https://itbook.store/books/9780470942246",
    category: "nosql",
  },
  {
    title: "NoSQL For Dummies",
    subtitle: "",
    price: 2583,
    image: "https://itbook.store/img/books/9781118905746.png",
    url: "https://itbook.store/books/9781118905746",
    category: "nosql",
  },
  {
    title: "The Definitive Guide to MongoDB",
    subtitle: "The NoSQL Database for Cloud and Desktop Computing",
    price: 3999,
    image: "https://itbook.store/img/books/9781430230519.png",
    url: "https://itbook.store/books/9781430230519",
    category: "nosql",
  },
  {
    title: "eXist",
    subtitle: "A NoSQL Document Database and Application Platform",
    price: 3881,
    image: "https://itbook.store/img/books/9781449337100.png",
    url: "https://itbook.store/books/9781449337100",
    category: "nosql",
  },
  {
    title: "MongoDB Applied Design Patterns",
    subtitle: "Practical Use Cases with the Leading NoSQL Database",
    price: 2999,
    image: "https://itbook.store/img/books/9781449340049.png",
    url: "https://itbook.store/books/9781449340049",
    category: "nosql",
  },
  {
    title: "Practical Hadoop Migration",
    subtitle:
      "How to Integrate Your RDBMS with the Hadoop Ecosystem and Re-Architect Relational Applications to NoSQL",
    price: 4499,
    image: "https://itbook.store/img/books/9781484212882.png",
    url: "https://itbook.store/books/9781484212882",
    category: "nosql",
  },
  {
    title: "Pro Couchbase Development",
    subtitle: "A NoSQL Platform for the Enterprise",
    price: 3806,
    image: "https://itbook.store/img/books/9781484214350.png",
    url: "https://itbook.store/books/9781484214350",
    category: "nosql",
  },
  {
    title: "MySQL Connector/Python Revealed",
    subtitle: "SQL and NoSQL Data Storage Using MySQL for Python Programmers",
    price: 2427,
    image: "https://itbook.store/img/books/9781484236932.png",
    url: "https://itbook.store/books/9781484236932",
    category: "nosql",
  },
  {
    title: "Effective JavaScript",
    subtitle: "68 Specific Ways to Harness the Power of JavaScript",
    price: 2199,
    image: "https://itbook.store/img/books/9780321812186.png",
    url: "https://itbook.store/books/9780321812186",
    category: "javascript",
  },
  {
    title: "Beginning JavaScript, 3nd Edition",
    subtitle: "The Ultimate Guide to Modern JavaScript Development",
    price: 1902,
    image: "https://itbook.store/img/books/9781484243947.png",
    url: "https://itbook.store/books/9781484243947",
    category: "javascript",
  },
  {
    title: "Learn Enough JavaScript to Be Dangerous",
    subtitle:
      "Write Programs, Publish Packages, and Develop Interactive Websites with JavaScript",
    price: 3198,
    image: "https://itbook.store/img/books/9780137843749.png",
    url: "https://itbook.store/books/9780137843749",
    category: "javascript",
  },
  {
    title: "Test-Driven JavaScript Development",
    subtitle: "",
    price: 1029,
    image: "https://itbook.store/img/books/9780321683915.png",
    url: "https://itbook.store/books/9780321683915",
    category: "javascript",
  },
  {
    title: "Learning JavaScript",
    subtitle: "A Hands-On Guide to the Fundamentals of Modern JavaScript",
    price: 899,
    image: "https://itbook.store/img/books/9780321832740.png",
    url: "https://itbook.store/books/9780321832740",
    category: "javascript",
  },
  {
    title: "jQuery and JavaScript Phrasebook",
    subtitle: "",
    price: 1448,
    image: "https://itbook.store/img/books/9780321918963.png",
    url: "https://itbook.store/books/9780321918963",
    category: "javascript",
  },
  {
    title: "JavaScript: The Good Parts",
    subtitle: "Unearthing the Excellence in JavaScript",
    price: 437,
    image: "https://itbook.store/img/books/9780596517748.png",
    url: "https://itbook.store/books/9780596517748",
    category: "javascript",
  },
  {
    title: "Head First JavaScript",
    subtitle: "A Learner's Companion to JavaScript",
    price: 772,
    image: "https://itbook.store/img/books/9780596527747.png",
    url: "https://itbook.store/books/9780596527747",
    category: "javascript",
  },
  {
    title: "High Performance JavaScript",
    subtitle: "Build Faster Web Application Interfaces",
    price: 1959,
    image: "https://itbook.store/img/books/9780596802790.png",
    url: "https://itbook.store/books/9780596802790",
    category: "javascript",
  },
  {
    title: "Building iPhone Apps with HTML, CSS, and JavaScript",
    subtitle: "Making App Store Apps Without Objective-C or Cocoa",
    price: 500,
    image: "https://itbook.store/img/books/9780596805784.png",
    url: "https://itbook.store/books/9780596805784",
    category: "javascript",
  },
  {
    title: "Learning React, 2nd Edition",
    subtitle:
      "A Hands-On Guide to Building Web Applications Using React and Redux",
    price: 947,
    image: "https://itbook.store/img/books/9780134843551.png",
    url: "https://itbook.store/books/9780134843551",
    category: "react",
  },
  {
    title: "React Quickly",
    subtitle: "Painless web apps with React, JSX, Redux, and GraphQL",
    price: 3699,
    image: "https://itbook.store/img/books/9781617293344.png",
    url: "https://itbook.store/books/9781617293344",
    category: "react",
  },
  {
    title: "Reactive Web Applications",
    subtitle: "Covers Play, Akka, and Reactive Streams",
    price: 2623,
    image: "https://itbook.store/img/books/9781633430099.png",
    url: "https://itbook.store/books/9781633430099",
    category: "react",
  },
  {
    title: "Reintroducing React",
    subtitle:
      "Modern React with Every React Update Since v16 Demystified (includes advanced hooks)",
    price: 0,
    image: "https://itbook.store/img/books/1001592396277.png",
    url: "https://itbook.store/books/1001592396277",
    category: "react",
  },
  {
    title: "Pro React",
    subtitle:
      "Build complex front-end applications in a composable way with React",
    price: 1377,
    image: "https://itbook.store/img/books/9781484212615.png",
    url: "https://itbook.store/books/9781484212615",
    category: "react",
  },
  {
    title: "React Native for iOS Development",
    subtitle:
      "Harness the power of React and JavaScript to build stunning iOS applications",
    price: 3326,
    image: "https://itbook.store/img/books/9781484213964.png",
    url: "https://itbook.store/books/9781484213964",
    category: "react",
  },
  {
    title: "Front-End Reactive Architectures",
    subtitle:
      "Explore the Future of the Front-End using Reactive JavaScript Frameworks and Libraries",
    price: 2632,
    image: "https://itbook.store/img/books/9781484231791.png",
    url: "https://itbook.store/books/9781484231791",
    category: "react",
  },
  {
    title: "Practical React Native",
    subtitle: "Build Two Full Projects and One Full Game using React Native",
    price: 2609,
    image: "https://itbook.store/img/books/9781484239384.png",
    url: "https://itbook.store/books/9781484239384",
    category: "react",
  },
  {
    title: "Reactive Streams in Java",
    subtitle: "Concurrency with RxJava, Reactor, and Akka Streams",
    price: 2895,
    image: "https://itbook.store/img/books/9781484241752.png",
    url: "https://itbook.store/books/9781484241752",
    category: "react",
  },
  {
    title: "Building React Apps with Server-Side Rendering",
    subtitle:
      "Use React, Redux, and Next to Build Full Server-Side Rendering Applications",
    price: 2775,
    image: "https://itbook.store/img/books/9781484258682.png",
    url: "https://itbook.store/books/9781484258682",
    category: "react",
  },
];

const users = [
  {
    id: 1,
    username: "adminuser",
    email: "admin@gmail.com",
    password: "test",
    isAdmin: true,
  },
  {
    id: 2,
    username: "testuser",
    email: "test@gmail.com",
    password: "test",
    isAdmin: false,
  },
];

const orders = [
  {
    userId: 2,
    isFulfilled: false,
  },
  {
    userId: 2,
    isFulfilled: true,
  },
];

const cartItems = [
  {
    orderId: 1,
    productId: 1,
    qty: 3,
    price: 1000,
  },
  {
    orderId: 1,
    productId: 2,
    qty: 3,
    price: 1000,
  },
];

async function main() {
  salt_rounds = 5;
  await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, salt_rounds);
      return prisma.user.create({
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          password: hashedPassword,
          isAdmin: user.isAdmin,
        },
      });
    })
  );
  await Promise.all(
    books.map(async (book) => {
      return prisma.product.create({
        data: {
          title: book.title,
          subtitle: book.subtitle,
          price: book.price,
          image: book.image,
          category: book.category,
        },
      });
    })
  );
  await Promise.all(
    orders.map(async (order) => {
      return prisma.order.create({
        data: {
          userId: order.userId,
          isFulfilled: order.isFulfilled,
        },
      });
    })
  );
  await Promise.all(
    cartItems.map(async (cartItem) => {
      return prisma.cartItem.create({
        data: {
          orderId: cartItem.orderId,
          productId: cartItem.productId,
          qty: cartItem.qty,
          price: cartItem.price,
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// const seedProducts = async () => {
//   categories.forEach(async (category) => {
//     const books = await fetchData(category.name);
//     books.forEach(async (book) => {
//       const newPrice = book.price.slice(1);
//       await prisma.product.create({
//         data: {
//           title: book.title,
//           subtitle: book.subtitle,
//           price: parseInt(newPrice) * 100,
//           image: book.image,
//           category: category.name,
//         },
//       });
//     });
//   });
// };

// const seedUsers = async () => {
//   const salt_rounds = 5;
//   let i = 0;

//   while (i < 6) {
//     const email = faker.internet.email();
//     const userName = faker.internet.userName();
//     const password = "test";
//     const hashedPassword = await bcrypt.hash(password, salt_rounds);

//     await prisma.user.create({
//       data: {
//         username: userName,
//         email: email,
//         password: hashedPassword,
//         isAdmin: false,
//       },
//     });
//     ++i;
//   }
// };

// const seedCart = async () => {
//   const users = await prisma.user.findMany();
//   const userId = users.map((user) => user.id);
//   let i = 0;
//   while (i <= 5) {
//     const randomProductId = Math.floor(Math.random() * 50) + 1;
//     // const randomUserId = Math.floor(Math.random() * 6) + 1
//     const randomQty = Math.floor(Math.random() * 5) + 1;
//     const products = await prisma.product.findUnique({
//       where: {
//         id: randomProductId,
//       },
//     });
//     await prisma.cartItems.create({
//       data: {
//         userId: userId[i],
//         productId: randomProductId,
//         qty: randomQty,
//         price: products.price * randomQty,
//       },
//     });
//     i++;
//   }
// };

// seedProducts();
// seedUsers();
// seedCart();
