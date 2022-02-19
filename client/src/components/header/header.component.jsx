import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";

import axios from "axios";

import { setUser } from '../../redux/user/user.actions';

import CustomButton from "../custom-button/custom-button.component";
import Button from '@mui/material/Button';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { red } from "@mui/material/colors";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {

    //LOGIN
    const dispatch = useDispatch();

    const { user, isAuthenticated, loginWithRedirect, logout, } = useAuth0();

    const [cardValue, setCardValue] = useState({
        'searchCardInput': ''
    });

    const handleSearchCard = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCardValue({...cardValue, [name]:value})
        console.log("Card Value Is:", cardValue)
        axios.post(`http://localhost,`, {cardValue})
            .then(response => {
                response.data.map(item => {
                    const abc = `<div>${item.whatever}</div>`
                    return abc
                })
            })
    }

    useEffect(() => {
        if (user) {
            axios.post(`http://localhost:8080/api/users/`, { user })
                .then(result => {
                    dispatch(setUser(result.data));
                })
                .catch(error => console.log(error));
        }
    }, [user])

    //-----------------------------------------------------

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <Box>Lumos-LL-Final/client/public/favicon.ico</Box>
        <IconButton size="small" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <Box >
        {!isAuthenticated
            ?
        <MenuItem

        onClick={() => loginWithRedirect()}>    
            <IconButton
            size="small"
            aria-label="show 17 new notifications"
            color="inherit"
            >
            <Badge badgeContent={0} color="error">
                <NotificationsIcon />
            </Badge>
            </IconButton>
            <p>Sign In</p>
        </MenuItem>
        :
        <MenuItem
        onClick={() => logout()}>
            <IconButton
            size="small"
            aria-label="show 17 new notifications"
            color="inherit"
            >
            <Badge badgeContent={0} color="error">
                <NotificationsIcon />
            </Badge>
            </IconButton>
            <p>Sign Out</p>
        </MenuItem>
        }
      </Box>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "#292f41"}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            lumos
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Search style={{position:'relative'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchCard}
              value={cardValue.searchCardInput}
              name='searchCardInput'
            />
            <div  style={{position:'absolute', backgroundColor:'red'}}>
                <p>abc</p>
                <p>abc</p>
                <p>abc</p>
                <p>abc</p>
            </div>
          </Search>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {/* <div className='header-right'> */}
            <Box ml={3} mt={0.5}>
                {!isAuthenticated
                    ?
                    <Button  variant='contained' size="small" onClick={() => loginWithRedirect()}>
                        Sign In
                    </Button >
                    :
                    <Button variant='contained' size="small" onClick={() => logout()}>
                        Sign Out
                    </Button>
                }
            </Box>
            {/* </div> */}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

// import './header.styles.scss';


// const Header = () => {
//     const dispatch = useDispatch();

//     const { user, isAuthenticated, loginWithRedirect, logout, } = useAuth0();

//     useEffect(() => {
//         if (user) {
//             axios.post(`http://localhost:8080/api/users/`, { user })
//                 .then(result => {
//                     dispatch(setUser(result.data));
//                 })
//                 .catch(error => console.log(error));
//         }
//     }, [user])

//     return (
//         <div className="header">

//             <div className="header-left">
//                 <h1>Lumos</h1>
//             </div>

//             <div className='header-right'>
//                 {!isAuthenticated
//                     ?
//                     <Button variant='contained' onClick={() => loginWithRedirect()}>
//                         Sign In
//                     </Button >
//                     :
//                     <Button variant='contained' onClick={() => logout()}>
//                         Sign Out
//                     </Button>
//                 }
//             </div>

//         </div>
//     )
// }

// export default Header;