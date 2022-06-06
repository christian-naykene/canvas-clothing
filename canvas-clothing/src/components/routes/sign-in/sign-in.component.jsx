import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils"
import { SignUpForm } from "../../sign-up-form/sign-up-form.component"

export const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }
  return (
    <>
      <h1> Sign In</h1>
      <button onClick={logGoogleUser} >
        Sign In with Google
      </button>

      <SignUpForm />
    </>
  )
}
