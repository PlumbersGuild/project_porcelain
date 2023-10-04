import { useGetBookByIdQuery } from "../reducers/api";
import { useParams } from "react-router-dom";
import Placeholder from "../assets/placeholder.png";
import { useSelector } from "react-redux";
import { useAddNewCartItemMutation } from "../reducers/cart";

const SingleBookPage = () => {
	const { id } = useParams();
	const {
		data: book,
		isLoading,
		isError,
	} = useGetBookByIdQuery(id);
	const [addNewCartItem] = useAddNewCartItemMutation();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading book data</div>;
	}

	const handleAddToCart = async (book, qty) => {
		const userInput = { ...book, qty };
		console.log(book, qty);
		await addNewCartItem(userInput);
	};

	return (
		<div className="main__container">
			<div className="img__container">
				<img
					src={Placeholder}
					alt={book.title}
				/>
			</div>
			<div className="information__container">
				<div className="title__container">
					<h2>{book.title}</h2>
					<h3>{book.subtitle}</h3>
				</div>
				<div className="lorem">
					Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Reiciendis nesciunt officiis nulla ad nobis!
					Delectus repudiandae, quibusdam, vero laborum odit
					atque temporibus unde ullam minus mollitia
					voluptatem est ipsum nisi.
				</div>
				<h4>$ {book.price / 100}</h4>
				<button
					onClick={() => handleAddToCart({ book }, 1)}
					type="button">
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default SingleBookPage;
