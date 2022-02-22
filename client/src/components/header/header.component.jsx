import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import axios from "axios";

import { setUser } from '../../redux/user/user.actions';
import { v4 as uuidv4 } from 'uuid';
import './header.styles.scss';
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
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
// // import { red } from "@mui/material/colors";
import { makeStyles } from '@material-ui/core';
import { getAllPublicCardsByDecksWithTitle } from "../../helpers/selectors";
const useStyles = makeStyles({

  navi: {
//     display: 'contents',
//     // transition: 'all .12s cubic-bezier(.47,0,.745,.715)',
//     // borderBottom: '2px solid #2e3856',
//     //   '&:hover': { 
//     //     borderBottom: '1.5px solid #bec2d0',
//     //   },
  },
  lumosLogo: {
//     color: 'gold',
//     // component: 'div',
//     cursor: 'pointer',
//     // marginRight: '3vw',
//     // marginLeft: '0.7vw',
//     borderBottom: '2px solid #292f41',
//     '&:hover': { 
//       borderBottom: '2px solid #bec2d0',
    },
    
//     // xs: 'none', 
//     // sm: 'block', 
//     fontSize: 40, 
//   },
  decks: {
 
  },
  create: {
//   //   backgroundColor: '#4255ff',
//   //   textTransform: 'none',
//   //   color: '#ffff',
//   //   cursor: 'pointer',
//   //   variant: 'contained',   
//   //   component: 'div',
//   //   fontSize: 20,
//   //   // margin: '0.4vw 3vw',
//   //   width: '5em',
//   //   height: '1.9em',
//   //   '&:hover': {
//   //     backgroundColor: '#4245ff',
//   //     // color: "#f00",
//   //   },
   },
})

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
    width: '20em',
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
  const classes = useStyles();

  const { user, isAuthenticated, loginWithRedirect, logout, } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cardValue, setCardValue] = useState({
    'searchCardInput': ''
  });

  const handleSearchCard = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCardValue({ ...cardValue, [name]: value });
    console.log("Card Value Is:", cardValue);
    // publicDecks && setFilteredDecks(prev =>[...prev, filter(publicDecks,cardValue)])
  }
  
  const sendRequest = (e) => {

    // setFilteredDecks( ...[], () => {
    if (e.key === 'Enter') {
      // const filter = [];
      grabData();
    }
      // publicDecks.forEach(d => {
      //   const deck = JSON.parse(JSON.stringify(d));
      //   filter.push(deck);
      // })

      return ;
    // }})
    
  }

  const grabData = () => {
    getAllPublicCardsByDecksWithTitle('')
    .then((result) => {
      // console.log("public decks:",result.data)
      console.log("cardValue:",cardValue);
      const filtered = result.data.filter(d => d.title.toLowerCase().includes(cardValue.searchCardInput));

      console.log("filtered",filtered);
      return setPublicDecks(filtered);
    })
    .catch((error) => console.log(error.message))
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
  const [publicDecks, setPublicDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
   
  },[]);

  console.log("public decks list:",publicDecks);
  // console.log("filtered:",filteredDecks)

 
// publicDecks.length && console.log("filter",filter(publicDecks,'first'));



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
      <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
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
        {/* <Box>Lumos-LL-Final/client/public/favicon.ico</Box> */}
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
      <AppBar position="static" style={{ backgroundColor: "#292f41" }}>
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
          <div className={classes.navi}
            sx={{ 
              borderBottom: '2px solid #bec2d0',
              display: 'contents'
            }}>
            <Typography
              className={classes.lumosLogo}
              component='span'
              // noWrap
              // sx={{ m: -2 }} 
              onClick={() => navigate('/')}
              sx={{ 
                mb: '0.01vw',
                ml: '0.6vw',
                mr: '6vw', 
                display: { fontSize: 40 },
                color: 'gold',
                // component: 'div',
                cursor: 'pointer',
                // marginRight: '3vw',
                // marginLeft: '0.7vw',
                borderBottom: '2px solid #292f41',
                '&:hover': { 
                  borderBottom: '2px solid #bec2d0',
                }
              }}
            >
              lumos
            </Typography>
            <Typography
              className={classes.decks}
              noWrap
              component='span'
              sx={{ 
                // mr: '6vw', 
                // mt: '0.5svw',
                cursor: 'pointer',
                variant: 'h7',
                // component: 'div',
                fontSize: '1rem',
                // margin: '0.4vw 3vw',
                borderBottom: '2px solid #292f41',
                // lineHeight: '1.2em',
                marginTop: '0.2em',
                marginRight: '6vw',
                paddingBottom: '0.5em',
                '&:hover': {
                  // color: "#f00",
                  borderBottom: '2px solid #bec2d0',
                },
              }}
              onClick={() => navigate('/')}
            >
              Your Library
            </Typography>
            <Button
              className={classes.create}
              // noWrap
              // component='span'
              sx={{ 
                mb: '1vw',
                marginTop: '0.5vw',
                backgroundColor: '#4255ff',
                textTransform: 'none',
                color: '#ffff',
                cursor: 'pointer',
                variant: 'contained',   
                component: 'div',
                fontSize: '1rem',
                // margin: '0.4vw 3vw',
                width: '7.5rem',
                height: '1.9rem',
                '&:hover': {
                  backgroundColor: '#4245ff',
                  // color: "#f00",
                },
              }}
              onClick={() => navigate('/createdeck')}
            >
              Create Deck
            </Button>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Search 
              style={{ position: 'relative' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchCard}
                onKeyUp={sendRequest}
                value={cardValue.searchCardInput}
                name='searchCardInput'
              />
              <div style={{ position: 'absolute', backgroundColor: 'red' }}>
                   {publicDecks &&  publicDecks.map((deck) => 
                  <p key={deck.key}>{deck.title}</p>
                )}
                {/* <p>abc</p>
                <p>abc</p>
                <p>abc</p>
                <p>abc</p> */}
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
                <Button variant='contained' size="small" onClick={() => loginWithRedirect()}>
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
    </Box >
  );
}




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
