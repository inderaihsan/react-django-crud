import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const BookCard = ({ book }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">Author: {book.author}</p>
        <p className="card-text">Year: {book.year}</p>
        <p className="card-text">Price: {book.price}</p>
      </div>
    </div>
  );
};

const LibraryCard = ({ library }) => {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{library.name}</h5>
        <p className="card-text">Address: {library.address}</p>
        <p className="card-text">Phone Number: {library.phone_number}</p>
        <p className="card-text">Email: {library.email}</p>
      </div>
    </div>
  );
};

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [viewingBook, setViewingBook] = useState(null);
  const [libraryData, setLibraryData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://127.0.0.1:8000/bookstore/read_books')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this book?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Send delete request to the backend API
            axios.post('http://127.0.0.1:8000/bookstore/delete_books', { book_id: id })
              .then(response => {
                console.log('Deletion successful:', response);
                // Show success notification
                createNotification('success', 'Book deleted successfully!');
                // Refresh the page or update the data state
                window.location.reload();
              })
              .catch(error => {
                console.error('Error deleting item:', error);
                // Show error notification
                createNotification('error', 'Error deleting book!');
              });
          }
        },
        {
          label: 'No',
          onClick: () => {
            // Do nothing, cancellation logic if needed
          }
        }
      ]
    });
  };

  const handleView = (id) => {
    // Fetch book details from the API
    axios
      .get(`http://127.0.0.1:8000/bookstore/get_books/${id}`)
      .then((response) => {
        console.log('Viewing item with ID:', id);
        const book = response.data.data;
        const libraryData = response.data.library_data

        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="custom-ui">
                <h3>Book Details</h3>
                <BookCard book={book} />

                <h3 className="mt-3">Library Information</h3>
                {libraryData.map(library => (
                  <LibraryCard key={library.id} library={library} />
                ))}

                <button className="btn btn-primary mt-3" onClick={onClose}>
                  Close
                </button>
              </div>
            );
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  };

  const handleEdit = (id) => {
    // Find the book to edit based on its ID
    const bookToEdit = data.find(item => item.id === id);
    setEditingBook(bookToEdit);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Prepare the payload with book_id and updated book data
    const payload = {
      book_id: editingBook.id,
      ...editingBook
    };
    // Send the updated book data to the API
    axios
      .post('http://127.0.0.1:8000/bookstore/update_book', payload)
      .then(response => {
        console.log('Update successful:', response);
        // Show success notification
        createNotification('success', 'Book updated successfully!');
        // Clear the editingBook state
        setEditingBook(null);
        // Refresh the page after a delay of 1.5 seconds
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch(error => {
        console.error('Error updating book:', error);
        // Show error notification
        createNotification('error', 'Error updating book!');
      });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditingBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
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
    <div className="container">
      <div className="mt-5 table-container">
        <h3>Available Books</h3>
        <div className="table-scroll">
          <table className="table mt-3">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.year}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm mr-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm mr-2"
                      onClick={() => handleView(item.id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NotificationContainer />

      {editingBook && (
        <div className="modal-container">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Book</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEditingBook(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={editingBook.title}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Author</label>
                    <input
                      type="text"
                      className="form-control"
                      name="author"
                      value={editingBook.author}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input
                      type="text"
                      className="form-control"
                      name="year"
                      value={editingBook.year}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={editingBook.price}
                      onChange={handleFormChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
