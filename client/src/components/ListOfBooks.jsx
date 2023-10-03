import React from "react";

function ListOfBooks({ books }) {
	const filteredBooks = books.filter(
		(book) => book.price !== "$0.00"
	);

	return (
		<div className="list__container">
			<div className="list__books">
				{filteredBooks.map((book) => (
					<div
						className="list__book"
						key={book.isbn13}>
						<h3>{book.title}</h3>
						<h4>{book.price}</h4>
						<img
							src={book.image}
							alt=""
						/>
						<button>Add to Cart</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default ListOfBooks;
