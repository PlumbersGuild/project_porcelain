import { useState } from "react";
import {
	useDeleteCartItemMutation,
	useEditCartItemMutation,
	useGetCartItemsQuery,
} from "../reducers/cart";

const CartItem = ({ item }) => {
	console.log(item);

	const [editCartItem] = useEditCartItemMutation();
	const [quantity, setQuantity] = useState(item.qty);
	const [deleteCartItem] = useDeleteCartItemMutation();
	const { refetch } = useGetCartItemsQuery();
	const deleteCartItemHandler = async (id) => {
		await deleteCartItem(id);
		refetch();
	};

	const handleEditCartIncrement = async (productId) => {
		setQuantity(quantity + 1);
		await editCartItem({
			id: productId,
			body: {
				qty: +quantity + 1,
			},
		});
	};

	const handleEditCartDecrement = async (productId) => {
		if (quantity <= 1) return;
		setQuantity(quantity - 1);
		await editCartItem({
			id: productId,
			body: {
				qty: +quantity - 1,
			},
		});
	};

	return (
		<div
			key={item.id}
			className="cartItem__container">
			<img src={item.product?.image} />
			<div className="productInfo__container">
				<h1>{item.product?.title}</h1>
				<h2>{item.product?.subtitle}</h2>
				<h3 className="price">$ {item?.price / 100}</h3>
			</div>
			<div className="qty_buttons">
				<button
					className="minus"
					onClick={() =>
						handleEditCartDecrement(item.productId)
					}>
					-
				</button>
				<div>{quantity}</div>
				<button
					className="plus"
					onClick={() =>
						handleEditCartIncrement(item.productId)
					}>
					+
				</button>
			</div>
			<button
				className="delete"
				onClick={() =>
					deleteCartItemHandler(item.productId)
				}>
				Delete Product
			</button>
		</div>
	);
};

export default CartItem;
