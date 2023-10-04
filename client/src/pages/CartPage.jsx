import { useSelector } from "react-redux";

function CartPage() {
	const cart = useSelector((state) => state);
	return (
		<>
			<h1>Welcome to the Cart Page</h1>
		</>
	);
}

export default CartPage;
