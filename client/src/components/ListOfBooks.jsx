import React, { useState, useEffect } from "react";
import { useGetBooksQuery } from "../reducers/api";
import Placeholder from "../assets/placeholder.png";
import { Link } from "react-router-dom";

function ListOfBooks() {

	const [books, setBooks] = useState([]);

	const { isLoading, data, error } = useGetBooksQuery();

	useEffect(() => {
		if (error) {
			console.log("Error has occurred");
		}

		if (isLoading) {
			console.log("Loading...");
		}
		if (data) {
			setBooks(data);
		}
	}, [data, error]);

	const filteredBooks = books.filter(
		(book) => book.price !== "$0.00"
	);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="list__container">
			<div className="list__books">
				{filteredBooks.map((book) => (
					<div
						className="list__book"
						key={book.id}>
						<h3>{book.title}</h3>
						<h4>$ {book.price / 100}</h4>
						<img
							src={Placeholder}
							alt=""
						/>
						<Link
							className="link"
							key={book.id}
							to={`/books/${book.id}`}>
							<button>View More</button>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default ListOfBooks;
