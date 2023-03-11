import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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






function Ownersignup() {

  const navigate=useNavigate()

  const [firstname, setFirstName] = useState(false);
  const [firstNameerr, setFirstNameerr] = useState("");
  const [lastname, setLastName] = useState(false);
  const [lastNameerr, setLastNameerr] = useState("");
  const [email, setEmail] = useState(false);
  const [emailerr, setEmailErr] = useState("");
  const [password, setPassword] = useState(false);
  const [passworderr, setPasswordErr] = useState("");
  const [cpassword, setCpassword] = useState(false);
  const [cpassworderr, setCpasswordErr] = useState("");
  const [phone, setPhone] = useState(false);
  const [phoneerr, setPhoneerr] = useState("");



  const handleSubmits = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //input datas
    let obj = {
      firstname: data.get("firstName"),
      lastname: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      password: data.get("password"),
      cpassword: data.get("confirmpassword"),
    };
    if(obj.firstname &&
      obj.lastname &&
      obj.email &&
      obj.phone &&
      obj.password &&
      obj.cpassword){
      let regName = /^[a-zA-Z]+$/;
      let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let mob = /^([+]\d{2})?\d{10}$/;
      if (regName.test(obj.firstname.toString())) {
        setFirstName(false);
        setFirstNameerr("");
        if (regName.test(obj.lastname.toString())) {
          setLastName(false);
          setLastNameerr("");
          if(regEmail.test(obj.email.toString())){
            setEmail(false);
            setEmailErr("");
            if(obj.password === obj.cpassword){
              setPassword(false);
              setCpassword(false);
              setPasswordErr("");
              setCpasswordErr("");
              if(mob.test(obj.phone.toString())){
                setPhone(false);
                setPhoneerr("");
                Axiosinstance.post('/owner/owner_signup',obj).then((response)=>{
                  if(response.data.status==='success'){
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
                setPhone(true);
                setPhoneerr("Enter valid phone number");
              }
            }else{
              setPassword(true);
              setCpassword(true);
              setPasswordErr("Password and confirm password not same");
              setCpasswordErr("Password and confirm password not same");
            }
          }else{
            setEmail(true);
            setEmailErr("Please enter valid email address");
          }
        }else{
          setLastName(true);
          setLastNameerr("please enter valid lastname");
        }
      }else{
        setFirstName(true);
        setFirstNameerr("Please enter valid firstname");
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
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmits} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={firstname}
                  helperText={firstNameerr}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={lastname}
                  helperText={lastNameerr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='text'
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  autoComplete="phone"
                  error={phone}
                  helperText={phoneerr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={email}
                  helperText={emailerr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={password}
                  helperText={passworderr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  error={cpassword}
                  helperText={cpassworderr}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={
                "mt-3 mb-2 text-black bg-white  hover:bg-black hover:text-white"}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={()=>{navigate('/owner/login')}} variant="body2">
                  Already have an account? Login
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

export default Ownersignup