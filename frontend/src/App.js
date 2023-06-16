import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataDisplay from './component/datadisplay';
import DataDisplayPerpus from './component/datadisplaylibray';
import Navbar from './component/navbar';
import Create from './component/create';
import CreateLibrary from './component/createlibrary'
import View from './component/view';
import BookRegistration from './component/registerbook';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<DataDisplay />} />
          <Route path="/create" element={<Create />} />
          <Route path="/create_perpus" element={<CreateLibrary />} />
          <Route path="/view/:id" render={({ match }) => <View match={match} />} />
          <Route path="/display_perpus"  element={<DataDisplayPerpus />} />
          <Route path="/registration"  element={<BookRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
