import React, { useState } from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


import { useNavigate } from 'react-router-dom';
import Axiosinstance from '../../../config/Axiosinstance';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit">
          Hotale
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const darkTheme = createTheme({
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







function Ownerlogin() {


    const navigate=useNavigate()

    const [email, setEmail] = useState(false);
    const [emaileerr,setEmaileerr] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let obj = {
        email: data.get("email"),
        password: data.get("password"),
      };
        if(obj.email&&obj.password){
          let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if(regEmail.test(obj.email.toString())){
            setEmail(false);
            setEmaileerr("");
            Axiosinstance.post('/owner/owner_login',obj).then((response)=>{
              const data=response.data
              if(data.status==="success"){
                const token=response.data.token
                localStorage.setItem('ownertoken',token);
                navigate('/owner')
              }else if(data.status==="otpsend"){
                const id=response.data.ownerId
                navigate('/owner/getotp',{state:{id:id}})
              }else{
                toast.error(`${response.data.message}`, {
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
            })
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
    }

    return (
        <ThemeProvider theme={darkTheme}>
          <ToastContainer />
        <CssBaseline />
        <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                scrollPaddingBlock: 4,
                display: "flex",
                border: 1,
                borderRadius: 2,
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: 4,
                paddingLeft: 4,
                paddingRight: 4,
            }}
            >
            <Avatar sx={{ m: 4, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
                Log in
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
            <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={email}
                helperText={emaileerr}
                autoFocus
                />
                <TextField
                margin="normal"
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
                className={'mt-3 mb-2 bg-white text-black hover:bg-black hover:text-white '}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link onClick={()=>{navigate('/owner/signup')}} variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>

            <Copyright sx={{ mt: 5 }} />
        </Container>
    </ThemeProvider>
    )
}

export default Ownerlogin