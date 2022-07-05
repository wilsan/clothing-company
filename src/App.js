import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import Payment from './routes/payment/payment.component';


import { getCurrentUserSnapshot } from './store/user/user.thunk';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserSnapshot());
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='payment' element={<Payment />} />
      </Route>
    </Routes>
  );
}

export default App;
