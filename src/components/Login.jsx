import React, { useState,useContext } from 'react'
import { Box, Typography, InputAdornment, TextField, Button, makeStyles, Grid } from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form'
import hidePasswordSvg from '../assets/ic_hide_password.svg';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { height } from '@mui/system';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { toast } from 'react-toastify';



const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#003FB9',
        color: 'white',
        '&:hover': {
            backgroundColor: '#02318E',
        },
        [theme.breakpoints.up('xs')]: {
            width: '300px',
            height: '50px',
        },
        [theme.breakpoints.up('md')]: {
            width: '500px',
            height: '55px'
        },
    },
    TextField: {
        border: '2px #003FB9',
        [theme.breakpoints.up('xs')]: {
            width: '300px',
            height: '50px',
        },
        [theme.breakpoints.up('md')]: {
            width: '500px',
            height: '55px'
        },
    }
}
));


const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()

    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const classes = useStyles();

    const [loading, setLoading] = useState(false)

    const onSubmit = (data) => {
        setLoading(true)
        if (data.email == '') {
            setErrorEmail(true)
            setLoading(false)
        } else if (data.password.length < 8) {
            setErrorEmail(false)
            setErrorPassword(true)
            setLoading(false)
        } else {
            setErrorEmail(false)
            setErrorPassword(false)
            console.log(data)
            axios.get('http://localhost:4004/login', { params: data }).then((res) => {
                setLoading(false)
                console.log(res.data.doc)
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('token', res.data.doc.token)
                localStorage.setItem('username', res.data.doc._doc.username)
                toast.success("Login Successfull")
                navigate('/home')
            }).catch((err) => {
                console.log(err.message)
                setLoading(false)
                if(err.request.status==500){
                    toast.error("Please make sure that you have proper network");
                }else if(err.request.status==401){
                    toast.error("Invalid credentials");
                }else if(err.request.status==403){
                    toast.error("Please enter valid password");
                }else{
                    toast.error("Server error")
                }
            })
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-2 flex flex-col justify-center items-center w-full space-y-5'>
                <TextField type='email' className={classes.TextField} {...register('email',)} id="outlined-basic" label="Email Address" variant="outlined" InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <div className='h-8 w-8 rounded-full bg-yellow-500 hover:bg-[#003FB9] hover:text-white cursor-pointer flex justify-center items-center'>1</div>
                        </InputAdornment>
                    ),
                }} error={errorEmail} helperText={errorEmail ? "Please enter email address" : ""} />
                <TextField type={showPassword ? "text" : "password"} className={classes.TextField} {...register('password',)} id="outlined-basic" label="Password" variant="outlined" InputProps={{
                    endAdornment: (
                        <InputAdornment className='cursor-pointer' onClick={handleShowPassword} position="end">
                            <img src={hidePasswordSvg} alt="Image" />
                        </InputAdornment>
                    ),
                }} error={errorPassword} helperText={errorPassword ? "Password must be 8 charancter long" : ""} />
                 <Typography className='text-[#003FB9] right-0 translate-x-44' variant="body1" component="body1">Forgot Password?</Typography>
                {loading ? <LoadingButton className='w-[500px] h-[55px] text-white' style={{ background: '#003FB9', color: "white" }}
                    loading
                    sx={{
                        color: 'white',
                        '& .MuiCircularProgress-circle': {
                            color: 'white',
                        },
                    }}
                >
                </LoadingButton> :
                    <Button className={classes.button} type='submit' variant="text">  <Typography className='font-sans' variant="h6" style={{textTransform: 'none'}}>Sign In</Typography>
                            <div className='h-8 w-8 rounded-full bg-yellow-500 hover:bg-[#02318E] text-white hover:text-[#02318E] cursor-pointer flex justify-center items-center translate-x-48'>2</div>

                    </Button>
                }

            </form>
        </>
    )
}

export default Login