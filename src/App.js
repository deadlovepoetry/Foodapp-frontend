import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './components/ContextReducer'; // Import the CartProvider

// Bootstrap imports
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <Router>
      <CartProvider> {/* Wrap your routes with CartProvider */}
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
