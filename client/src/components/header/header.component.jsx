import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import { setUser } from '../../redux/user/user.actions';

import {
  Search,
  StyledInputBase,
  SearchIconWrapper,
  lumosTypography,
  yourLibraryTypography,
  createDeckButtonStyling,
  searchBarStyling
} from './header.mui.styles.jsx';

import './header.styles.scss';
import SearchBarItem from "../search-bar-item/search-bar-item.component";
import Button from '@mui/material/Button';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

import MoreIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@material-ui/core';
import { getAllPublicCardsByDecksWithTitle } from "../../helpers/selectors";

const useStyles = makeStyles({
  navi: {
    display: 'flex',
    alignItems: 'center'
  }
})

export default function Header() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
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
  }

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
        const filtered = result.data.filter(deck => deck.title.toLowerCase().includes(cardValue.searchCardInput));
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
      <Box >
        {!isAuthenticated
          ?
          <MenuItem
            onClick={() => loginWithRedirect()}>
            <p>Sign In</p>
          </MenuItem>
          :
          <MenuItem
            onClick={() => logout()}>
            <IconButton
              size="small"
            >
            </IconButton>
            <p>Sign Out</p>
          </MenuItem>
        }
      </Box>
    </Menu >
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
              sx={lumosTypography}
            >
              lumos
            </Typography>
            <Typography
              className={classes.decks}
              noWrap
              component='span'
              sx={yourLibraryTypography}
              onClick={() => navigate('/')}
            >
              Your Library
            </Typography>
            <Button
              className={classes.create}
              sx={createDeckButtonStyling}
              onClick={() => navigate('/createdeck')}
            >
              Create Deck
            </Button>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Search
              style={{ position: 'relative', zIndex: 10 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                autoComplete="off"
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchCard}
                onKeyUp={sendRequest}
                value={cardValue.searchCardInput}
                name='searchCardInput'
              />
              <CancelIcon
                sx={{ ml: '35px', zIndex: 11, cursor: 'pointer' }}
                onClick={() => {
                  return setPublicDecks([]);
                }} />
              <div className='search-bar-input' style={searchBarStyling}>
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
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
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
