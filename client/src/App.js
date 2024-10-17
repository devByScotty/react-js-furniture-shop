import './App.css';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import UserProfilePage from './pages/UserProfile/UserProfilePage';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/user/:userId/purchases" element={<UserProfilePage />} />
          {/* Add more routes for additional pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
