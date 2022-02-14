import { useAuth0 } from "@auth0/auth0-react";

import './header.styles.scss';

import CustomButton from "../custom-button/custom-button.component";

const Header = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

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