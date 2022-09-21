import { Routes, Route } from 'react-router-dom';
import { Home } from './components/routes/home/home.component';
import { Navigation } from './components/routes/navigation/navigation.component';
import { SignIn } from './components/routes/sign-in/sign-in.component';
import { Shop } from '../src/components/routes/shop/shop.component';
import { Checkout } from './components/routes/checkout/checkout.component'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} /> {/*index matches the parental component and will render at / */}
        <Route path='shop/*' element={<Shop />} /> {/* path is now /home/shop*/}
        <Route path='sign-in' element={<SignIn />} />
        <Route path='checkout' element={< Checkout />} />
      </Route>
    </Routes>
  )
}

export default App;
