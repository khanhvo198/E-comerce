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
import { useEffect } from 'react';
import firebase from 'firebase'

function App() {

  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  };

  firebase.initializeApp(config);


  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("User not log in")
        return;
      }
      console.log('user', user.displayName)
      const token = await user.getIdToken()
      console.log('user token', token)
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);


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
