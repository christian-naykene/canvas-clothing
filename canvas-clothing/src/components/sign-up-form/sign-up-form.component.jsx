import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { Button } from "../button/button.component"
import { FormInput } from "../form-input/form-input.component"
import './sign-up-form.styles.scss'

// default state of the sign up fields
const defaultFormFields = {
  displayNames: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const SignUpForm = () => {
  //useState to manage state
  const [formFields, setFormFields] = useState(defaultFormFields)
  // destructure the keys  to assign to field names
  const { displayName, email, password, confirmPassword } = formFields

  console.log(formFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

  //confirm password matches
    const { password, confirmPassword } = formFields
    if(password !== confirmPassword) {
      alert("passwords do not match")
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      )

      await createUserDocumentFromAuth(user, { displayName } )

      resetFormFields()

    } catch(err) {
      if(err.code === 'auth/email-already-in-use') {
        alert('Email already in use')
      }
      console.log('user creation encountered an error', err)
    }



    //see if we have authenticated with email and pword
    //create doc
  }

  const handleChange = (event) => {
   const { name, value } = event.target

   setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with Your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button buttonType="google" type="submit">Sign Up</Button>
      </form>
    </div>
  )
}
