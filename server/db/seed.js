const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
		`https://api.itbook.store/1.0/search/${category}`
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

// fetchData();
// seedCategories();
seedProducts();
