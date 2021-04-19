import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetail from './components/ProductDetail/ProductDetail'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Review from './components/Review/Review';
import Account from 'components/Account/Account';
import Checkout from 'components/Checkout/Checkout';
import Login from 'components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header />
          <Route exact path="/" component={Home} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/checkout" component={Checkout} />
          <Footer /> */}

        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/product/:id">
            <ProductDetail />
          </Route>



          <Route path="/review">
            <Review />
          </Route>

          <Route path="/account">
            <Account />
          </Route>

          <Route path="/checkout">
            <Checkout />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

        </Switch>

        <Footer />

      </div>
    </BrowserRouter>

  );
}

export default App;
