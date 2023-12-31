import React from "react";
import Banner from "../assets/banner.jpeg";
import ListOfBooks from "../components/ListOfBooks";

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
