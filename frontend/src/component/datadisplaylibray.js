import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const DataDisplayPerpus = () => {
  const [data, setData] = useState([]);
  const [editingLibrary, setEditingLibrary] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://127.0.0.1:8000/bookstore/read_library')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this library?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Send delete request to the backend API
            axios.post('http://127.0.0.1:8000/bookstore/delete_library', { library_id: id })
              .then(response => {
                console.log('Deletion successful:', response);
                // Show success notification
                createNotification('success', 'Library deleted successfully!');
                // Refresh the page or update the data state
                window.location.reload();
              })
              .catch(error => {
                console.error('Error deleting item:', error);
                // Show error notification
                createNotification('error', 'Error deleting library!');
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

  const handleEdit = (id) => {
    // Fetch library details from the API
    axios.get(`http://127.0.0.1:8000/bookstore/get_library/${id}`)
      .then(response => {
        console.log('Editing item with ID:', id);
        // Set the editingLibrary state to the fetched library data
        setEditingLibrary(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching library details:', error);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Prepare the payload with library_id and updated library data
    const payload = {
      library_id: editingLibrary.id,
      ...editingLibrary
    };
    // Send the updated library data to the API
    axios.post('http://127.0.0.1:8000/bookstore/update_library', payload)
      .then(response => {
        console.log('Update successful:', response);
        // Show success notification
        createNotification('success', 'Library updated successfully!');
        // Clear the editingLibrary state
        setEditingLibrary(null);
        // Refresh the page after a delay of 1.5 seconds
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch(error => {
        console.error('Error updating library:', error);
        // Show error notification
        createNotification('error', 'Error updating library!');
      });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditingLibrary(prevLibrary => ({
      ...prevLibrary,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <div className="mt-5 table-container">
        <h3>Library Data</h3>
        <div className="table-scroll">
          <table className="table mt-3">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm mr-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
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
      {editingLibrary && (
        <div className="mt-5">
          <h3>Edit Library</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="libraryName">Library Name</label>
              <input
                type="text"
                className="form-control"
                id="libraryName"
                name="name"
                value={editingLibrary.name}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="libraryAddress">Library Address</label>
              <input
                type="text"
                className="form-control"
                id="libraryAddress"
                name="address"
                value={editingLibrary.address}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="libraryPhone">Library Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="libraryPhone"
                name="phone_number"
                value={editingLibrary.phone_number}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="libraryEmail">Library Email</label>
              <input
                type="email"
                className="form-control"
                id="libraryEmail"
                name="email"
                value={editingLibrary.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      )}
      <NotificationContainer />
    </div>
  );
};

export default DataDisplayPerpus;
