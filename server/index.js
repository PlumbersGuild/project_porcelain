const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;
<<<<<<< HEAD
=======
const jwt = require("jsonwebtoken");
>>>>>>> main

const cors = require("cors");
app.use(cors());

app.use(
	"/",
	express.static(path.join(__dirname, "public"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
app.use("/api", require("./api"));
// app.use("/auth", require("./auth"))

const server = app.listen(PORT, () => {
=======
app.use("/auth", require("./auth"));

app.use((req, res, next) => {
	const token = req.headers.authorization;
	console.log(token);
	if (!token) {
		next();
		return;
	}
	try {
		const user = jwt.verify(token, process.env.JWT);
		req.user = user;
		next();
		return;
	} catch (error) {
		console.error(error);
		res.status(400).send({ message: "Invalid Token" });
		return;
	}
});
// app.use("/api", require('./api'))

app.listen(PORT, () => {
>>>>>>> main
	console.log("On port" + PORT);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res
		.status(err.status || 500)
		.send(err.message || "Internal server error.");
});
