import React from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const getQuantity = (id) => {
    const item = cartItems.find((i) => i.itemData.card.info.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div>
      {items?.map((each) => {
        const id = each.card.info.id;
        const quantity = getQuantity(id);

        return (
          <div
            key={id}
            className="p-4 m-4 border-b-2 border-gray-200 flex flex-col md:flex-row justify-between items-center md:items-start gap-4"
          >
            {/* Left Text */}
            <div className="w-full md:w-7/12">
              <h3 className="text-lg font-semibold">{each.card.info.name}</h3>
              <p className="text-sm">₹ {each.card.info.price / 100}</p>
              <p className="text-xs text-gray-500">
                {each.card.info.description || "No description available."}
              </p>
            </div>

            {/* Right Image + Buttons */}
            <div className="flex flex-col items-center w-full md:w-4/12">
              <div className="w-28 h-20 sm:w-32 sm:h-24 overflow-hidden">
                <img
                  src={CDN_URL + each.card.info.imageId}
                  alt={each.card.info.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center mt-3 gap-2">
                <button
                  onClick={() => dispatch(removeItem(id))}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  -
                </button>
                <span className="text-lg font-bold">{quantity}</span>
                <button
                  onClick={() => dispatch(addItem(each))}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
