const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

let categories = [
	{ name: "mongodb" },
	{ name: "sql" },
	{ name: "nosql" },
	{ name: "nosql" },
	{ name: "javascript" },
	{ name: "react" },
];

const fetchData = async (category) => {
	const response = await fetch(
		`https://api.itbook.store/1.0/}`
	);
	const data = await response.json();
	return data.books;
};

// const seedCategories = async () => {
// 	// const books = await fetchData();

// 	categories.forEach(async (category) => {
// 		await prisma.category.create({
// 			data: {
// 				name: category.name,
// 			},
// 		});
// 	});
// };

const seedProducts = async () => {
	categories.forEach(async (category) => {
		const books = await fetchData(category.name);

		books.forEach(async (book) => {
			await prisma.product.create({
				data: {
					title: book.title,
					subtitle: book.subtitle,
					price: book.price,
					image: book.image,
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
		const hashedPassword = await bcrypt.hash(
			password,
			salt_rounds
		);

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

// fetchData();
// seedCategories();
// seedProducts();
seedUsers();
// console.log(faker.internet.email());
