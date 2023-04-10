import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { height } from '@mui/system';
import { Login } from '@mui/icons-material';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorPage from './pages/ErrorPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";



function App() {
  const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/home",
        element: <HomePage />,
    }
]);
  return (
    <>
      <Box component="header" display="flex" justifyContent="center" alignItems="center" style={{height:"100%"}}>
        {/* <BrowserRouter>
          <Routes>
            <Route path="/login" element={<MainPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/home" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter> */}
        <RouterProvider router={router} />
        <ToastContainer autoClose={2000}  />
      </Box>
    </>
  );
}

export default App;
