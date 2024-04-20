import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import NavigationBar from "./components/NavigationBar/NavigationBar";
import SignIn from './components/SignIn/SignIn';
import Products from './components/products/Products';
import ProductCard from './components/ProductCard/ProductCard';
import LandingPage from './components/LandingPage/LandingPage';
import ManageProduct from './components/ManageProduct/ManageProduct';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Order from './Order/Order';







function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<CreateAccount />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/details" element={<ProductCard />} />
        <Route exact path="/order" element={<Order />} />
        <Route exact path="/mng-product" element={<ManageProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
