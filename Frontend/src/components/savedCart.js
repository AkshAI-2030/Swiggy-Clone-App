import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import SavedShimmer from "../ShimmerUI/SavedShimmer";

const backendURL = process.env.REACT_APP_API_URL;

const SavedItems = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      alert("Please log in to view saved items.");
      return;
    }

    const fetchSavedCart = async () => {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const res = await fetch(`${backendURL}/api/v1/cart/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok && data.items) {
          setSavedItems(data.items);
        } else {
          console.log(data.error || "Failed to fetch saved cart.");
        }
      } catch (err) {
        console.log("Error fetching saved cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedCart();
  }, []);

  if (loading) return <SavedShimmer />;

  return (
    <div className="min-h-screen p-4 text-center mb-20">
      <h1 className="text-2xl font-bold mb-4">Saved Cart 🗃️</h1>

      {savedItems?.length === 0 ? (
        <p className="text-gray-500">No saved items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {savedItems?.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.image}`}
                alt={item.itemName}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-semibold">{item.itemName}</h2>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-xs text-gray-500">
                Saved on: {new Date(item.savedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedItems;
