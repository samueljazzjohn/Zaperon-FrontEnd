import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { height } from '@mui/system';
import { Login } from '@mui/icons-material';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function App() {
  return (
    <>
      <Box component="header" display="flex" justifyContent="center" alignItems="center" style={{height:"100%"}}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<MainPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer autoClose={2000}  />
      </Box>
    </>
  );
}

export default App;
