import { Link, Outlet } from "react-router-dom"
import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg"
import { useContext } from "react"
import { UserContext } from "../../../context/user.context"
import { signOutUser } from "../../../utils/firebase/firebase.utils"

export const Navigation = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext)

  const signOutHandler = async () => {
    await signOutUser()
    setCurrentUser(null)
  }

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
            <Link className="nav-link" onClick={signOutHandler} to="/sign-in">
            Sign Out
            </Link>
            ) : (<Link className="nav-link" to="/sign-in">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  )
}
