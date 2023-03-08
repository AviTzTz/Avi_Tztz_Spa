import "./initialData/initialData.js";
import "./pages/HomePage.js"
import "./utils/getNextPropertyId.js"
import "./pages/SignupPage.js"
import "./pages/LoginPage.js"
import "./pages/AccountPage.js"
import initializeNavbar from "./components/Navbar.js"

window.addEventListener("load", () => {
    initializeNavbar();
})