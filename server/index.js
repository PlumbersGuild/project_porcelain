const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;

const cors = require("cors");
app.use(cors());

app.use(
	"/",
	express.static(path.join(__dirname, "public"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./auth"));

app.use("/api", require("./api"));

app.listen(PORT, () => {
	console.log("On port" + PORT);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res
		.status(err.status || 500)
		.send(err.message || "Internal server error.");
});
