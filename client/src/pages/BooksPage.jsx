import { useGetBooksQuery } from "../reducers/api";
import { Link } from "react-router-dom";

function BooksPage() {
  const { data, isLoading } = useGetBooksQuery();
  if (isLoading) {
    return <h1>LOADING...</h1>;
  }
  const sqlBooks = data.filter((book) => book.category === "sql");
  const noSqlBooks = data.filter((book) => book.category === "nosql");
  const mongodbBooks = data.filter((book) => book.category === "mongodb");
  const javascriptBooks = data.filter((book) => book.category === "javascript");
  const reactBooks = data.filter((book) => book.category === "react");

  console.log(data);
  return (
    <>
      <h1 className="page__title">Featured Categories</h1>
      <div className="home__container">
        <div className="home__content">
          <h1>SQL</h1>
          <div className="list__container">
            <div className="list__books">
              {sqlBooks.map((book) => (
                <Link className="link" key={book.id} to={`/books/${book.id}`}>
                  <div className="list__book" key={book.isbn13}>
                    <h3>{book.title}</h3>
                    <h4>$ {book.price / 100}</h4>
                    <img src={book.image} alt={book.title} />
                    <button>Add to Cart</button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <h1>NoSQL</h1>
          <div className="list__container">
            <div className="list__books">
              {noSqlBooks.map((book) => (
                <Link className="link" key={book.id} to={`/books/${book.id}`}>
                  <div className="list__book" key={book.isbn13}>
                    <h3>{book.title}</h3>
                    <h4>$ {book.price / 100}</h4>
                    <img src={book.image} alt={book.title} />
                    <button>Add to Cart</button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <h1>MongoDB</h1>
          <div className="list__container">
            <div className="list__books">
              {mongodbBooks.map((book) => (
                <Link className="link" key={book.id} to={`/books/${book.id}`}>
                  <div className="list__book" key={book.isbn13}>
                    <h3>{book.title}</h3>
                    <h4>$ {book.price / 100}</h4>
                    <img src={book.image} alt={book.title} />
                    <button>Add to Cart</button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <h1>JavaScript</h1>
          <div className="list__container">
            <div className="list__books">
              {javascriptBooks.map((book) => (
                <Link className="link" key={book.id} to={`/books/${book.id}`}>
                  <div className="list__book" key={book.isbn13}>
                    <h3>{book.title}</h3>
                    <h4>$ {book.price / 100}</h4>
                    <img src={book.image} alt={book.title} />
                    <button>Add to Cart</button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <h1>React</h1>
          <div className="list__container">
            <div className="list__books">
              {reactBooks.map((book) => (
                <Link className="link" key={book.id} to={`/books/${book.id}`}>
                  <div className="list__book" key={book.isbn13}>
                    <h3>{book.title}</h3>
                    <h4>$ {book.price / 100}</h4>
                    <img src={book.image} alt={book.title} />
                    <button>Add to Cart</button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;
