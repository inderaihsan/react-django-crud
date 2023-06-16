import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'year') {
      setYear(value);
    } else if (name === 'author') {
      setAuthor(value);
    } else if (name === 'price') {
      setPrice(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      title,
      year,
      author,
      price
    };

    // Send the form data to the API
    sendBookData(bookData);

    // Reset the input fields
    setTitle('');
    setYear('');
    setAuthor('');
    setPrice('');
  };

  const sendBookData = async (bookData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/bookstore/create_books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      });

      if (response.ok) {
        // Handle successful response
        NotificationManager.success('Book inserted to database!', 'Notification');
      } else {
        // Handle error response
        NotificationManager.error('Error sending book data', 'Error');
      }
    } catch (error) {
      // Handle network error
      NotificationManager.error('Error sending book data', 'Error');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Create Book</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="year" className="form-label">Year:</label>
              <input
                type="text"
                id="year"
                name="year"
                value={year}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author:</label>
              <input
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Create;
