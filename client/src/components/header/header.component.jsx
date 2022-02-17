import { useAuth0 } from "@auth0/auth0-react";

import './header.styles.scss';

import CustomButton from "../custom-button/custom-button.component";
import { setUser } from '../../redux/user/user.actions';
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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

                {user
                    ?
                    <h2>Welcome {user.given_name}</h2>
                    : ''
                }
            </div>

        </div>
    )
}

export default Header;