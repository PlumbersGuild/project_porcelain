import { useGetBookByIdQuery } from "../reducers/api";
import { useParams } from "react-router-dom";

const SingleBookPage = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useGetBookByIdQuery(id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading book data</div>
    }

    return (
        <div className="book-details">
            <h2>Book Details</h2>
            <p>Title: {book.title}</p>
            <p>Subtitle: {book.subtitle}</p>
            <p>Price: {book.price}</p>
            <img src={book.image} alt={book.title} />
        </div>
    );
};

export default SingleBookPage;