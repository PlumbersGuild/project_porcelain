import { useState } from "react";
import cart, {
	useDeleteCartItemMutation,
	useEditCartItemMutation,
	useGetCartItemsQuery,
} from "../reducers/cart";

const GuestCartItem = ({ item }) => {
	const { book } = item;
	const [quantity, setQuantity] = useState(item.qty);

	const deleteCartItemHandler = async (id) => {};

	const handleEditCartIncrement = async (item) => {
		const localStorage = JSON.parse(
			window.localStorage.getItem("cart")
		);
		const foundElt = localStorage.find(
			(elt) => elt.book.id === item.book.id
		);
		const cartStorage = localStorage.map((elt) => {
			if (elt === foundElt) {
				foundElt.qty++;
				return foundElt;
			}
			return elt;
		});

		window.localStorage.setItem(
			"cart",
			JSON.stringify(cartStorage)
		);
		setQuantity((state) => state + 1);
	};

	const handleEditCartDecrement = async (item) => {
		const localStorage = JSON.parse(
			window.localStorage.getItem("cart")
		);
		const foundElt = localStorage.find(
			(elt) => elt.book.id === item?.book.id
		);
		const cartStorage = localStorage.map((elt) => {
			if (elt === foundElt) {
				foundElt.qty--;
				return foundElt;
			}
			return elt;
		});

		window.localStorage.setItem(
			"cart",
			JSON.stringify(cartStorage)
		);
		setQuantity((state) => state - 1);
	};

	return (
		<div
			key={book.id}
			className="cartItem__container">
			<img src={book.image} />
			<div className="productInfo__container">
				<h1>{book.title}</h1>
				<h2>{book.subtitle}</h2>
				<h3 className="price">$ {book?.price / 100}</h3>
			</div>
			<div className="qty_buttons">
				<button
					className="minus"
					onClick={() => handleEditCartDecrement(item)}>
					-
				</button>
				<div>{quantity}</div>
				<button
					className="plus"
					onClick={() => handleEditCartIncrement(item)}>
					+
				</button>
			</div>
			<button
				className="delete"
				onClick={() => deleteCartItemHandler(item.id)}>
				Delete Product
			</button>
		</div>
	);
};

export default GuestCartItem;
