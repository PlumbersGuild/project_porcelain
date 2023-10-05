import { useSelector } from "react-redux";
import {
  useGetCartItemsQuery,
  useEditCartItemMutation,
  useDeleteCartItemMutation,
} from "../reducers/cart";
import CartItem from "../components/CartItem";

function CartPage() {
  const cart = useSelector((state) => state.cart.cart);

  const tPrice = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  return (
    <>
      <div className="cartPage">
        <div className="cart_container">
          <h1 className="shopping_title">Shopping Cart</h1>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
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
          <button>Checkout</button>
        </div>
      </div>
    </>
  );
}

export default CartPage;
// expected total price: 15,622
