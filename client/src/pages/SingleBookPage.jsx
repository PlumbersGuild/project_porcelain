import { useGetBookByIdQuery } from "../reducers/api";
import { useParams } from "react-router-dom";
import Placeholder from "../assets/placeholder.png";

const SingleBookPage = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading book data</div>;
  }

  return (
    // <div className="book-details">
    // 	<h2>Book Details</h2>
    // 	<p>Title: {book.title}</p>
    // 	<p>Subtitle: {book.subtitle}</p>
    // 	<p>Price: {book.price}</p>
    // 	<img
    // 		src={book.image}
    // 		alt={book.title}
    // 	/>
    // </div>
    <div className="main__container">
      <div className="img__container">
        <img src={Placeholder} alt={book.title} />
      </div>
      <div className="information__container">
        <div className="title__container">
          <h2>{book.title}</h2>
          <h3>{book.subtitle}</h3>
        </div>
        <div className="lorem">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          nesciunt officiis nulla ad nobis! Delectus repudiandae, quibusdam,
          vero laborum odit atque temporibus unde ullam minus mollitia
          voluptatem est ipsum nisi.
        </div>
        <h4>$ {book.price / 100}</h4>
      </div>
    </div>
  );
};

export default SingleBookPage;
