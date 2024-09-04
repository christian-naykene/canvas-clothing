import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../../utils/firebase/firebase.utils";
import { Button } from "../../button/button.component";
import { FormInput } from "../../form-input/form-input.component";
import { SignUpForm } from "../../sign-up-form/sign-up-form.component";
import "./sign-in.styles.scss";

//Create state
const defaultFormFields = {
  email: "",
  password: "",
};

//create on sign in function to check for existing credentials
//if existing, redirect to homepage

export const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  //create onChange function
  const handleChange = (event) => {
    const { name, value } = event.target;
    //Manipulate state
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("incorrect password or email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(err);
      }
    }
  };

  // const logGoogleUser = async () => {
  //   const { user } = await signInWithGooglePopup();
  //   await createUserDocumentFromAuth(user);
  // };

  return (
    <div className="authentication">
      <div className="sign-in-container">
        <h2> I already have an account </h2>
        <span>Sign In with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
          <FormInput
            label="password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
          <div className="buttons-container">
            <Button type="submit" buttonType="inverted">
              Sign In
            </Button>
            <Button
              type="button"
              buttonType="google"
              onClick={signInWithGoogle}
            >
              Google Sign In
            </Button>
          </div>
        </form>
      </div>
      <SignUpForm />
    </div>
  );
};
