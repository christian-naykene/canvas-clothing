import { Link, Outlet } from "react-router-dom"
import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg"
import { CartIcon } from "../../cart-icon/cart-icon.component"
import { useContext } from "react"
import { UserContext } from "../../../context/user.context"
import { signOutUser } from "../../../utils/firebase/firebase.utils"
import { CartDropdown } from "../../cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../../context/cart.context"

export const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          { currentUser ? (
            <Link className="nav-link" onClick={signOutUser} to="/sign-in">
            Sign Out
            </Link>
            ) : (<Link className="nav-link" to="/sign-in">
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        { isCartOpen && <CartDropdown /> }
      </div>
      <Outlet />
    </>
  )
}
