import * as React from 'react';
import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Box, TextField, Modal, Link, Autocomplete, Divider } from "@mui/material";
import SearchInput from "../search/SearchInput";
import { Context } from "../../common/Context";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../NavigationBar/NavigationBar.css'

const orangeTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'purple',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'purple',
          },
          '&.Mui-focused .MuiOutlinedInput-input': {
            color: 'purple',
          },
          '&:hover .MuiOutlinedInput-input': {
            color: 'purple',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          color: 'black',
          borderRadius: '5px',
          boxShadow: 'none',
        },
      },
    },
  },
});


function NavigationBar({ loggedIn, isAdmin, isProductPage }) {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [products, setProducts] = useState([]);
  const {setSearchQuery} = useContext(Context);
  const productOptions = products.map(product => ({
    key: product._id, // use product ID as the key
    label: product.name,
    value: product._id
  }));

  React.useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data || []);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogout = () => {
    setOpenLogoutModal(true);
  }

  const handleCloseLogoutModal = () => {
    setOpenLogoutModal(false);
  }

  const handleConfirmLogout = () => {
    window.location.href = '/'; // Redirect to home page
    window.history.replaceState(null, null, '/');
  };

  const handleSearch = (value) => {
    setSearchQuery(value || '');
  };

  return (
    <Box className="Main-Box" sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#333333', paddingTop: 1, paddingBottom: 1 }}> {/* Change the background color here */}
        <Toolbar>
          <Typography variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 800,
              letterSpacing: '.3rem',
              color: '#a997de',
              textDecoration: 'none',
              flexGrow: 1
            }}>
            upGrad <ShoppingCartIcon sx={{ marginBottom: -1, marginLeft: 1, marginRight: 1 }} /> Eshop
          </Typography>
          {loggedIn ? (
            <>
              {isProductPage && 
              <div className='search-bar'>
                <SearchIcon />
                <ThemeProvider theme={orangeTheme}>
                  <Autocomplete
                    id="search-bar"
                    sx={{ width: "100%", backgroundColor: "#333333", color: 'white', borderRadius: "5px" }}
                    options={productOptions}
                    getOptionLabel={(option) => option.label}
                    getOptionKey={(option) => option.key}
                    onChange={(event, newValue) => handleSearch(newValue?.label)}
                    isOptionEqualToValue={(option, value) => option.key === value.key}
                    renderInput={(params) => (
                      <div>
                        <TextField
                          {...params}
                          label="Search"
                          variant="outlined"
                          InputLabelProps={{
                            style: {
                              color: '#a997de',
                            },
                          }}
                        />
                      </div>
                    )}
                  />
                </ThemeProvider>
              </div>}
              <Link to='/'>
                <Button color="inherit" variant="contained" sx={{ marginLeft: 3, color: 'purple' }}>Home</Button>
              </Link>
              {isAdmin && <Link to = "/mng-product" ><Button color="inherit" variant="outlined" sx={{ marginLeft: 3, color: 'white' }}>Add Product</Button></Link>}
              <Button onClick={handleLogout} color="inherit" variant="outlined" sx={{ marginLeft: 3, color: 'white' }}>LogOut</Button>
              <Modal
                open={openLogoutModal}
                onClose={handleCloseLogoutModal}
                aria-labelledby="logout-modal-title"
                aria-describedby="logout-modal-description"
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#FFF',
                    padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="h5" component="h2" gutterBottom sx={{textAlign: 'center', fontStyle: 'italic'}}>
                    Logout
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Are you sure you want to log out ? <br/>
                     <br/>
                  </Typography>
                  <Button onClick={handleConfirmLogout} variant="outlined" color="inherit" sx={{ color: 'white', backgroundColor: '#333333', marginRight: '10px' }}>
                    Yes
                  </Button>
                  <Button onClick={handleCloseLogoutModal} variant="outlined" color="inherit" sx={{ marginLeft: 17 }}>
                    No
                  </Button>
                </div>
              </Modal>
            </>
          ) : (
            <>
              <Link to="/signin"><Button color="inherit" variant="outlined" sx={{ marginLeft: 3, color: '#a997de' }}>Sign In</Button></Link>
              <Link to="/signup"><Button color="inherit" variant="outlined" sx={{ marginLeft: 3, color: '#a997de' }}>Sign Up</Button></Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavigationBar;