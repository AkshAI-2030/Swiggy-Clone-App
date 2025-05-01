import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const backendURL = process.env.REACT_APP_API_URL;

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleSaveCart = async () => {
    const token = Cookies.get("token");
    if (!token || cartItems.length === 0) {
      alert("Cart is empty or user not authenticated.");
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
        alert("Cart saved to DB!");
      } else {
        alert(data.error || "Failed to save cart.");
      }
    } catch (err) {
      console.log("Error saving cart:", err);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <div className="min-h-screen text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart 🛒</h1>

      <div className="flex justify-center gap-4 my-3">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md"
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
