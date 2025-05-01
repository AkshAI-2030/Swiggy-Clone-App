import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
// import CartSync from "./CartSync";

const MainLayout = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }

    setCheckingAuth(false);
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#36d7b7" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="app">
      {/* <CartSync /> */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
