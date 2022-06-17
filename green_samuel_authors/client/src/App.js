import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthorForm from './components/AuthorForm';
import DisplayAllAuthors from './components/DisplayAllAuthors';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import EditAuthor from './components/EditAuthor';



function App() {
  return (
    <div className="App">
      <Typography variant="h3" sx={{my: 2, mx: 5}}>The Author<Box variant="h3" sx={{fontStyle: "italic", display: "inline"}}>-ity</Box></Typography>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayAllAuthors/>} />
          <Route path="/new" element={<AuthorForm/>} />
          <Route path="/edit/:id" element={<EditAuthor/>} />

        </Routes>
      
      </BrowserRouter>
    </div>
  );
}
export default App;

