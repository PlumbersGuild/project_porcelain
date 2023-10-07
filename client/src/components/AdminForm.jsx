import {
  useEditProductMutation,
  useDeleteProductMutation,
} from "../reducers/api";
import { useState } from "react";
import Placeholder from "../assets/placeholder.png";

function AdminForm({ book }) {
  const [editProduct] = useEditProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [editProductToggle, setEditProductToggle] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [subtitle, setSubtitle] = useState(book.subtitle);
  const [price, setPrice] = useState(book.price);

  const handleEditProduct = async (e) => {
    e.preventDefault();
    await editProduct({
      id: book.id,
      title: title,
      subtitle: subtitle,
      image: Placeholder,
      price: price,
    }).then(() => {
      setEditProductToggle(!editProductToggle);
      location.reload();
    });
  };
  return (
    <div>
      <button onClick={() => setEditProductToggle(!editProductToggle)}>
        Edit Product
      </button>
      {editProductToggle && (
        <form onSubmit={(e) => handleEditProduct(e)}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
      <button>Delete Product</button>
    </div>
  );
}

export default AdminForm;
