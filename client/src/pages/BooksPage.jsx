import { useGetBooksQuery } from "../reducers/api";
import { Link } from "react-router-dom";
import Placeholder from "../assets/placeholder.png";

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

  return (
    <>
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
