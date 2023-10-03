import React, { useState, useEffect } from "react";
import Banner from "../assets/banner.jpeg";
import ListOfBooks from "../components/ListOfBooks";
import { useGetBooksQuery } from "../reducers/api";

const Home = () => {
	return (
		<div className="home__container">
			<img src={Banner} />
			<div className="home__content">
				<h1>New Books</h1>
				<div className="home__books">
					<ListOfBooks />
				</div>
			</div>
		</div>
	);
};

export default Home;
