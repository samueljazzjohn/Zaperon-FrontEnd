import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button,Hidden } from '@material-ui/core';
import user from '../assets/user.png'
import logo from '../assets/zaperon_logo.png'
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const MainPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn')) {
            navigate('/home')
        }
    }, [])

    

    return (
        <>
            <Box className='h-[95%] flex flex-col justify-center  items-center'
            >
                <div className='h-[200px] w-[200px] bg-[#EFEFEF] rounded-full flex justify-center items-center mx-auto'>
                    <img className='h-[100px] w-[100px]' src={user} alt=""  />
                </div>
                <Typography className='text-[20px] text-[#0B3558] items-center mx-auto font-[600]' variant="h2" component="h2">Welcome!</Typography><Typography mt={1} className='text-[20px] items-center mx-auto text-[#0B3558]' variant="body1" component="p">Let's connect to your workspace</Typography>
                <Typography mt={1} className='text-[20px] items-center mx-auto text-[#0B3558]' variant="body1" component="p">Please enter your email to continue</Typography><Login />
            </Box>
            <div className='w-full statice bottom-0 flex flex-row justify-center md:justify-between px-5 py-1'>
                <div className='flex flex-row justify-start space-x-2'>
                    <Typography className='text-[#728391]' variant="body1" component="p">Powered By</Typography>
                    <img src={logo} alt="" />
                </div>
                <div>
                <Hidden smDown>
                    <div className='flex flex-row justify-start space-x-10'>
                        <Typography className='text-[#003FB9]' variant="body1" component="p">Need help?</Typography>
                        <Typography className='text-[#003FB9]' variant="body1" component="p">Privacy Policy <span className='text-[#A2A2A2]'>&</span> terms</Typography>
                    </div>
                    </Hidden>
                </div>
            </div>
        </>
    )
}

export default MainPage