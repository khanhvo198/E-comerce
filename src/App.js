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
import React, { lazy, useEffect } from 'react';
import firebase from './firebase/firebase'
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from 'app/UserSlice';
import db from 'firebase/firebase.config'
import Search from 'components/Search/Search';

function App() {

  // const config = {
  //   apiKey: process.env.REACT_APP_FIREBASE_API,
  //   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // };

  // firebase.initializeApp(config);


  const user = useSelector(state => state.user)
  const dispatch = useDispatch()


  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("User not log in")
        return;
      }

      // how to add only one time ???


      const userRef = db.collection("Users").doc(user.uid)
      const doc = await  userRef.get()
      if(!doc.exists) {
        userRef.set({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phone: user.phoneNumber ? user.phoneNumber : '',
          birthday: user.birthday ? user.birthday : '',
          gender: user.gender ? user.gender : ''
        }).then(() => {
          console.log("Add user successfully")
        }).catch(err => {
          console.log(err)
        })
      }

      


      // db.collection('Users').doc(user.uid).set({
      //   displayName: user.displayName,
      //   email: user.email,
      //   avatar: user.photoURL,
      //   phone: user.phoneNumber,
      // }).then(() => {
      //   console.log('Add user successfully')
      // }).catch((error) => {
      //   console.log('Add user error: ', error)
      // })




      // console.log('user', user.displayName)
      // const token = await user.getIdToken()
      // console.log('user token', token)
      // console.log(user.uid)
      const photoURL = user.photoURL
      const action = signIn({isLogin: true, userName: user.displayName, photoURL: photoURL, uid: user.uid})
      dispatch(action)

    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);


  // const Account = React.lazy(()=>import('./components/Account/Account'))
  // const Account = React.lazy(()=>import('./components/Account'))
  // const Account = React.lazy(() => import('./components/Account/Account'));


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

          <Route path="/search/:brand">
            <Search />
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

          {/* <Route path="/login">
            <Login />
          </Route> */}

        </Switch>

        <Footer />

      </div>
    </BrowserRouter>

  );
}

export default App;
