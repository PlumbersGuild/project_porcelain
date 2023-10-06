import { useGetBookByIdQuery } from "../reducers/api";
import { useParams } from "react-router-dom";
import Placeholder from "../assets/placeholder.png";

import { useSelector } from "react-redux";
import {
  useAddNewCartItemMutation,
  useGetCartItemsQuery,
} from "../reducers/cart";

const SingleBookPage = () => {

	const { id } = useParams();
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
			}
		} else {
			addNewCartItem(addBook);
      refetch();
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
