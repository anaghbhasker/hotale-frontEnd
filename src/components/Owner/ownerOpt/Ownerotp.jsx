import React, {  } from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Container,
    Typography,
    Box,
    FormControl,
    } from "@mui/material";
    import MenuBook from "@mui/icons-material/MenuBook";
    import 'react-toastify/dist/ReactToastify.css';
    import { ToastContainer, toast } from 'react-toastify';


    import Axiosinstance from '../../../config/Axiosinstance';
    import { useLocation, useNavigate } from 'react-router-dom';

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



function Ownerotp() {

        const navigate=useNavigate()

        const location=useLocation()
        const ownerId=location.state.id

        const handleSubmits = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //input datas
        let otp = data.get("otp")
        let obj={
          otp:otp,
          ownerId:ownerId
        }
        Axiosinstance.post('/owner/otpVerify',obj).then((response)=>{
            if(response.data.status==="success"){
              navigate('/owner/login')
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
            <Avatar sx={{ m: 4, bgcolor: "primary.main", padding: 3 }}>
                <MenuBook />
            </Avatar>
            <Typography component="h1" variant="h5">
                Otp verification
            </Typography>
            <div id='recaptcha-container' />
            <Typography component="h6" variant="h6">
                {/* {userDetails?.phone} */}
            </Typography>
            <Box component="form" onSubmit={handleSubmits} sx={{ mt: 3 }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Grid container spacing={2}>
                
                    <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    type='number'
                    id="otp"
                    label="otp"
                    name="otp"
                    autoComplete="otp"
                    // error={email}
                    // helperText={emailerr}
                  />
                </Grid>
                <div id='recaptcha-container' />

            
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={
                  "mt-3 mb-2 bg-white text-black hover:bg-black hover:text-white "
                }
              >
                Verify
              </Button>
              <Grid container justifyContent="flex-end"></Grid>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    )
}

export default Ownerotp