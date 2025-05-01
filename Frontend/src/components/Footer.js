import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-orange-600">
            Food Explorer 🍔
          </h2>
          <p className="text-sm text-gray-500">
            Discover your next favorite meal with ease.
          </p>
        </div>

        <div className="flex gap-6 text-md font-medium">
          <Link to="/about">
            <li className="hover:text-orange-600 transition-colors list-none">
              About
            </li>
          </Link>
          <Link to="/contact">
            <li className="hover:text-orange-600 transition-colors list-none">
              Contact
            </li>
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Food Explorer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
