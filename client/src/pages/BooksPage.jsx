import { useGetBooksQuery } from "../reducers/api";
import { Link } from "react-router-dom";
import Placeholder from "../assets/placeholder.png";
import { useAddProductMutation } from "../reducers/api";
import { useState } from "react";
import { useSelector } from "react-redux";
function BooksPage() {
  useGetBooksQuery();
  const books = useSelector((state) => state.data.books);
  const [addProduct] = useAddProductMutation();
  const [addProductToggle, setAddProductToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("sql");
  if (useGetBooksQuery().isLoading) {
    return <h1>LOADING...</h1>;
  }
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddProductToggle(!setAddProductToggle);
    await addProduct({
      title: title,
      subtitle: subtitle,
      image: Placeholder,
      price: +price,
      category: category,
    });
  };
  const sqlBooks = books.filter((book) => book.category === "sql");
  const noSqlBooks = books.filter((book) => book.category === "nosql");
  const mongodbBooks = books.filter((book) => book.category === "mongodb");
  const javascriptBooks = books.filter(
    (book) => book.category === "javascript"
  );
  const reactBooks = books.filter((book) => book.category === "react");

  const adminUser =
    window.sessionStorage.key("user") &&
    JSON.parse(window.sessionStorage.getItem("user"));
  return (
    <>
      {window.sessionStorage.key("user") && adminUser.isAdmin === true ? (
        <button
          onClick={() => setAddProductToggle(!addProductToggle)}
          className="add_product_button"
        >
          Add Product
        </button>
      ) : (
        <></>
      )}
      {addProductToggle && (
        <div className="form_container">
          <form onSubmit={handleAddProduct} className="admin_form">
            <label className="label">Title:</label>
            <input
              className="input"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="label">Subtitle:</label>
            <input
              className="input"
              type="text"
              onChange={(e) => setSubtitle(e.target.value)}
            />
            <label className="label">Price:</label>
            <input
              className="price_input"
              type="text"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label className="label" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={"sql"}>SQL</option>
              <option value={"nosql"}>NoSQL</option>
              <option value={"mongodb"}>MongoDB</option>
              <option value={"javascript"}>JavaScript</option>
              <option value={"react"}>React</option>
            </select>
            <button className="submitEdit" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      )}

      <h1 className="page__title">Featured Categories</h1>
      <div className="home__container">
        <div className="home__content">
          <h1>SQL</h1>
          <div className="list__container">
            <div className="list__books">
              {sqlBooks.map((book) => (
                <div className="list__book" key={book.isbn13}>
                  <h3>{book.title}</h3>
                  <h4>$ {book.price / 100}</h4>
                  <img src={Placeholder} alt={book.title} />
                  <Link className="link" key={book.id} to={`/books/${book.id}`}>
                    <button>View More</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <h1>NoSQL</h1>
          <div className="list__container">
            <div className="list__books">
              {noSqlBooks.map((book) => (
                <div className="list__book" key={book.isbn13}>
                  <h3>{book.title}</h3>
                  <h4>$ {book.price / 100}</h4>
                  <img src={Placeholder} alt={book.title} />
                  <Link className="link" key={book.id} to={`/books/${book.id}`}>
                    <button>View More</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <h1>MongoDB</h1>
          <div className="list__container">
            <div className="list__books">
              {mongodbBooks.map((book) => (
                <div className="list__book" key={book.isbn13}>
                  <h3>{book.title}</h3>
                  <h4>$ {book.price / 100}</h4>
                  <img src={Placeholder} alt={book.title} />
                  <Link className="link" key={book.id} to={`/books/${book.id}`}>
                    <button>View More</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <h1>JavaScript</h1>
          <div className="list__container">
            <div className="list__books">
              {javascriptBooks.map((book) => (
                <div className="list__book" key={book.isbn13}>
                  <h3>{book.title}</h3>
                  <h4>$ {book.price / 100}</h4>
                  <img src={Placeholder} alt={book.title} />
                  <Link className="link" key={book.id} to={`/books/${book.id}`}>
                    <button>View More</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <h1>React</h1>
          <div className="list__container">
            <div className="list__books">
              {reactBooks.map((book) => (
                <div className="list__book" key={book.isbn13}>
                  <h3>{book.title}</h3>
                  <h4>$ {book.price / 100}</h4>
                  <img src={Placeholder} alt={book.title} />
                  <Link className="link" key={book.id} to={`/books/${book.id}`}>
                    <button>View More</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;
