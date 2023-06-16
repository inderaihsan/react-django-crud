import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const CreateLibrary = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'address') {
      setAddress(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const libraryData = {
      name,
      address,
      phone_number: phoneNumber,
      email
    };

    // Send the form data to the API
    sendLibraryData(libraryData);

    // Reset the input fields
    setName('');
    setAddress('');
    setPhoneNumber('');
    setEmail('');
  };

  const sendLibraryData = async (libraryData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/bookstore/create_library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(libraryData)
      });

      if (response.ok) {
        // Handle successful response
        NotificationManager.success('Library inserted to database!', 'Notification');
      } else {
        // Handle error response
        NotificationManager.error('Error sending library data', 'Error');
      }
    } catch (error) {
      // Handle network error
      NotificationManager.error('Error sending library data', 'Error');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Create Library</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
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

export default CreateLibrary;
