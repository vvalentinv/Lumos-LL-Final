import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";

import axios from "axios";

import { setUser } from '../../redux/user/user.actions';

import CustomButton from "../custom-button/custom-button.component";

import './header.styles.scss';


const Header = () => {
    const dispatch = useDispatch();

    const { user, isAuthenticated, loginWithRedirect, logout, } = useAuth0();

    useEffect(() => {
        if (user) {
            axios.post(`http://localhost:8080/api/users/`, { user })
                .then(result => {
                    dispatch(setUser(result.data));
                })
                .catch(error => console.log(error));
        }
    }, [user])

    return (
        <div className="header">

            <div className="header-left">
                <h1>Lumos</h1>
            </div>

            <div className='header-right'>
                {!isAuthenticated
                    ?
                    <CustomButton onClick={() => loginWithRedirect()}>
                        Sign In
                    </CustomButton >
                    :
                    <CustomButton onClick={() => logout()}>
                        Sign Out
                    </CustomButton>
                }
            </div>

        </div>
    )
}

export default Header;