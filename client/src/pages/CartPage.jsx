import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { useSubmitOrderMutation } from "../reducers/cart.js";
import { useState, useEffect } from "react";
import GuestCartItem from "../components/GuestCartItem";
import { Link } from "react-router-dom";

function CartPage() {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.credentials.token);

  const calculateTPrice = () => {
    if (!user) {
      if (window.localStorage.key("cart")) {
        const guestCart = JSON.parse(window.localStorage.getItem("cart"));
        return guestCart?.reduce(
          (acc, curr) => acc + curr.book.price * curr.qty,
          0
        );
      }
    } else {
      return cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    }
  };

  const [submitOrder] = useSubmitOrderMutation();

	const [loading, setLoading] = useState(true);
	const [cartProducts, setCartProducts] = useState([]);

	useEffect(() => {
		const renderGuestCart = async () => {
			setLoading(true);
			const cartStorage =
				window.localStorage.getItem("cart");
			const cartStorageArr = await JSON.parse(cartStorage);
			setCartProducts(cartStorageArr);
			setLoading(false);
			return cartStorageArr;
		};

    if (!user) {
      console.log(`not user: `);
      renderGuestCart();
    }
  }, []);

  // if (loading) {
  // 	return <h1>LOADING...</h1>;
  // }

  const submitOrderHandler = async () => {
    await submitOrder();
  };
  return (
    <>
      {" "}
      <div className="cartPage">
        <div className="cart_container">
          <h1 className="shopping_title">Shopping Cart</h1>
          {!user && cartProducts.length !== 0
            ? cartProducts.map((item) => (
                <GuestCartItem key={item.id} item={item} />
              ))
            : cart.map((item) => <CartItem key={item.id} item={item} />)}
        </div>
        <div className="checkout__container">
          <h1>Summary</h1>
          <div className="price_info">
            <div className="subtotal">
              <h2>SUBTOTAL</h2>
              <h2>$ {tPrice / 100}</h2>
            </div>
            <div className="shipping">
              <h2>SHIPPING</h2>
              <h2>FREE</h2>
            </div>
            <div className="tax">
              <h2>TAXES</h2>
              <h2>NONE!</h2>
            </div>
          </div>
          <div className="total">
            <h2>TOTAL</h2>
            <h2>$ {tPrice / 100}</h2>
          </div>
          <Link
            className="checkout_button"
            onClick={submitOrderHandler}
            to={"/checkout"}
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartPage;
