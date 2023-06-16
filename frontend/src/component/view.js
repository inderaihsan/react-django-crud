import React, { useEffect, useState } from 'react';
import axios from 'axios';

const View = ({ match }) => {
  const [book, setBook] = useState(null);
  const bookId = match.params.id;

  useEffect(() => {
    // Fetch the specific book data based on the ID
    axios
      .get(`http://127.0.0.1:8000/bookstore/get_books/${bookId}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Book Details</h1>
      <div>
        <strong>Title:</strong> {book.title}
      </div>
      <div>
        <strong>Author:</strong> {book.author}
      </div>
      <div>
        <strong>Year:</strong> {book.year}
      </div>
      <div>
        <strong>Price:</strong> {book.price}
      </div>
    </div>
  );
};

export default View;
