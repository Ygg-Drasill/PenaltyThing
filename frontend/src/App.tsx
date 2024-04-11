import "./App.css";
import Navbar from "./components/navbar";
import { LoginForm } from "./pages/loginform";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// Import other components you want to route to

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
