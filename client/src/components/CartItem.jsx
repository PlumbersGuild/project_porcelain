import { useState } from "react";
import {
  useDeleteCartItemMutation,
  useEditCartItemMutation,
} from "../reducers/cart";

const CartItem = ({ item }) => {
  console.log(item);

  const [editCartItem] = useEditCartItemMutation();
  const [quantity, setQuantity] = useState(item.qty);
  const [deleteCartItem] = useDeleteCartItemMutation();

  const deleteCartItemHandler = async (id) => {
    await deleteCartItem(id).then(() => {
      location.reload();
    });
  };

  const handleEditCart = async (e, productId) => {
    setQuantity(e.target.value);
    await editCartItem({
      id: productId,
      body: {
        qty: +quantity + 1,
      },
    });
  };

  return (
    <div key={item.id} className="cartItem__container">
      <img src={item.product.image} />
      <div className="productInfo__container">
        <h1>{item.product.title}</h1>
        <h2>{item.product.subtitle}</h2>
        <h3 className="price">$ {item.price / 100}</h3>
      </div>
      <input
        type="number"
        value={quantity}
        onChange={(e) => handleEditCart(e, item.productId)}
      />
      <button
        className="delete"
        onClick={() => deleteCartItemHandler(item.productId)}
      >
        Delete Product
      </button>
    </div>
  );
};

export default CartItem;
