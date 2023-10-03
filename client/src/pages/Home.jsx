import React, { useState } from "react";
import Banner from "../assets/banner.jpeg";
import ListOfBooks from "../components/ListOfBooks";
import { useGetBooksQuery } from "../reducers/api";

const Home = () => {
	const [books, setBooks] = useState();

	const { isLoading, data, error } = useGetBooksQuery();

	console.log(data);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="home__container">
			<img src={Banner} />
			<div className="home__content">
				<h1>New Books</h1>
				<div className="home__books">
					<ListOfBooks books={data} />
				</div>
			</div>
		</div>
	);
};

export default Home;
