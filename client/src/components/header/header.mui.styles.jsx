import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '15em',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0, 0, 0, 0),
        paddingLeft: `calc(0.5em + ${theme.spacing(5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '10.5em',
        },
    },
}));

export const lumosTypography = {
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
}

export const yourLibraryTypography = {
    pb: '10px',
    mt: '15px',
    mr: '50px',
    cursor: 'pointer',
    variant: 'h7',
    height: '100%',
    fontSize: '1.2rem',
    borderBottom: '3px solid #292f41',
    '&:hover': {
        borderBottom: '3px solid #bec2d0',
    },
}

export const createDeckButtonStyling = {
    backgroundColor: '#4255ff',
    textTransform: 'none',
    color: '#ffff',
    cursor: 'pointer',
    variant: 'contained',
    component: 'div',
    mt: '2px',
    mr: '5px',
    fontSize: '1.1rem',
    width: '7.5rem',
    height: '2.2rem',
    borderBottom: '1px solid #4255ff',
    '&:hover': {
        backgroundColor: '#3122cf',
        borderBottom: '1px solid #bec2d0',
    },
}

export const searchBarStyling = {
    width: '100%',
    position: 'absolute',
    backgroundColor: '#494e5d',
    borderRadius: '5px',
    border: '2px solid ',
    borderTop: 'none',
    borderBottom: 'none',
}