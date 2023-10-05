// import { useState } from "react";
// import {
//   useDeleteCartItemMutation,
//   useEditCartItemMutation,
// } from "../reducers/cart";

// const CartItem = ({ item }) => {
//   console.log(item);

//   const [editCartItem] = useEditCartItemMutation();
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [quantity, setQuantity] = useState(null);
//   const [deleteCartItem] = useDeleteCartItemMutation();

//   const deleteCartItemHandler = async (id) => {
//     await deleteCartItem(id).then(() => {
//       location.reload();
//     });
//   };

//   return (
//     <div key={item.id} className="cartItem__container">
//       <img src={item.product.image} />
//       <div className="productInfo__container">
//         <h1>{item.product.title}</h1>
//         <h2>{item.product.subtitle}</h2>
//         <h3 className="price">$ {item.price / 100}</h3>
//       </div>
//       <h3 className="qty">{item.qty}</h3>
//       <input
//         type="number"
//         value={item.qty}
//         onChange={(e) => setQuantity(e.target.value)}
//       />
//       <button
//         className="delete"
//         onClick={() => deleteCartItemHandler(item.productId)}
//       >
//         Delete Product
//       </button>
//     </div>
//   );
// };

// export default CartItem;
