import React, { useState } from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { adminLogin } from '../../config/Service/AdminRequest';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
        palette: {
        mode: "dark",
        primary: {
            dark: "#000807",
            light: "#ffffff",
            main: "#ffffff",
            contrastText: "#fff",
        },
        secondary: {
            light: "#8F0992",
            main: "#f44336",
            dark: "#2C2C32",
            contrastText: "#000",
        },
        },
    });



function AdminLoginPage() {

    const navigate=useNavigate()

    const [email, setEmail] = useState(false);
    const [emaileerr,setEmaileerr] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let obj={
            email: data.get('email'),
            password: data.get('password'),
        }
        if(obj.email&&obj.password){
            let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(regEmail.test(obj.email.toString())){
                const data=await adminLogin(obj)
                if(data.status==="success"){
                    const token=data.token
                    localStorage.setItem("adminToken",token)
                    navigate('/admin')
                }else{
                    toast.error(`${data.message}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                }
            }else{
                setEmail(true);
                setEmaileerr("Please enter valid email address");
            }

        }else{
            toast.error(`OOPS! All fields are required`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    };
    
    return (
            <ThemeProvider theme={theme}>
            <ToastContainer />
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                HOTALE
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    error={email}
                    helperText={emaileerr}
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                </Box>
            </Box>
            </Grid>
        </Grid>
        </ThemeProvider>
    )
}

export default AdminLoginPage