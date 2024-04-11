import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import { LoginForm } from "./pages/loginform";
import { Wheel } from "./pages/wheel";
// Import other components you want to route to

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/wheel" element={<Wheel />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
