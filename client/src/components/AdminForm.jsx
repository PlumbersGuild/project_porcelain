import {
  useEditProductMutation,
  useDeleteProductMutation,
} from "../reducers/api";
import { useState } from "react";
import Placeholder from "../assets/placeholder.png";
import { Link } from "react-router-dom";
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

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
  };
  return (
    <div className="form_container">
      <div>
        <button
          className="edit_toggle"
          onClick={() => setEditProductToggle(!editProductToggle)}
        >
          Edit Product
        </button>
        <Link to={"/"}>
          <button
            className="delete_button"
            onClick={() => handleDeleteProduct(book.id)}
          >
            Delete Product
          </button>
        </Link>
      </div>

      {editProductToggle && (
        <form onSubmit={(e) => handleEditProduct(e)} className="admin_form">
          <label className="label">Title:</label>
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="label">Subtitle</label>
          <input
            className="input"
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <label className="label">Price:</label>
          <input
            className="price_input"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button className="submitEdit" type="submit">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

export default AdminForm;
