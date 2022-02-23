import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';

import axios from "axios";

import { setUser } from '../../redux/user/user.actions';
import './header.styles.scss';
import CustomButton from "../custom-button/custom-button.component";
import SearchBarItem from "../search-bar-item/search-bar-item.component";
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
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@material-ui/core';
import zIndex from "@material-ui/core/styles/zIndex";
import { getAllPublicCardsByDecksWithTitle } from "../../helpers/selectors";
const useStyles = makeStyles({

  navi: {
    display: 'flex',
    alignItems: 'center'
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

const Search = styled('div')(({ theme }) => ({ //Export these in
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
    padding: theme.spacing(1, 1, 1, 1),
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
  const { user, isAuthenticated, loginWithRedirect, logout, } = useAuth0();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [publicDecks, setPublicDecks] = useState([]);
  const [cardValue, setCardValue] = useState({
    'searchCardInput': ''
  });

  //save cardValue state on search box input
  const handleSearchCard = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCardValue({ ...cardValue, [name]: value });
    // console.log("Card Value Is:", cardValue);
  }

  //trigger axios when user presses "Enter"
  const sendRequest = (e) => {
    if (e.key === 'Enter') {
      grabData();
      setCardValue({
        'searchCardInput': ''
      })
    }
  }

  //filter by search box term decks list before state save
  const grabData = () => {
    getAllPublicCardsByDecksWithTitle()
      .then((result) => {
        //filter by deck title
        const filtered = result.data.filter(d => d.title.toLowerCase().includes(cardValue.searchCardInput));
        // console.log("pub",publicDecks);
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


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // console.log("public decks list:", publicDecks);

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
      <MenuItem onClick={handleMenuClose}></MenuItem>
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
    <Box>
      <AppBar position="static" style={{ backgroundColor: "#292f41", zIndex: 10 }}>
        <Toolbar>
          <div className={classes.navi}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '2px solid #bec2d0',
            }}>
            <Typography
              className={classes.lumosLogo}
              component='span'
              onClick={() => navigate('/')}
              sx={{
                // mb: '0.01vw',
                ml: '5px',
                mr: '50px',
                fontSize: 40,
                fontWeight: 500,
                color: 'gold',
                cursor: 'pointer',
                borderBottom: '3px solid #292f41',
                '&:hover': {
                  borderBottom: '3px solid #bec2d0',
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
                pb: '10px', 
                mt: '15px',
                mr: '50px',
                // mb: '1vw',
                cursor: 'pointer',
                variant: 'h7',
                height: '100%',
                // component: 'div',
                fontSize: '1.2rem',
                // margin: '0.4vw 3vw',
                borderBottom: '3px solid #292f41',
                // lineHeight: '1.2em',
                // marginRight: '24px',
                '&:hover': {
                  // color: "#f00",
                  borderBottom: '3px solid #bec2d0',
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
                backgroundColor: '#4255ff',
                textTransform: 'none',
                color: '#ffff',
                cursor: 'pointer',
                variant: 'contained',
                component: 'div',
                mt: '2px',
                mr: '24px',
                fontSize: '1.1rem',
                width: '7.5rem',
                height: '2.2rem',
                // pb: '10px', 
                borderBottom: '1px solid #4255ff',
                '&:hover': {
                  backgroundColor: '#3122cf',
                  borderBottom: '1px solid #bec2d0',
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
              style={{ position: 'relative', zIndex: 10 }}>
              <SearchIconWrapper >
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchCard}
                onKeyUp={sendRequest}
                value={cardValue.searchCardInput}
                name='searchCardInput'
              />
              <div style={{ width: '100%', position: 'absolute', backgroundColor: '#494e5d' }}>
                {publicDecks && publicDecks.map((deck) => {
                  const { id, cid, title } = deck;
                  return (
                    <SearchBarItem
                      key={id}
                      deckID={cid}
                      deckTitle={title}
                      setPublicDecks={setPublicDecks}
                    />
                  )
                })}
              </div>
            </Search>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle size='large'> </AccountCircle>
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
              size=""
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
