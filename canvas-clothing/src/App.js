import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Home } from "./components/routes/home/home.component";
import { Navigation } from "./components/routes/navigation/navigation.component";
import { SignIn } from "./components/routes/sign-in/sign-in.component";
import { Shop } from "../src/components/routes/shop/shop.component";
import { Checkout } from "./components/routes/checkout/checkout.component";
import { useEffect } from "react";
import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
      console.log(user);
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />{" "}
        {/*index matches the parental component and will render at / */}
        <Route path="shop/*" element={<Shop />} /> {/* path is now /home/shop*/}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
