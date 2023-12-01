import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { 
    NavigationContainer, 
    LogoContainer,
    NavLinks,
    NavLink 
} from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const { isCartOpen } = useContext(CartContext);

    const signOutHandler = async () => {
       await signOutUser();
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink className="nav-link" to='/shop'>
                        SHOP
                    </NavLink>
                    { (currentUser) ? 
                        (
                        <NavLink as='span' className='nav-link' onClick={signOutHandler}>
                            SIGN-OUT
                            </NavLink>
                        ) : (  
                        <NavLink className="nav-link" to='/auth'>
                        { (currentUser) ? 'SIGN-OUT' : 'SIGN-IN'}
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                { isCartOpen && <CartDropdown /> }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )

}

export default Navigation;