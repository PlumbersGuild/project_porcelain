import { useSelector } from "react-redux";
import {
  useGetCartItemsQuery,
  useEditCartItemMutation,
  useDeleteCartItemMutation,
} from "../reducers/cart";
import { useState, useEffect } from "react";

function CartPage() {
  const cart = useSelector((state) => state.cart.cart);

  const [editCartItem] = useEditCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(null);

  const deleteCartItemHandler = async (id) => {
    await deleteCartItem(id).then(() => {
      location.reload();
    });
  };

  useEffect(() => {
    let prce = 0;
    cart.forEach((item) => {
      const qty = item.qty;
      const price = item.price;
      const newPrice = qty * price;
      prce += newPrice;
    });
    setTotalPrice(prce);
  }, [cart]);

  return (
    <>
      <div className="cartPage">
        <div className="cart_container">
          {cart.map((item) => (
            <div key={item.id} className="cartItem__container">
              <img src={item.product.image} />
              <div className="productInfo__container">
                <h1>{item.product.title}</h1>
                <h2>{item.product.subtitle}</h2>
                <h3 className="price">$ {item.price / 100}</h3>
              </div>
              <h3 className="qty">{item.qty}</h3>
              <input
                type="number"
                value={item.qty}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button
                className="delete"
                onClick={() => deleteCartItemHandler(item.productd)}
              >
                Delete Product
              </button>
            </div>
          ))}
        </div>
        <div className="checkout__container">BLAH BLAH BLAH</div>
      </div>
    </>
  );
}

export default CartPage;
// expected total price: 15,622
