import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendURL = process.env.REACT_APP_API_URL;

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart cleared successfully!");
  };

  const handleSaveCart = async () => {
    const token = Cookies.get("token");

    if (!token || cartItems.length === 0) {
      toast.warning("Cart is empty or user not authenticated.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const payload = cartItems.map(({ itemData, quantity }) => ({
        itemName: itemData.card.info.name,
        image: itemData.card.info.imageId,
        quantity,
      }));

      const response = await fetch(`${backendURL}/api/v1/cart/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: payload }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Cart saved successfully!");
      } else {
        toast.error(data.error || "Failed to save cart.");
      }
    } catch (err) {
      console.error("Error saving cart:", err);
      toast.error("Something went wrong while saving.");
    }
  };

  return (
    <div className="min-h-screen text-center m-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Cart 🛒</h1>

      <div className="flex justify-center gap-4 mb-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:shadow-md transition font-semibold"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:shadow-md transition font-semibold"
          onClick={handleSaveCart}
        >
          Save Cart
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-base">Your cart is empty.</p>
        ) : (
          <ItemList items={cartItems.map((i) => i.itemData)} />
        )}
      </div>
    </div>
  );
};

export default Cart;
