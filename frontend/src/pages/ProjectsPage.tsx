import CookieConsent from "react-cookie-consent"; // Component to display a cookie consent banner
import CategoryFilter from "../components/CategoryFilter"; // Component for filtering projects by category
import ProjectList from "../components/ProjectList"; // Component that displays a list of projects
import WelcomeBand from "../components/WelcomeBand"; // Component that displays a welcome message/banner
import Fingerprint from "../Fingerprint"; // Component for tracking or security purposes
import { useState } from "react"; // React hook for managing state
import CartSummary from "../components/CartSummary"; // Component to display a summary of the cart

function ProjectsPage() {
  // State to keep track of selected categories for filtering projects
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      {" "}
      {/* Bootstrap container with top margin */}
      <CartSummary /> {/* Displays a summary of items in the cart */}
      <WelcomeBand /> {/* Displays a welcome banner for the user */}
      <div className="row">
        {" "}
        {/* Bootstrap row to structure layout */}
        <div className="col-md-3">
          {" "}
          {/* Sidebar for filtering projects */}
          <CategoryFilter
            selectedCategories={selectedCategories} // Pass selected categories state
            setSelectedCategories={setSelectedCategories} // Pass function to update state
          />
        </div>
        <div className="col-md-9">
          {" "}
          {/* Main content area for project list */}
          <ProjectList selectedCategories={selectedCategories} />{" "}
          {/* Displays projects based on selected filters */}
        </div>
      </div>
      {/* Displays a cookie consent banner at the bottom of the page */}
      <CookieConsent>
        This website uses cookies to enhance the user experience
      </CookieConsent>
      <Fingerprint />{" "}
      {/* Likely used for tracking user interactions or security purposes */}
    </div>
  );
}

export default ProjectsPage;
