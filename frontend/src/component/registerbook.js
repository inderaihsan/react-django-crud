import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const BookRegistrationForm = () => {
  const [libraries, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');

  useEffect(() => {
    // Fetch libraries from the API
    axios.get('http://127.0.0.1:8000/bookstore/read_library')
      .then(response => {
        setLibraries(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching libraries:', error);
      });

    // Fetch books from the API
    axios.get('http://127.0.0.1:8000/bookstore/read_books')
      .then(response => {
        setBooks(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleLibrarySelect = (event) => {
    setSelectedLibrary(event.target.value);
  };

  const handleBookSelect = (event) => {
    setSelectedBook(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      library_id: selectedLibrary,
      book_id: selectedBook,
    };

    axios
      .post('http://127.0.0.1:8000/bookstore/registerbookstolibrary', payload)
      .then(response => {
        console.log('Registration successful:', response);
        createNotification('success', 'Book registered successfully!');
        // Handle success scenario
      })
      .catch(error => {
        console.error('Error registering book to library:', error);
        createNotification('error', 'Error registering book to library!');
        // Handle error scenario
      });
  };

  const createNotification = (type, message) => {
    switch (type) {
      case 'success':
        NotificationManager.success(message, 'Success');
        break;
      case 'error':
        NotificationManager.error(message, 'Error');
        break;
      default:
        break;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: '400px' }}>
        <h3 className="mb-4">Register Books License</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="librarySelect">
            <Form.Label>Select Library</Form.Label>
            <Form.Control as="select" onChange={handleLibrarySelect} value={selectedLibrary}>
              <option value="">Select Library</option>
              {libraries.map(library => (
                <option key={library.id} value={library.id}>{library.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="bookSelect">
            <Form.Label>Select Book</Form.Label>
            <Form.Control as="select" onChange={handleBookSelect} value={selectedBook}>
              <option value="">Select Book</option>
              {books.map(book => (
                <option key={book.id} value={book.id}>{book.title}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
        <NotificationContainer />
      </div>
    </div>
  );
};

export default BookRegistrationForm;
