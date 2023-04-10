import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button } from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import user from '../assets/user.png'
import { useForm } from 'react-hook-form'
import logo from '../assets/zaperon_logo.png'
import CircularProgress from '@mui/material/CircularProgress';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Hidden } from '@material-ui/core';
import { toast } from 'react-toastify';

const HomePage = () => {

    const navigate=useNavigate()
    
    const [token,setToken] = useState()

    useEffect(() => {

        setToken(localStorage.getItem('token')) 

        if (!localStorage.getItem('isLoggedIn')) {
            navigate('/')
        }

        // call API every 10 seconds
        const intervalId = setInterval(fetchData, 10000);

        // cleanup function to clear the interval
        return () => clearInterval(intervalId);

    })

    const fetchData = async () => {
        console.log(token)
        axios.get('http://localhost:4004/check-session', { headers: { "authorization": `Bearer ${token}` } }).then((res) => {
            console.log(res.request.status)
        }).catch((err) => {
            console.log(err.request.status)
            if(err.request.status===401){
                localStorage.clear()
                toast.error("Session Expired")
                navigate('/')
            }
        })
    };



  return (
    <>
            <Box className='h-[95%] flex flex-col justify-center  items-center'
            >
                <div className='h-[200px] w-[200px] bg-[#EFEFEF] rounded-full flex justify-center items-center mx-auto'>
                    <img className='h-[100px] w-[100px]' src={user} alt="" />
                </div>
                
                <Typography className='text-[20px] text-[#0B3558] items-center mx-auto font-[600]' variant="h2" component="h2">Welcome {localStorage.getItem('username')}</Typography>
            </Box>
            <div className='w-full statice bottom-0 flex flex-row justify-between px-5 py-1'>
                <div className='flex flex-row justify-start space-x-2'>
                    <Typography className='text-[#728391]' variant="body1" component="p">Powered By</Typography>
                    <img src={logo} alt="" />
                </div>
                <div>
                    <Hidden smDown>
                    <div className='flex flex-row justify-start space-x-5'>
                        <Typography className='text-[#003FB9]' variant="body1" component="p">Need help? </Typography>
                        <Typography className='text-[#003FB9]' variant="body1" component="p">Privacy Policy <span className='text-[#A2A2A2]'>&</span> terms</Typography>
                    </div>
                    </Hidden>
                </div>
            </div>
        </>
  )
}

export default HomePage