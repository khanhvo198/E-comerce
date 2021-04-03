import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetail from './components/ProductDetail/ProductDetail'
import { BrowserRouter, Route } from 'react-router-dom';
import Checkout from './components/Checkout/Checkout';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/checkout" component={Checkout} />
        <Footer />
      </div>
    </BrowserRouter>

  );
}

export default App;
