import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import UserContext from "../utils/UserContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify"; // Import toast here
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { ToastContainer } from "react-toastify"; // Import ToastContainer
const backendURL = process.env.REACT_APP_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const { loggedInUser: username, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      setCheckingAuth(false);
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState({
    showSubmitError: false,
    errorMsg: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitSuccess = (token) => {
    Cookies.set("token", token, { expires: 1 / 24 });
    toast.success("Login Success ✅");
    const decoded = jwtDecode(token);
    setLoggedInUser(decoded.username);
    setTimeout(() => navigate("/"), 1000);
  };

  const onSubmitFailure = (message) => {
    setLoginError({
      showSubmitError: true,
      errorMsg: message,
    });
    toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setButtonClicked(true); // Start animation

    const url = `${backendURL}/api/v1/login`;
    const payload = { email: formData.email, password: formData.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        onSubmitSuccess(data.token);
      } else {
        onSubmitFailure(
          data.message || data.error || "Login failed, try again later."
        );
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setTimeout(() => setButtonClicked(false), 300); // Reset animation
    }
  };

  if (checkingAuth) return null;

  return (
    <div className="flex flex-col min-h-screen font-roboto bg-gray-50">
      <div className="flex-grow flex items-center justify-center p-4 md:p-12">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
            Login to Your Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="akshay@gmail.com"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-orange-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 transform ${
                buttonClicked ? "translate-y-1" : "translate-y-0"
              }`}
            >
              Login
            </button>
            {loginError.showSubmitError && (
              <p className="text-sm text-red-500 mt-1">
                *{loginError.errorMsg}
              </p>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register">
                <button className="text-orange-600 font-medium hover:underline transition">
                  Register here
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
