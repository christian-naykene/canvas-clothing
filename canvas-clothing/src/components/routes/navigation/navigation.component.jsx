import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import { CartIcon } from "../../cart-icon/cart-icon.component";
import { useContext } from "react";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import { CartDropdown } from "../../cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../../context/cart.context";
import { selectCurrentUser } from "../../../store/user/user.selector";

export const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link
            className="nav-link"
            to="/shop"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            Shop
          </Link>
          {currentUser ? (
            <Link className="nav-link" onClick={signOutUser} to="/sign-in">
              Sign Out
            </Link>
          ) : (
            <Link
              className="nav-link"
              to="/sign-in"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};
