import "./App.css";
import { CartProvider } from "./context/CartContext"; // Provides cart-related context throughout the app
import AdminProjectsPage from "./pages/AdminProjectsPage";
import CartPage from "./pages/CartPage"; // Page component for the cart
import DonatePage from "./pages/DonatePage"; // Page component for donations
import ProjectsPage from "./pages/ProjectsPage"; // Page component for displaying projects
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router for navigation

function App() {
  return (
    <>
      {/* Provides the cart context to all child components */}
      <CartProvider>
        {/* Router manages navigation between different pages */}
        <Router>
          <Routes>
            {/* Default route - Displays the ProjectsPage */}
            <Route path="/" element={<ProjectsPage />} />

            {/* Explicit /projects route - Also displays ProjectsPage */}
            <Route path="/projects" element={<ProjectsPage />} />

            {/* Donation page - Uses dynamic parameters (projectName and projectId) */}
            <Route
              path="/donate/:projectName/:projectId"
              element={<DonatePage />}
            />

            {/* Cart page */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminprojects" element={<AdminProjectsPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
