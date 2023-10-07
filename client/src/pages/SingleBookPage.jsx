import { useGetBookByIdQuery } from "../reducers/api";
import { useNavigate, useParams } from "react-router-dom";
import Placeholder from "../assets/placeholder.png";

import { useSelector } from "react-redux";
import {
	useAddNewCartItemMutation,
	useGetCartItemsQuery,
} from "../reducers/cart";
import "../styles/singleBook.scss";

const SingleBookPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const {
		data: book,
		isLoading,
		isError,
	} = useGetBookByIdQuery(id);
	const [addNewCartItem] = useAddNewCartItemMutation();
	const user = useSelector(
		(state) => state.auth.credentials?.token
	);

	const cart = useSelector((state) => state.cart.cart);
	console.log(`cart: `, cart);

	const { refetch } = useGetCartItemsQuery();
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading book data</div>;
	}

	const handleAddToCart = async (book, qty) => {
		// if guestCart exists -> get it from localStorage
		// if doesn't exist -> make an empty array
		const guestCart =
			window.localStorage.getItem("cart") != null
				? JSON.parse(window.localStorage.getItem("cart"))
				: [];
		const addBook = { ...book, qty };

		// for guest users
		if (!user) {
			// find if theres already an item in the localStorage
			const existingItem = guestCart.find(
				(item) => item.book?.id == addBook.book.id
			);

			// if item is not already inside localStorage
			if (!existingItem) {
				guestCart.push(addBook);
				window.localStorage.setItem(
					"cart",
					JSON.stringify(guestCart)
				);
			} else {
				// incremement qty
				existingItem.qty += 1;
				// map to include the existingItem
				const newGuestCart = guestCart.map((item) => {
					if (item.book == existingItem.book) {
						return existingItem;
					}
					return item;
				});
				// reset the cart to include the new guestCart
				window.localStorage.setItem(
					"cart",
					JSON.stringify(newGuestCart)
				);
				navigate("/");
			}
		} else {
			await addNewCartItem(addBook);
			navigate("/");
		}
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
					<h2>Name: {book.title}</h2>
					<h3>Subtitle: {book.subtitle}</h3>
				</div>
				<p className="lorem">
					Description: Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Reiciendis nesciunt
					officiis nulla ad nobis! Delectus repudiandae,
					quibusdam, vero laborum odit atque temporibus unde
					ullam minus mollitia voluptatem est ipsum nisi.
					Lorem ipsum, dolor sit amet consectetur
					adipisicing elit. Provident consequuntur
					temporibus quibusdam non, molestiae expedita
					quisquam, pariatur veritatis consequatur assumenda
					obcaecati accusamus iusto animi odit ratione quod
					eligendi doloremque quae?
				</p>
				<h4>$ {book.price / 100}</h4>
				<button
					className="addToCart"
					onClick={() => handleAddToCart({ book }, 1)}
					type="button">
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default SingleBookPage;
