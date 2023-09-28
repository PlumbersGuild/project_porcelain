import { useGetBooksQuery } from "../reducers/api";

function BooksPage() {
  const { data, isLoading } = useGetBooksQuery();
  if (isLoading) {
    return <h1>LOADING...</h1>;
  }
  return (
    <>
      {data.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <h3>{book.subtitle}</h3>
          <p>{book.price}</p>
          <img src={book.image} alt={book.title} />
        </div>
      ))}
    </>
  );
}

export default BooksPage;
